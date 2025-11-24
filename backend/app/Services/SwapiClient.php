<?php

namespace App\Services;

use Illuminate\Http\Client\Factory as HttpFactory;
use Illuminate\Http\Client\RequestException;
use InvalidArgumentException;

class SwapiClient
{
    public function __construct(
        private readonly HttpFactory $http,
    ) {
    }

    /**
     * @throws RequestException
     */
    public function fetch(string $resource, array $query = []): array
    {
        $endpoints = config('swapi.endpoints', []);

        if (! array_key_exists($resource, $endpoints)) {
            throw new InvalidArgumentException("Unsupported resource [{$resource}].");
        }

        return $this->http
            ->timeout(config('swapi.timeout'))
            ->acceptJson()
            ->get($endpoints[$resource], $query)
            ->throw()
            ->json();
    }

    /**
     * Fetch a single resource by ID
     *
     * @throws RequestException
     * @throws InvalidArgumentException
     */
    public function fetchDetail(string $resource, string $id): array
    {
        $endpoints = config('swapi.endpoints', []);

        if (! array_key_exists($resource, $endpoints)) {
            throw new InvalidArgumentException("Unsupported resource [{$resource}].");
        }

        $baseUrl = rtrim($endpoints[$resource], '/');
        $url = "{$baseUrl}/{$id}";

        return $this->http
            ->timeout(config('swapi.timeout'))
            ->acceptJson()
            ->get($url)
            ->throw()
            ->json();
    }
}

