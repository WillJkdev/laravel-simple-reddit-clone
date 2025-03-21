<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Http\Resources\CommunityPostResource;
use App\Http\Resources\CommunityResource;
use App\Models\Community;
use App\Models\Post;
use Illuminate\Http\Request;
use Inertia\Inertia;

class WelcomeController extends Controller
{
    public function welcome(Request $request)
    {
        $posts = CommunityPostResource::collection(
            Post::with([
                'community',
                'user',
                'postVotes' => function ($query) use ($request) {
                    if ($userId = $request->user()?->id) {
                        // Solo filtra votos si hay un usuario logueado
                        $query->where('user_id', $userId);
                    }
                }
            ])
                ->withCount(['comments', 'postVotes'])
                ->orderBy('votes', 'desc')
                ->take(12)
                ->get()
        );
        $communities = CommunityResource::collection(
            Community::withCount(['posts'])
                ->orderBy('posts_count', 'desc')
                ->take(6)
                ->get()
        );
        return Inertia::render('welcome', compact('posts', 'communities'));
    }
}
