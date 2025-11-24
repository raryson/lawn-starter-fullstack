<?php

namespace Tests\Feature;

use App\Events\SwapiQueryPerformed;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Event;
use Illuminate\Support\Facades\Http;
use Tests\TestCase;

class SwapiDetailControllerTest extends TestCase
{
    protected function setUp(): void
    {
        parent::setUp();
        Cache::flush();
    }

    protected function tearDown(): void
    {
        Cache::flush();
        parent::tearDown();
    }

    public function test_it_fetches_swapi_detail_and_dispatches_event(): void
    {
        // Force clear cache to ensure callback runs
        Cache::forget('swapi:detail:people:1');
        
        // Double-check cache is empty
        $this->assertFalse(Cache::has('swapi:detail:people:1'));
        
        $mockResponse = [
            'message' => 'ok',
            'result' => [
                'properties' => [
                    'name' => 'Luke Skywalker',
                    'height' => '172',
                ],
                'uid' => '1',
            ],
        ];

        Event::fake([SwapiQueryPerformed::class]);

        Http::fake([
            'https://swapi.tech/api/people/1' => Http::response($mockResponse, 200),
        ]);

        $response = $this->getJson('/api/swapi/people/1');

        $response->assertOk()->assertJson($mockResponse);

        Event::assertDispatched(SwapiQueryPerformed::class, function ($event) {
            return $event->resource === 'people' && $event->durationMs >= 0;
        });
    }

    public function test_it_caches_response_and_does_not_call_client_twice(): void
    {
        $mockResponse = [
            'message' => 'ok',
            'result' => [
                'properties' => [
                    'name' => 'Luke Skywalker',
                ],
                'uid' => '1',
            ],
        ];

        Http::fake([
            'https://swapi.tech/api/people/1' => Http::response($mockResponse, 200),
        ]);

        Event::fake([SwapiQueryPerformed::class]);

        // First request - should call the client
        $firstResponse = $this->getJson('/api/swapi/people/1');
        $firstResponse->assertOk()->assertJson($mockResponse);

        // Clear HTTP fakes to detect if second request makes a call
        Http::fake();

        // Second request - should use cache, not call the client
        $secondResponse = $this->getJson('/api/swapi/people/1');
        $secondResponse->assertOk()->assertJson($mockResponse);

        // Event should only be dispatched once (on first request)
        Event::assertDispatchedTimes(SwapiQueryPerformed::class, 1);
    }

    public function test_it_returns_400_for_invalid_resource(): void
    {
        Http::fake();

        Event::fake([SwapiQueryPerformed::class]);

        $response = $this->getJson('/api/swapi/invalid_resource/1');

        $response->assertStatus(400)
            ->assertJson([
                'error' => 'Unsupported resource [invalid_resource].',
            ]);

        Event::assertNotDispatched(SwapiQueryPerformed::class);
    }

    public function test_it_works_with_different_resources(): void
    {
        $peopleResponse = [
            'message' => 'ok',
            'result' => [
                'properties' => ['name' => 'Luke Skywalker'],
                'uid' => '1',
            ],
        ];

        $filmResponse = [
            'message' => 'ok',
            'result' => [
                'properties' => ['title' => 'A New Hope'],
                'uid' => '1',
            ],
        ];

        Http::fake([
            'https://swapi.tech/api/people/1' => Http::response($peopleResponse, 200),
            'https://swapi.tech/api/films/1' => Http::response($filmResponse, 200),
        ]);

        Event::fake([SwapiQueryPerformed::class]);

        $this->getJson('/api/swapi/people/1')->assertOk();
        $this->getJson('/api/swapi/films/1')->assertOk();

        Event::assertDispatched(SwapiQueryPerformed::class, function ($event) {
            return $event->resource === 'people';
        });
        Event::assertDispatched(SwapiQueryPerformed::class, function ($event) {
            return $event->resource === 'films';
        });
    }

    public function test_it_uses_correct_cache_key(): void
    {
        $mockResponse = [
            'message' => 'ok',
            'result' => ['uid' => '1'],
        ];

        Http::fake([
            'https://swapi.tech/api/people/1' => Http::response($mockResponse, 200),
            'https://swapi.tech/api/people/2' => Http::response($mockResponse, 200),
        ]);

        Event::fake([SwapiQueryPerformed::class]);

        // Make requests for different IDs
        $this->getJson('/api/swapi/people/1')->assertOk();
        $this->getJson('/api/swapi/people/2')->assertOk();

        // Verify cache keys are different
        $this->assertTrue(Cache::has('swapi:detail:people:1'));
        $this->assertTrue(Cache::has('swapi:detail:people:2'));

        // Verify both are cached correctly
        $cached1 = Cache::get('swapi:detail:people:1');
        $cached2 = Cache::get('swapi:detail:people:2');

        $this->assertNotNull($cached1);
        $this->assertNotNull($cached2);
    }

    public function test_it_handles_different_resource_types_with_same_id(): void
    {
        $peopleResponse = [
            'message' => 'ok',
            'result' => ['properties' => ['name' => 'Person 1']],
        ];

        $filmResponse = [
            'message' => 'ok',
            'result' => ['properties' => ['title' => 'Film 1']],
        ];

        Http::fake([
            'https://swapi.tech/api/people/1' => Http::response($peopleResponse, 200),
            'https://swapi.tech/api/films/1' => Http::response($filmResponse, 200),
        ]);

        Event::fake([SwapiQueryPerformed::class]);

        $this->getJson('/api/swapi/people/1')->assertOk();
        $this->getJson('/api/swapi/films/1')->assertOk();

        // Verify different cache keys are used
        $this->assertTrue(Cache::has('swapi:detail:people:1'));
        $this->assertTrue(Cache::has('swapi:detail:films:1'));

        // Verify events are dispatched for both
        Event::assertDispatched(SwapiQueryPerformed::class, 2);
    }
}

