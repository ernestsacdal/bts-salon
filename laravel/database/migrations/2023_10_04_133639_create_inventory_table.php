<?php

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
        Schema::create('inventory', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('salon_id'); // Foreign key for the salon
            $table->string('name');
            $table->integer('quantity');
            $table->decimal('price', 10, 2);
            $table->string('image');
            $table->boolean('available')->default(0);
            $table->timestamps();
    
            // Define the foreign key constraint
            $table->foreign('salon_id')->references('id')->on('salon');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('inventory');
    }
};
