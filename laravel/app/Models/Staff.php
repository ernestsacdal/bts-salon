<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Salon;

class Staff extends Model
{
    use HasFactory;

    protected $table = 'staff';

    public function salon()
    {
        return $this->belongsTo(Salon::class);
    }
}
