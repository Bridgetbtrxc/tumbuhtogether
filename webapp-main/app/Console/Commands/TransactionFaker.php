<?php

namespace App\Console\Commands;

use App\Models\Payout;
use App\Models\Site;
use Carbon\Carbon;
use Carbon\CarbonInterface;
use Illuminate\Console\Command;
use Illuminate\Support\Collection;
use Illuminate\Support\Str;
use function Laravel\Prompts\{select, text};

class TransactionFaker extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:transaction-faker';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $selectedSite = select(
            label: 'Select a site',
            options: Site::pluck('name', 'id')->toArray(),
            required: true
        );

        $selectedSite = Site::find($selectedSite);
        $date = select(
            label: 'Select a range or this week?',
            options: [
                'thisWeek' => 'This week',
                'customRange' => 'Custom range'
            ]
        );

        $finalized = select(
            label: 'Is finalized?',
            options: ['Random', 'Yes', 'No'],
            required: true
        );

        $range = match ($date) {
            'thisWeek' => $this->thisWeekFaker($selectedSite, $finalized),
            'customRange' => $this->customRangeFaker($selectedSite, $finalized)
        };


        $amount = text(label: 'Enter the amount', required: true);


        foreach ($range as $payout) {
            foreach (range(1, $amount) as $ignored) {
                $rand = rand(0, 1);
                $amount_rand = rand(100000, 10000000);
                $user_rand_amt = rand(10000, 100000);
                $cut = ($amount_rand * $selectedSite->cut_percentage) / 100;

                $payout->transactions()->create([
                    'site_id' => $selectedSite->id,

                    'amount' => $rand == 0
                        ? $amount_rand
                        : $user_rand_amt,

                    'payment_amount' => $rand == 0
                        ? $cut
                        : $user_rand_amt,

                    'type' => ['donation', 'user_donation'][$rand],
                    'note' => $rand == 0 ? 'Potongan keuntungan transaksi' : 'Donasi pengguna'
                ]);
            }

            $payout->update([
                'total_amount' => $payout->transactions->sum('payment_amount'),
                'total_transactions' => $payout->transactions->count()
            ]);
        }
    }

    /*
     * @return array<Payout>
     * */
    public function thisWeekFaker(Site $site, string $finalized): array
    {
        $startOfWeek = now()->startOfWeek();

        return [
            $site->payouts()->create([
                'start_date' => $startOfWeek,
                'end_date' => $startOfWeek->addWeek(),
                'total_amount' => 0,
                'is_finalized' => match ($finalized) {
                    'Yes' => true,
                    'No' => false,
                    'Random' => (bool)rand(0, 1)
                }
            ])
        ];
    }

    private function customRangeFaker(Site $site, string $finalized): Collection
    {
        $start = text(label: 'Enter the start date', required: true);
        $end = text(label: 'Enter the end date', required: true);

        $dates = collect();

        // Ensure Carbon is used for date manipulation
        $startDate = Carbon::parse($start);
        $endDate = Carbon::parse($end);

        // Adjust the start date to the next Monday if it's not a Monday
        if ($startDate->dayOfWeek !== CarbonInterface::MONDAY) {
            $startDate->modify('next monday');
        }

        // Loop to create one-week blocks from Monday to the following Monday
        while ($startDate->lte($endDate)) {
            $nextMonday = $startDate->copy()->addWeek();
            $dates->push([$startDate->toDateString(), $nextMonday->toDateString()]);
            $startDate = $nextMonday;
        }

        $payouts = collect();

        foreach ($dates as $date) {
            $payouts->push($site->payouts()->create([
                'start_date' => $date[0],
                'end_date' => $date[1],
                'total_amount' => 0,
                'is_finalized' => match ($finalized) {
                    'Yes' => true,
                    'No' => false,
                    'Random' => (bool)rand(0, 1)
                }
            ]));
        }





        return $payouts;
    }
}
