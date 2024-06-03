<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('payouts', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(\App\Models\Site::class);
            $table->date('start_date');
            $table->date('end_date')->nullable();
            $table->integer('total_transactions')->default(0);
            $table->bigInteger('total_amount')->default(0); // To store the total amount for this payout
            $table->boolean('is_finalized')->default(false); // Indicates if the payout is locked and finalized
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payouts');
    }
};
