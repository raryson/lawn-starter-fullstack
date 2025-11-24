<?php

return [
    /*
    |--------------------------------------------------------------------------
    | External API Base URL
    |--------------------------------------------------------------------------
    |
    | This is the root URL used by the ExternalApiClient when building
    | requests. It should not include the resource path; instead, pass the
    | specific resource you want to fetch when invoking the client.
    |
    */
    'base_url' => env('EXTERNAL_API_BASE_URL', 'https://api.example.com'),

    /*
    |--------------------------------------------------------------------------
    | Authentication Token
    |--------------------------------------------------------------------------
    |
    | If the upstream service requires token-based authentication, provide it
    | here. The token will automatically be attached to every outbound request.
    |
    */
    'token' => env('EXTERNAL_API_TOKEN'),

    /*
    |--------------------------------------------------------------------------
    | Request Timeout (seconds)
    |--------------------------------------------------------------------------
    |
    | Keep the timeout modest so this service fails fast instead of tying up
    | workers when an upstream dependency misbehaves.
    |
    */
    'timeout' => (int) env('EXTERNAL_API_TIMEOUT', 10),

    /*
    |--------------------------------------------------------------------------
    | Default Resource
    |--------------------------------------------------------------------------
    |
    | This is the default resource path that will be queried when no explicit
    | resource parameter is provided by the incoming request.
    |
    */
    'default_resource' => env('EXTERNAL_API_RESOURCE', 'data'),
];

