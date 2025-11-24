<?php

namespace App\Http\Controllers;

use App\Events\SwapiQueryPerformed;
use App\Services\SwapiClient;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use InvalidArgumentException;

class SwapiDetailController extends Controller
{
    public function __construct(
        private readonly SwapiClient $client,
    ) {
    }

    public function __invoke(Request $request, string $resource, string $id): JsonResponse
    {
        // Generate cache key based on resource and ID
        $cacheKey = $this->generateCacheKey($resource, $id);

        try {
            $started = microtime(true);
            
            // Try to get from cache first (24 hours TTL)
            $payload = Cache::remember($cacheKey, now()->addHours(24), function () use ($resource, $id) {
                return $this->client->fetchDetail($resource, $id);
            });

            // Calculate duration (will be 0 or very small for cache hits)
            $duration = (int) round((microtime(true) - $started) * 1000);
            
            // Always dispatch event to count metrics, regardless of cache hit/miss
            SwapiQueryPerformed::dispatch($resource, $duration);

            return response()->json($payload);
        } catch (InvalidArgumentException $e) {
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }

    private function generateCacheKey(string $resource, string $id): string
    {
        return "swapi:detail:{$resource}:{$id}";
    }
}

