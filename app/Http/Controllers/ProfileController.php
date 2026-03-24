<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rules\Password;

class ProfileController extends Controller
{
    public function show()
    {
        return view('site.profile');
    }

    public function update(Request $request)
    {
        $user = Auth::user();

        $rules = [
            'name'             => ['required', 'string', 'max:255'],
            'email'            => ['required', 'email', 'max:255', 'unique:users,email,' . $user->id],
            'username'         => ['nullable', 'string', 'max:255', 'alpha_dash', 'unique:users,username,' . $user->id],
            'display_name'     => ['nullable', 'string', 'max:255'],
            'telegram_chat_id' => ['nullable', 'string', 'max:255'],
            'bio'              => ['nullable', 'string', 'max:300'],

            // Ya dosya yükle ya URL gir — ikisi aynı anda olamaz
            'avatar_file'      => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:5120'],
            'avatar_url'       => ['nullable', 'string', 'max:500'],
        ];

        if ($request->filled('current_password') || $request->filled('password')) {
            $rules['current_password'] = ['required', 'current_password'];
            $rules['password']         = ['required', 'confirmed', Password::defaults()];
        }

        $validated = $request->validate($rules);

        $user->name             = $validated['name'];
        $user->email            = $validated['email'];
        $user->username         = $validated['username'] ?? null;
        $user->display_name     = $validated['display_name'] ?? null;
        $user->telegram_chat_id = $validated['telegram_chat_id'] ?? null;
        $user->bio              = $validated['bio'] ?? null;

        // Avatar: dosya yükleme öncelikli
        if ($request->hasFile('avatar_file')) {
            // Eski dosyayı sil (storage'da ise)
            if ($user->avatar_url && str_contains($user->avatar_url, '/storage/avatars/')) {
                $oldPath = str_replace(Storage::disk('public')->url(''), '', $user->avatar_url);
                Storage::disk('public')->delete($oldPath);
            }

            $path = $request->file('avatar_file')->store('avatars', 'public');
            $user->avatar_url = Storage::disk('public')->url($path);

        } elseif ($request->filled('avatar_url')) {
            $user->avatar_url = $validated['avatar_url'];

        } elseif ($request->input('avatar_url') === '') {
            // URL alanı temizlendiyse avatar'ı kaldır
            $user->avatar_url = null;
        }

        if ($request->filled('password')) {
            $user->password = Hash::make($validated['password']);
        }

        $user->save();

        return redirect()->route('site.profile')->with('success', 'Profil bilgilerin güncellendi.');
    }
}
