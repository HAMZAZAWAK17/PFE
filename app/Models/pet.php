<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class pet extends Model
{
    use HasFactory;
    
    protected $fillable = ['nom', 'photo', 'description','sexe','espece','age','sante','visibility'];

    public function orders()
    {
        return $this->hasMany(Order::class);
    }
}