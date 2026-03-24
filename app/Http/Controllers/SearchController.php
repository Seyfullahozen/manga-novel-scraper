<?php

namespace App\Http\Controllers;

use App\Models\Manga;
use App\Models\Novel;
use Illuminate\Http\Request;

class SearchController extends Controller
{
    public function live(Request $request)
    {
        $query = trim($request->get('q', ''));

        if (strlen($query) < 2) {
            return response()->json(['results' => []]);
        }

        $novels = Novel::where('title', 'LIKE', '%' . $query . '%')
            ->whereNotNull('scraped_at')
            ->with('media')
            ->orderBy('title')
            ->limit(5)
            ->get()
            ->map(fn($n) => [
                'type'      => 'novel',
                'title'     => $n->title,
                'cover_url' => $n->getCoverUrl(),
                'url'       => route('site.novel.show', $n->slug),
            ]);

        $mangas = Manga::where('title', 'LIKE', '%' . $query . '%')
            ->whereNotNull('scraped_at')
            ->with('media')
            ->orderBy('title')
            ->limit(5)
            ->get()
            ->map(fn($m) => [
                'type'      => 'manga',
                'title'     => $m->title,
                'cover_url' => $m->getCoverUrl(),
                'url'       => route('site.manga.show', $m->slug),
            ]);

        $results = $novels->concat($mangas)->sortBy('title')->values();

        return response()->json(['results' => $results]);
    }
}
