<?php

return [
    'drivers' => [
        App\Services\NovelScraping\Drivers\Local\EmpireNovelDriver::class,
        App\Services\NovelScraping\Drivers\Local\NovelbinDriver::class,
        App\Services\NovelScraping\Drivers\Local\NovelOkutrDriver::class,
        App\Services\NovelScraping\Drivers\Examples\ExampleNovelDriver::class,
    ],
];
