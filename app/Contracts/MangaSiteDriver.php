<?php

namespace App\Contracts;

interface MangaSiteDriver
{
    public function supports(string $url): bool;

    public function parseChapters(string $mangaUrl): array;

    public function parseImages(string $chapterUrl): array;
}
