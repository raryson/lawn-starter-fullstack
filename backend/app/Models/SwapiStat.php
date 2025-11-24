<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SwapiStat extends Model
{
    use HasFactory;

    protected $fillable = [
        'key',
        'payload',
        'computed_at',
    ];

    protected $casts = [
        'payload' => 'array',
        'computed_at' => 'datetime',
    ];
}

