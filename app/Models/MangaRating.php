<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class MangaRating extends Model
{
    protected $fillable = ['user_id', 'manga_id', 'rating'];
    protected $casts    = ['rating' => 'float'];

    public function user(): BelongsTo  { return $this->belongsTo(User::class); }
    public function manga(): BelongsTo { return $this->belongsTo(Manga::class); }
}
