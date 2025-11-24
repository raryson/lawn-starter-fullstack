<?php

namespace App\Http\Controllers;

use App\Events\SwapiQueryPerformed;
use App\Services\SwapiClient;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

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

        $started = microtime(true);
        $payload = $this->client->fetch($resource, $query);
        $duration = (int) round((microtime(true) - $started) * 1000);

        SwapiQueryPerformed::dispatch($resource, $duration);

        return response()->json($payload);
    }
}

