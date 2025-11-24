<?php

namespace App\Listeners;

use App\Events\SwapiQueryPerformed;
use App\Models\SwapiQuery;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class PersistSwapiQuery implements ShouldQueue
{
    use InteractsWithQueue;

    public function handle(SwapiQueryPerformed $event): void
    {
        SwapiQuery::create([
            'resource' => $event->resource,
            'duration_ms' => $event->durationMs,
        ]);
    }
}

