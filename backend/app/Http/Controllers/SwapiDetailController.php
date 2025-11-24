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
            // Try to get from cache first (24 hours TTL)
            $payload = Cache::remember($cacheKey, now()->addHours(24), function () use ($resource, $id) {
                $started = microtime(true);
                $data = $this->client->fetchDetail($resource, $id);
                $duration = (int) round((microtime(true) - $started) * 1000);

                SwapiQueryPerformed::dispatch($resource, $duration);

                return $data;
            });

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

