<?php

namespace Tests\Unit;

use App\Jobs\ComputeSwapiStats;
use App\Models\SwapiQuery;
use App\Models\SwapiStat;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ComputeSwapiStatsTest extends TestCase
{
    use RefreshDatabase;

    public function test_it_computes_stats_from_query_history(): void
    {
        SwapiQuery::factory()->createMany([
            ['resource' => 'people', 'duration_ms' => 50],
            ['resource' => 'people', 'duration_ms' => 60],
            ['resource' => 'films', 'duration_ms' => 45],
        ]);

        (new ComputeSwapiStats())->handle();

        $stat = SwapiStat::where('key', 'global')->first();

        $this->assertNotNull($stat);
        $this->assertSame(3, $stat->payload['total_queries']);
        $this->assertSame('people', $stat->payload['top_resources'][0]['resource']);
        $this->assertEquals(51.67, $stat->payload['average_duration_ms']);
    }
}

