<?php

namespace App\Http\Controllers;

use App\Models\Novel;
use App\Models\ReadingHistory;
use Illuminate\Support\Facades\Auth;

class ReadingHistoryController extends Controller
{
    public function index()
    {
        $history = ReadingHistory::where('user_id', Auth::id())
            ->with('readable')  // Novel
            ->orderByDesc('read_at')
            ->get();

        return view('site.reading-history', compact('history'));
    }
}
