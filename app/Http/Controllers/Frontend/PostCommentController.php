<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Request as FacadesRequest;

class PostCommentController extends Controller
{
    public function store($community_slug, Post $post)
    {
        if ($post->community->slug !== $community_slug) {
            abort(404, 'Post no encontrado en esta comunidad.');
        }
        $post->comments()->create([
            'user_id' => request()->user()->id,
            'content' => FacadesRequest::input('content'),
        ]);
    }
}
