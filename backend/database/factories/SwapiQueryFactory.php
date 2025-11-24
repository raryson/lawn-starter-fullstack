<?php

namespace Database\Factories;

use App\Models\SwapiQuery;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<SwapiQuery>
 */
class SwapiQueryFactory extends Factory
{
    protected $model = SwapiQuery::class;

    public function definition(): array
    {
        $resources = array_keys(config('swapi.endpoints', []));

        if (empty($resources)) {
            $resources = ['people'];
        }

        return [
            'resource' => $this->faker->randomElement($resources),
            'duration_ms' => $this->faker->numberBetween(20, 200),
        ];
    }
}

