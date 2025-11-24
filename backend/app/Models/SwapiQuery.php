<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SwapiQuery extends Model
{
    use HasFactory;

    protected $fillable = [
        'resource',
        'duration_ms',
    ];
}

