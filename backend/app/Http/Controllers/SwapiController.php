<?php

namespace App\Http\Controllers;

use App\Events\SwapiQueryPerformed;
use App\Services\SwapiClient;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class SwapiController extends Controller
{
    public function __construct(
        private readonly SwapiClient $client,
    ) {
    }

    public function __invoke(Request $request): JsonResponse
    {
        $resource = $request->query('resource', config('swapi.default_resource'));
        $query = collect($request->query())->except('resource')->toArray();

        // Transform 'search' parameter based on resource type
        if (isset($query['search'])) {
            if ($resource === 'people') {
                $query['name'] = $query['search'];
                unset($query['search']);
            } elseif ($resource === 'films') {
                $query['title'] = $query['search'];
                unset($query['search']);
            }
        }

        // Generate cache key based on resource and query parameters
        $cacheKey = $this->generateCacheKey($resource, $query);

        // Try to get from cache first (24 hours TTL)
        $payload = Cache::remember($cacheKey, now()->addHours(24), function () use ($resource, $query) {
            $started = microtime(true);
            $data = $this->client->fetch($resource, $query);
            $duration = (int) round((microtime(true) - $started) * 1000);

            SwapiQueryPerformed::dispatch($resource, $duration);

            return $data;
        });

        return response()->json($payload);
    }

    private function generateCacheKey(string $resource, array $query): string
    {
        // Sort query parameters to ensure consistent cache keys
        ksort($query);
        $queryString = http_build_query($query);
        
        return "swapi:{$resource}:" . md5($queryString);
    }
}

