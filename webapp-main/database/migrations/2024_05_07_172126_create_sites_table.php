<?php

use App\Models\User;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('sites', function (Blueprint $table) {
            $table->id();
            $table->ulid('public_id');
            $table->foreignIdFor(User::class);
            $table->string('name');
            $table->string('display_name');
            $table->string('logo')->nullable();
            $table->uuid('webhook_id');
            $table->string('webhook_type');
            $table->boolean('is_active')->default(true);
            $table->boolean('donation_feature_active')->default(false);
            $table->float('cut_percentage')->default(1.0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sites');
    }
};
