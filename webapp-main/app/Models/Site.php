<?php

namespace App\Models;

use App\Enums\TransactionType;
use App\Enums\WebhookType;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;

class Site extends Model
{
    use HasFactory;

    protected $guarded = [];

    protected $casts = [
        'webhook_type' => WebhookType::class,
    ];

    public function getRouteKeyName(): string
    {
        return 'public_id';
    }

    public function payouts(): HasMany
    {
        return $this->hasMany(Payout::class, 'site_id');
    }

    public function transactions(): HasMany
    {
        return $this->hasMany(Transaction::class, 'site_id');
    }

    public function transaction($at = 'weekly', $type = TransactionType::Donation): Collection
    {
        return $this->transactions()
            ->where('type', $type)
            ->whereHas('payout', function ($query) use ($at) {
                $query->when($at, function ($query, $scope) {
                    if (method_exists(Payout::class, 'scope' . ucfirst($scope))) {
                        $query->{$scope}();
                    } else {
                        $query->weekly();
                    }
                });
            })
            ->with('payout')
            ->get();
    }

}
