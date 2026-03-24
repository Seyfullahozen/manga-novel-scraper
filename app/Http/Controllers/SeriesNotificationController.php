<?php

namespace App\Http\Controllers;

use App\Models\FollowedSeries;
use Illuminate\Support\Facades\Auth;

class SeriesNotificationController extends Controller
{
    // Sidebar badge — son 24 saatte scraped_at güncellenen takip edilen seri sayısı
    public function unreadCount()
    {
        $count = FollowedSeries::where('user_id', Auth::id())
            ->with('subject')
            ->get()
            ->filter(function ($follow) {
                $model = $follow->subject;
                return $model && optional($model->scraped_at)->gt(now()->subDay());
            })
            ->count();

        return response()->json(['count' => $count]);
    }

    // markAllRead artık gerek yok ama route bozulmasın diye bırakıyoruz
    public function markAllRead()
    {
        return response()->json(['success' => true]);
    }
}
