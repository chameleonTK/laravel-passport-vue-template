<?php

namespace App\Providers;
use Laravel\Passport\Passport;
// use Illuminate\Support\Facades\Gate;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The model to policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        //
    ];

    /**
     * Register any authentication / authorization services.
     */
    public function boot(): void
    {
        Passport::tokensCan([
            // "superadmin" => "Role for a system manager; big boss",
            // "admin" => "Role for a system manager",
            // "branchadmin" => "Role for a branch manager",
            // "customer" => "Role for a customer",
        ]);
        
    }
}
