<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reservation extends Model
{
    use HasFactory;
    
    protected $fillable = ['nom', 'espece', 'date_debut', 'date_fin','pet_count','duree','prix'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
    
}