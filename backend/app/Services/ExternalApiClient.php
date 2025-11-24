<?php

namespace App\Services;

use Illuminate\Http\Client\Factory as HttpFactory;
use Illuminate\Http\Client\RequestException;
use Illuminate\Support\Str;

class ExternalApiClient
{
    public function __construct(
        private readonly HttpFactory $http,
    ) {
    }

    /**
     * Fetch data from the upstream service.
     *
     * @throws RequestException
     */
    public function get(string $resource, array $query = []): array
    {
        $baseUrl = rtrim(config('external.base_url'), '/');

        if (empty($baseUrl)) {
            throw new \RuntimeException('External API base URL is not configured.');
        }

        $path = Str::of($resource)->ltrim('/');

        $request = $this->http
            ->baseUrl($baseUrl)
            ->timeout(config('external.timeout'));

        if ($token = config('external.token')) {
            $request = $request->withToken($token);
        }

        return $request
            ->get($path->toString(), $query)
            ->throw()
            ->json();
    }
}

