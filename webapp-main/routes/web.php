<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SiteController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

//contoh routing
Route::get('/home', function () {
    return Inertia::render('Home');
})->name('home');


Route::get('/about-us', function () {
    return Inertia::render('AboutUs');
})->name('about-us');

Route::get('/project-gallery', function () {
    return Inertia::render('ProjectGallery');
})->name('project-gallery');

Route::prefix('/dashboard')->middleware(['auth', 'verified'])->group(function () {
    Route::inertia('/', 'Dashboard/Dashboard')->name('dashboard');
    Route::inertia('/donation-report', 'Dashboard/DonationReport')->name('donation-report');

    Route::prefix('site')->group(function () {
        Route::get('/', [SiteController::class, 'index'])->name('site.index');
        Route::get('/create', [SiteController::class, 'create'])->name('site.create');
        Route::post('/', [SiteController::class, 'store'])->name('site.store');
        Route::get('/{site}', [SiteController::class, 'show'])->name('site.show');
        Route::get('/{site}/user-donations', [SiteController::class, 'userDonation'])->name('site.user-donation');
        Route::get('/{site}/invoices', [SiteController::class, 'invoice'])->name('site.invoices');
        Route::get('/{site}/settings', [SiteController::class, 'edit'])->name('site.edit');
        Route::patch('/{site}', [SiteController::class, 'update'])->name('site.update');
    });

    //Route::resource('/site', SiteController::class);
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});


require __DIR__ . '/auth.php';
