<?php

namespace Tests\Feature;

use App\Events\SwapiQueryPerformed;
use Illuminate\Support\Facades\Event;
use Illuminate\Support\Facades\Http;
use Tests\TestCase;

class SwapiControllerTest extends TestCase
{
    public function test_it_fetches_swapi_resource_and_dispatches_event(): void
    {
        Http::fake([
            'https://swapi.tech/api/people*' => Http::response(['result' => []], 200),
        ]);

        Event::fake([SwapiQueryPerformed::class]);

        $response = $this->getJson('/api/swapi?resource=people&limit=1');

        $response->assertOk()->assertJson(['result' => []]);

        Event::assertDispatched(SwapiQueryPerformed::class, function ($event) {
            return $event->resource === 'people' && $event->durationMs > 0;
        });
    }
}

