<?php

namespace App\Events;

use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class SwapiQueryPerformed
{
    use Dispatchable;
    use SerializesModels;

    public function __construct(
        public readonly string $resource,
        public readonly int $durationMs,
    ) {
    }
}

