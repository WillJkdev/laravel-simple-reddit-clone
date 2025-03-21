<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Http\Resources\CommunityPostResource;
use App\Http\Resources\CommunityResource;
use App\Models\Community;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CommunityController extends Controller
{
    public function show(Request $request, $slug)
    {
        $community = Community::where('slug', $slug)->firstOrFail();
        $userId = $request->user()?->id;

        $posts = $community->posts()->with(['user', 'community'])
            ->withCount(['postVotes', 'comments'])
            ->with([
                'postVotes' => function ($query) use ($userId) {
                    if ($userId) {
                        $query->where('user_id', $userId);
                    } else {
                        $query->whereRaw('1 = 0');
                    }
                }
            ])
            ->paginate(3);

        $communities = CommunityResource::collection(
            Community::withCount(['posts'])->orderBy('posts_count', 'desc')->latest()->take(4)->get()
        );
        return Inertia::render('Frontend/Communities/Show', [
            'community' => $community,
            'posts' => CommunityPostResource::collection($posts),
            'communities' => $communities
        ]);
    }
}
