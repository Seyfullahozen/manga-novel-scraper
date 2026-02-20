<?php

namespace App\Events;

use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class ScheduleBatchFinishedWithUpdates
{
    use Dispatchable, SerializesModels;

    public function __construct(
        public string $batchId,
        public array $updates // normalized array (manga/novel + chapter list)
    ) {}
}
