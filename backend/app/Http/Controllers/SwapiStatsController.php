<?php

namespace App\Http\Controllers;

use App\Models\SwapiStat;
use Illuminate\Http\JsonResponse;

class SwapiStatsController extends Controller
{
    public function __invoke(): JsonResponse
    {
        $stat = SwapiStat::where('key', 'global')->first();

        if (! $stat) {
            return response()->json([
                'computed_at' => null,
                'metrics' => [
                    'total_queries' => 0,
                    'top_resources' => [],
                    'average_duration_ms' => 0,
                    'popular_hour' => null,
                ],
            ]);
        }

        return response()->json([
            'computed_at' => $stat->computed_at,
            'metrics' => $stat->payload,
        ]);
    }
}

