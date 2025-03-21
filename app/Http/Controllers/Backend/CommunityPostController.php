<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use App\Http\Requests\StorePostRequest;
use App\Models\Community;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class CommunityPostController extends Controller
{
    public function create(Community $community)
    {
        return Inertia::render('Communities/Posts/Create', compact('community'));
    }

    public function store(StorePostRequest $request, Community $community)
    {
        $community->posts()->create($request->validated() + ['user_id' => $request->user()->id]);

        return to_route('frontend.communities.show', $community->slug)->with('message', 'Post creado.');
    }
    public function edit(Community $community, Post $post)
    {
        Gate::authorize('update', $post);
        return Inertia::render('Communities/Posts/Edit', compact('community', 'post'));
    }
    public function update(StorePostRequest $request, Community $community, Post $post)
    {
        Gate::authorize('update', $post);
        $post->update($request->validated());

        return Redirect::route('frontend.communities.posts.show', [$community->slug, $post->slug])->with('message', 'Post actualizado.');
    }
    public function destroy(Community $community, Post $post)
    {
        Gate::authorize('delete', $post);
        $post->delete();

        return Redirect::route('frontend.communities.show', $community->slug)->with('message', 'Post eliminado.');
    }
}
