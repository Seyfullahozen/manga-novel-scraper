<?php

namespace App\Http\Controllers;

use App\Models\FollowedSeries;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Database\Eloquent\Model;

class FollowController extends Controller
{
    public function toggle(Request $request, string $type, int $id)
    {
        $user = Auth::user();

        $model = $this->resolveModel($type, $id);

        $existing = FollowedSeries::where('user_id', $user->id)
            ->where('subject_type', get_class($model))
            ->where('subject_id', $model->id)
            ->first();

        if ($existing) {
            $existing->delete();
            $following = false;
        } else {
            FollowedSeries::create([
                'user_id'         => $user->id,
                'subject_type'    => get_class($model),
                'subject_id'      => $model->id,
                'notify_telegram' => true,
            ]);
            $following = true;
        }

        if ($request->expectsJson()) {
            return response()->json([
                'following' => $following,
                'message'   => $following ? 'Takip edildi.' : 'Takip bırakıldı.',
            ]);
        }

        return back();
    }

    private function resolveModel(string $type, int $id): Model
    {
        return match ($type) {
            'manga' => \App\Models\Manga::findOrFail($id),
            'novel' => \App\Models\Novel::findOrFail($id),
            default => abort(404),
        };
    }

    public function index()
    {
        // Novel + Manga takipleri birlikte — subject ile eager load
        $followed = FollowedSeries::where('user_id', Auth::id())
            ->with('subject')
            ->latest()
            ->get();

        $progressMap = [];
        if (auth()->check()) {
            $progressMap = \App\Models\ReadingHistory::where('user_id', Auth::id())
                ->whereIn('readable_id', $followed->pluck('subject_id'))
                ->get(['readable_type', 'readable_id', 'chapter_number'])
                ->keyBy(fn($r) => $r->readable_type . ':' . $r->readable_id);
        }

        return view('site.series-followed', compact('followed', 'progressMap'));
    }
}
