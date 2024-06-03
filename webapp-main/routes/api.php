<?php

use App\Http\Controllers\WebhookController;
use Illuminate\Support\Facades\Route;


Route::post('webhook/{code}', WebhookController::class)->name('webhook-code');
