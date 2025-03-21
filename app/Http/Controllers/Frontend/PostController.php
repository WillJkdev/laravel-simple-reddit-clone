<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Http\Resources\PostResource;
use App\Http\Resources\PostShowResource;
use App\Models\Community;
use App\Models\Post;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PostController extends Controller
{
    public function show($community_slug, $slug, Request $request)
    {
        $community = Community::where('slug', $community_slug)->firstOrFail();

        $community_post = Post::with([
            'user',
            'comments' => function ($query) {
                $query->orderBy('updated_at', 'desc');
            },
            'comments.user',
            'community',
            'postVotes' => function ($query) use ($request) {
                $userId = $request->user()?->id;

                if ($userId) {
                    $query->where('user_id', $userId);
                } else {
                    $query->whereRaw('1 = 0');
                }
            }
        ])
            ->withCount('comments')
            ->where('slug', $slug)
            ->firstOrFail();

        $posts = PostResource::collection($community->posts()->orderBy('votes', 'desc')->take(6)->get());

        $can_update = $request->user()?->can('update', $community_post) ?: false;
        $can_delete = $request->user()?->can('delete', $community_post) ?: false;



        return Inertia::render('Frontend/Posts/Show', [
            'community' => $community,
            'post' => new PostShowResource($community_post),
            'posts' => $posts,
            'can_update' => $can_update,
            'can_delete' => $can_delete
        ]);
    }
}
