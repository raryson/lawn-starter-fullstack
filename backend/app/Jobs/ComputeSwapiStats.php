<?php

namespace App\Jobs;

use App\Models\SwapiQuery;
use App\Models\SwapiStat;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\DB;

class ComputeSwapiStats implements ShouldQueue
{
    use Dispatchable;
    use InteractsWithQueue;
    use Queueable;
    use SerializesModels;

    public function handle(): void
    {
        $total = SwapiQuery::count();

        if ($total === 0) {
            SwapiStat::updateOrCreate(
                ['key' => 'global'],
                [
                    'payload' => [
                        'total_queries' => 0,
                        'top_resources' => [],
                        'average_duration_ms' => 0,
                        'popular_hour' => null,
                    ],
                    'computed_at' => now(),
                ],
            );

            return;
        }

        $topResources = SwapiQuery::select('resource', DB::raw('count(*) as total'))
            ->groupBy('resource')
            ->orderByDesc('total')
            ->limit(5)
            ->get()
            ->map(function ($row) use ($total) {
                return [
                    'resource' => $row->resource,
                    'count' => (int) $row->total,
                    'percentage' => round($row->total / $total * 100, 2),
                ];
            })
            ->all();

        $averageDuration = round((float) SwapiQuery::avg('duration_ms'), 2);

        $driver = DB::getDriverName();
        $hourExpression = match ($driver) {
            'mysql' => 'HOUR(created_at)',
            'pgsql' => "TO_CHAR(created_at, 'HH24')",
            default => "strftime('%H', created_at)",
        };

        $popularHour = SwapiQuery::selectRaw("{$hourExpression} as hour, count(*) as aggregate")
            ->groupBy('hour')
            ->orderByDesc('aggregate')
            ->value('hour');

        SwapiStat::updateOrCreate(
            ['key' => 'global'],
            [
                'payload' => [
                    'total_queries' => $total,
                    'top_resources' => $topResources,
                    'average_duration_ms' => $averageDuration,
                    'popular_hour' => $popularHour,
                ],
                'computed_at' => now(),
            ],
        );
    }
}

