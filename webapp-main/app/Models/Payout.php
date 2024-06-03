<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Builder;
class Payout extends Model
{
    use HasFactory;

    protected $guarded = [];

    protected $casts = [
        'start_date' => 'date',
        'end_date' => 'date',
    ];

    public function transactions(): HasMany
    {
        return $this->hasMany(Transaction::class, 'payout_id');
    }

    public function site(): BelongsTo
    {
        return $this->belongsTo(Site::class);
    }


    public function scopeWeekly(Builder $query): Builder
    {
        return $query->where('start_date', '>=', Carbon::now()->subWeek());
    }

    public function scopeMonthly(Builder $query): Builder
    {
        return $query->where('start_date', '>=', Carbon::now()->subMonth());
    }

    public function scopeQuarterly(Builder $query): Builder
    {
        return $query->where('start_date', '>=', Carbon::now()->subMonths(3));
    }

    public function scopeYearly(Builder $query): Builder
    {
        return $query->where('start_date', '>=', Carbon::now()->subYear());
    }

    public function scopeAlltime(Builder $query): Builder
    {
        return $query;
    }
}
