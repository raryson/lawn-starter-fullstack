<?php

namespace Tests\Feature;

use App\Models\SwapiStat;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class SwapiStatsControllerTest extends TestCase
{
    use RefreshDatabase;

    public function test_it_returns_empty_payload_when_stats_do_not_exist(): void
    {
        $this->getJson('/api/swapi/stats')
            ->assertOk()
            ->assertJson([
                'metrics' => [
                    'total_queries' => 0,
                    'top_resources' => [],
                    'average_duration_ms' => 0,
                    'popular_hour' => null,
                ],
            ]);
    }

    public function test_it_returns_latest_stats_payload(): void
    {
        $stat = SwapiStat::create([
            'key' => 'global',
            'payload' => [
                'total_queries' => 5,
                'top_resources' => [],
                'average_duration_ms' => 12.3,
                'popular_hour' => '14',
            ],
            'computed_at' => now(),
        ]);

        $this->getJson('/api/swapi/stats')
            ->assertOk()
            ->assertJson([
                'computed_at' => $stat->computed_at?->toJSON(),
                'metrics' => $stat->payload,
            ]);
    }
}

