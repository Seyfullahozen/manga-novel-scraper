<?php

namespace App\Contracts;

interface NovelSiteDriver
{
    public function supports(string $url): bool;

    /** @return array<int, array{title:string,url:string,chapter_number:int}> */
    public function parseChapters(string $novelUrl): array;

    public function parseContent(string $chapterUrl): string;
}
