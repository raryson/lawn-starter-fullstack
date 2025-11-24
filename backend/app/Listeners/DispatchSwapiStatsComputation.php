<?php

namespace App\Listeners;

use App\Events\SwapiStatsRecomputeRequested;
use App\Jobs\ComputeSwapiStats;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class DispatchSwapiStatsComputation implements ShouldQueue
{
    use InteractsWithQueue;

    public function handle(SwapiStatsRecomputeRequested $event): void
    {
        ComputeSwapiStats::dispatch();
    }
}

