<?php

namespace App\Providers;

use App\Events\SwapiQueryPerformed;
use App\Events\SwapiStatsRecomputeRequested;
use App\Listeners\DispatchSwapiStatsComputation;
use App\Listeners\PersistSwapiQuery;
use Illuminate\Auth\Events\Registered;
use Illuminate\Auth\Listeners\SendEmailVerificationNotification;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;

class EventServiceProvider extends ServiceProvider
{
    /**
     * The event to listener mappings for the application.
     *
     * @var array<class-string, array<int, class-string>>
     */
    protected $listen = [
        Registered::class => [
            SendEmailVerificationNotification::class,
        ],
        SwapiQueryPerformed::class => [
            PersistSwapiQuery::class,
        ],
        SwapiStatsRecomputeRequested::class => [
            DispatchSwapiStatsComputation::class,
        ],
    ];

    /**
     * Register any events for your application.
     */
    public function boot(): void
    {
        //
    }

    /**
     * Determine if events and listeners should be automatically discovered.
     */
    public function shouldDiscoverEvents(): bool
    {
        return false;
    }
}
