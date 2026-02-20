<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class ScrapeRun extends Model
{
    protected $fillable = [
        'type',
        'url',
        'status',
        'started_at',
        'finished_at',
        'error',
        'subject_type',
        'subject_id',
        'trigger',
        'batch_id',
    ];

    protected $casts = [
        'started_at' => 'datetime',
        'finished_at' => 'datetime',
    ];

    // ✅ Bu run hangi modele ait? (Novel mi Manga mı?)
    public function subject(): MorphTo
    {
        return $this->morphTo();
    }

    // ✅ Mevcut events ilişkini koruyoruz
    public function events(): HasMany
    {
        return $this->hasMany(ScrapeRunEvent::class, 'scrape_run_id')
            ->orderBy('id');
    }
}
