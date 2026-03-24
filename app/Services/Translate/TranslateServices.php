<?php

namespace App\Services\Translate;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class TranslateServices
{
    public function translate(string $text, string $src, string $tgt): ?string
    {
        $url = config('services.translate.url');
        $token = config('services.translate.token');
        $timeout = (int) config('services.translate.timeout', 20);

        if (! $url || ! $token) {
            return null;
        }

        try {
            $resp = Http::connectTimeout(10)
                ->timeout(60)
                ->retry(2, 500, throw: false)
                ->withToken($token)
                ->acceptJson()
                ->post($url, [
                    'text' => $text,
                    'src'  => $src,
                    'tgt'  => $tgt,
                ]);
        } catch (\Throwable $e) {
            Log::warning('TRANSLATE_EXCEPTION', [
                'message' => $e->getMessage(),
                'class' => get_class($e),
            ]);
            return null;
        }

        if (! $resp || ! $resp->successful()) {
            Log::warning('TRANSLATE_FAILED', [
                'status' => $resp?->status(),
                'body_preview' => mb_substr((string) ($resp?->body() ?? ''), 0, 200),
            ]);
            return null;
        }

        $data = $resp->json();

        // 1) Direkt string dönerse
        if (is_string($data)) {
            return $data;
        }

        // 2) [{source:..., target:...}] formatı (n8n response)
        if (is_array($data)) {
            // a) Tek obje: { target: "..." }
            if (isset($data['target']) && is_string($data['target'])) {
                return $data['target'];
            }

            // b) Liste: [ { target: "..." } ]
            if (isset($data[0]) && is_array($data[0]) && isset($data[0]['target']) && is_string($data[0]['target'])) {
                return $data[0]['target'];
            }

            // c) Olası diğer anahtar isimleri
            foreach (['text', 'translatedText', 'translated', 'result', 'output'] as $key) {
                if (isset($data[$key]) && is_string($data[$key])) {
                    return $data[$key];
                }
            }
        }
        Log::warning('TRANSLATE_UNPARSED_RESPONSE', [
            'body_preview' => mb_substr((string) $resp->body(), 0, 200),
        ]);
        return null;
    }

    public function translateLongText(string $text, string $src, string $tgt, int $chunkSize = 1500): ?string
    {
        $text = trim($text);
        if ($text === '') return '';

        $chunks = $this->chunkText($text, $chunkSize);

        $out = [];
        foreach ($chunks as $i => $chunk) {
            // Her parça için ayrı istek
            $translated = $this->translate($chunk, $src, $tgt);

            Log::info('TRANSLATE_CHUNK', [ // <-- bunu ekle
                'chunk_index' => $i,
                'chunk_length' => mb_strlen($chunk),
                'success' => $translated !== null,
            ]);

            if (! $translated) {
                return null;
            }

            $out[] = $translated;

            // n8n / rate-limit yumuşatma: küçük bir nefes
            usleep(150 * 1000); // 150ms
        }

        return implode("\n\n", $out);
    }

    private function chunkText(string $text, int $chunkSize): array
    {
        // Paragrafları koruyarak bölmeye çalış
        $paragraphs = preg_split("/\R{2,}/u", $text) ?: [$text];

        $chunks = [];
        $buffer = '';

        foreach ($paragraphs as $p) {
            $p = trim($p);
            if ($p === '') continue;

            // Paragraf tek başına çok büyükse, hard split
            if (mb_strlen($p) > $chunkSize) {
                if ($buffer !== '') {
                    $chunks[] = trim($buffer);
                    $buffer = '';
                }

                $len = mb_strlen($p);
                for ($pos = 0; $pos < $len; $pos += $chunkSize) {
                    $chunks[] = mb_substr($p, $pos, $chunkSize);
                }
                continue;
            }

            // Buffer’a ekleyelim mi?
            $candidate = $buffer === '' ? $p : ($buffer . "\n\n" . $p);

            if (mb_strlen($candidate) <= $chunkSize) {
                $buffer = $candidate;
            } else {
                if ($buffer !== '') {
                    $chunks[] = trim($buffer);
                }
                $buffer = $p;
            }
        }

        if ($buffer !== '') {
            $chunks[] = trim($buffer);
        }

        return $chunks ?: [''];
    }
}
