<?php

namespace App\Http\Controllers;

use App\Services\ExternalApiClient;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ExternalDataController extends Controller
{
    public function __construct(
        private readonly ExternalApiClient $client,
    ) {
    }

    public function __invoke(Request $request): JsonResponse
    {
        $resource = $request->query('resource', config('external.default_resource'));
        $query = collect($request->query())->except('resource')->toArray();

        $payload = $this->client->get($resource, $query);

        return response()->json($payload);
    }
}

