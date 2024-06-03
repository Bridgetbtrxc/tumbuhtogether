<?php

namespace App\Providers;


use Brick\Money\Money;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Str;
use Inertia\Inertia;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Str::macro('rupiah', function ($value) {
            return Money::of($value, 'IDR')->formatTo('id_ID');
        });
    }
}
