<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Salon;

class Inventory extends Model
{
    use HasFactory;

    protected $table = 'inventory';
    protected $fillable = ['salon_id', 'name', 'quantity', 'price', 'image'];

    /**
     * Define a one-to-many relationship with the Salon model.
     */
    public function salon()
    {
        return $this->belongsTo(Salon::class);
    }
}
