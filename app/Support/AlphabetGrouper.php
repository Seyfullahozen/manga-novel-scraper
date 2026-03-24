<?php

namespace App\Support;

use Illuminate\Support\Collection;

class AlphabetGrouper
{
    public function groupByInitial(iterable $items, string $titleField = 'title'): array
    {
        $groups = [];

        foreach ($items as $item) {
            $title = data_get($item, $titleField, '');
            $initial = $this->resolveInitial((string) $title);

            $groups[$initial][] = $item;
        }

        foreach ($groups as $letter => $letterItems) {
            usort($groups[$letter], function ($a, $b) use ($titleField) {
                return strcmp(
                    (string) data_get($a, $titleField, ''),
                    (string) data_get($b, $titleField, '')
                );
            });
        }

        return $this->normalizeGroups($groups);
    }

    public function groupMixedByInitial(iterable $novels, iterable $mangas): array
    {
        $groups = [];

        foreach ($novels as $novel) {
            $initial = $this->resolveInitial((string) data_get($novel, 'title', ''));
            $groups[$initial][] = [
                '_type'  => 'novel',
                '_model' => $novel,
            ];
        }

        foreach ($mangas as $manga) {
            $initial = $this->resolveInitial((string) data_get($manga, 'title', ''));
            $groups[$initial][] = [
                '_type'  => 'manga',
                '_model' => $manga,
            ];
        }

        foreach ($groups as $letter => $items) {
            usort($groups[$letter], fn($a, $b) => strcmp($a['_model']->title, $b['_model']->title));
        }

        return $this->normalizeGroups($groups);
    }

    public function resolveInitial(string $title): string
    {
        $title = trim($title);

        if ($title === '') {
            return '#';
        }

        $first = mb_strtoupper(mb_substr($title, 0, 1, 'UTF-8'), 'UTF-8');

        return preg_match('/^[A-Z]$/', $first) ? $first : '#';
    }

    private function normalizeGroups(array $groups): array
    {
        $letters = array_merge(['#'], range('A', 'Z'));
        $normalized = [];

        foreach ($letters as $letter) {
            $normalized[$letter] = $groups[$letter] ?? [];
        }

        return $normalized;
    }
}
