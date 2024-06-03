<?php

namespace App\Models;

use App\Enums\TransactionType;
use Carbon\Carbon;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;


class Transaction extends Model
{
    protected $guarded = [];

    protected $casts = [
        'type' => TransactionType::class
    ];

    public function payout(): BelongsTo
    {
        return $this->belongsTo(Payout::class);
    }

    public function site(): BelongsTo
    {
        return $this->belongsTo(Site::class);
    }

    // scope pending donation
    public function scopePending($query, TransactionType $type)
    {
        return $query->where('type', $type)
            ->whereDoesntHave('payout', function ($query) {
                $query->where('is_finalized', false);
            });
    }

}
