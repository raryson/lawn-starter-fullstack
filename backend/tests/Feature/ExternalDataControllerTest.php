<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Http;
use Tests\TestCase;

class ExternalDataControllerTest extends TestCase
{
    use RefreshDatabase;

    public function test_it_returns_external_payload(): void
    {
        config()->set('external.base_url', 'https://upstream.test');

        Http::fake([
            'https://upstream.test/items*' => Http::response(['data' => ['id' => 1]], 200),
        ]);

        $response = $this->getJson('/api/external-data?resource=items&limit=5');

        $response
            ->assertOk()
            ->assertJson(['data' => ['id' => 1]]);
    }

    public function test_it_uses_default_resource_when_none_provided(): void
    {
        config()->set('external.base_url', 'https://upstream.test');
        config()->set('external.default_resource', 'default-items');

        Http::fake([
            'https://upstream.test/default-items*' => Http::response(['data' => []], 200),
        ]);

        $this->getJson('/api/external-data')
            ->assertOk()
            ->assertJson(['data' => []]);
    }
}

