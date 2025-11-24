<?php

return [
    'timeout' => (int) env('SWAPI_TIMEOUT', 10),
    'default_resource' => 'people',
    'endpoints' => [
        'films' => 'https://swapi.tech/api/films',
        'people' => 'https://swapi.tech/api/people',
        'planets' => 'https://swapi.tech/api/planets',
        'species' => 'https://swapi.tech/api/species',
        'starships' => 'https://swapi.tech/api/starships',
        'vehicles' => 'https://swapi.tech/api/vehicles',
    ],
];

