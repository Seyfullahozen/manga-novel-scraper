<?php

namespace App\Http\Controllers;

use App\Models\Novel;
use App\Models\NovelRating;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class RatingController extends Controller
{
    public function rate(Request $request, string $type, int $id)
    {
        $request->validate([
            'rating' => ['required', 'numeric', 'min:0.5', 'max:5', 'in:0.5,1,1.5,2,2.5,3,3.5,4,4.5,5'],
        ]);

        [$modelClass, $ratingModel, $foreignKey] = $this->resolveRatingConfig($type);

        $model = $modelClass::findOrFail($id);

        $ratingModel::updateOrCreate(
            ['user_id' => Auth::id(), $foreignKey => $model->id],
            ['rating'  => $request->rating]
        );

        $avg   = $ratingModel::where($foreignKey, $model->id)->avg('rating');
        $count = $ratingModel::where($foreignKey, $model->id)->count();

        return response()->json([
            'average' => round($avg, 1),
            'count'   => $count,
            'yours'   => (float) $request->rating,
        ]);
    }

    private function resolveRatingConfig(string $type): array
    {
        return match ($type) {
            'manga' => [
                \App\Models\Manga::class,
                \App\Models\MangaRating::class,
                'manga_id'
            ],
            'novel' => [
                \App\Models\Novel::class,
                \App\Models\NovelRating::class,
                'novel_id'
            ],
            default => abort(404),
        };
    }
}
