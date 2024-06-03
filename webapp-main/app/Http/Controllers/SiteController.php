<?php

namespace App\Http\Controllers;

use App\Enums\TransactionType;
use App\Helpers\CollectionPaginator;
use App\Models\Payout;
use App\Models\Site;
use App\Models\Transaction;
use Brick\Money\Money;
use Illuminate\Contracts\Container\BindingResolutionException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;

class SiteController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Site/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string',
            'display_name' => 'required|string',
            'webhook_type' => 'required|string',
            'donation_feature_active' => 'required|boolean',
            'cut_percentage' => 'required|numeric',
            'logo' => 'required|image',
        ]);

        $validated['logo'] = $request
            ->file('logo')
            ->store('logos', 'public');

        $site = auth()->user()->sites()->create([
            ...$validated,
            'public_id' => Str::ulid(),
            'webhook_id' => Str::uuid(),
        ]);

        return to_route('site.show', ['site' => $site, 'onboarding' => true]);
    }

    /**
     * Display the specified resource.
     * @throws BindingResolutionException
     */
    public function show(Site $site, Request $request)
    {
        $scope = $request->input('scope', 'weekly');
        $donationTransactions = $site->transaction(at: $scope);


        return Inertia::render('Site/Show/Transactions', [
            'site' => $site,
            'stats' => [
                'total' => $donationTransactions->count(),
                'amount' => Str::rupiah($donationTransactions->sum('payment_amount')),
                'received' => Str::rupiah($donationTransactions->where('payout.is_finalized', true)->sum('payment_amount')),
                'pending' => Str::rupiah($site->transactions()->pending(TransactionType::Donation)->sum('payment_amount')),
            ],
            'transactions' => CollectionPaginator::paginate(
                results: $donationTransactions->map(function (Transaction $transaction) {
                    return [
                        'id' => $transaction->id,
                        'amount' => Str::rupiah($transaction->amount),
                        'payment_amount' => Str::rupiah($transaction->payment_amount),
                        'type' => $transaction->type,
                        'note' => $transaction->note,
                        'created_at' => $transaction->created_at->format('Y-m-d'),
                    ];
                }),
                perPage: 10
            )
        ]);
    }

    /**
     * @throws BindingResolutionException
     */
    public function userDonation(Site $site, Request $request)
    {
        $scope = $request->input('scope', 'weekly');
        $userDonations = $site->transaction(at: $scope, type: TransactionType::UserDonation);


        return Inertia::render('Site/Show/UserDonations', [
            'site' => $site,
            'stats' => [
                'total' => $userDonations->count(),
                'amount' => Str::rupiah($userDonations->sum('payment_amount')),
                'received' => Str::rupiah($userDonations->where('payout.is_finalized', true)->sum('payment_amount')),
                'pending' => Str::rupiah($site->transactions()->pending(TransactionType::UserDonation)->sum('payment_amount')),
            ],
            'donations' => CollectionPaginator::paginate(
                results: $userDonations->map(function (Transaction $transaction) {
                    return [
                        'id' => $transaction->id,
                        'amount' => Str::rupiah($transaction->amount),
                        'payment_amount' => Str::rupiah($transaction->payment_amount),
                        'type' => $transaction->type,
                        'note' => $transaction->note,
                        'created_at' => $transaction->created_at->format('Y-m-d'),
                    ];
                }),
                perPage: 10
            )
        ]);
    }

    public function invoice(Site $site)
    {
        $invoice = $site
            ->payouts()
            ->orderBy('is_finalized')
            ->paginate(25);


        return Inertia::render('Site/Show/Invoices', [
            'site' => $site,
            'invoices' => $invoice
                ->getCollection()
                ->transform(function (Payout $payout) {
                    return [
                        'id' => $payout->id,
                        'start_date' => $payout->start_date->format('Y-m-d'),
                        'end_date' => $payout->end_date->format('Y-m-d'),
                        'total_amount' => Str::rupiah($payout->total_amount),
                        'is_finalized' => $payout->is_finalized
                    ];
                }),
            'paginationLinks' => $invoice->linkCollection(),
        ]);
    }

    public function edit(Site $site, Request $request)
    {
        return Inertia::render('Site/Show/Settings', [
            'site' => $site,
            'onboarding' => $request->input('onboarding', false),
        ]);
    }

    public function update(Request $request, Site $site)
    {
        $validated = $request->validate([
            'name' => 'required|string',
            'display_name' => 'required|string',
            'donation_feature_active' => 'required|boolean',
            'cut_percentage' => 'required|numeric',
            'logo' => 'nullable|image',
        ]);

        if ($request->hasFile('logo')) {
            $validated['logo'] = $request
                ->file('logo')
                ->store('logos', 'public');
        }

        // update site. if the value is null, it will be ignored
        $site->update(array_filter($validated, fn($value) => $value !== null));

        // delete old logo
        if ($request->hasFile('logo')) {
            Storage::disk('public')->delete($site->getOriginal('logo'));
        }

        return to_route('site.edit', [
            'site' => $site,
        ])->with('message', 'Situs berhasil diupdate!');
    }
}
