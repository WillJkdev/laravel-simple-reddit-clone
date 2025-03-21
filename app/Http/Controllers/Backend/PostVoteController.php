<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use App\Models\Post;
use App\Models\PostVote;
use Illuminate\Http\Request;

class PostVoteController extends Controller
{
    public function upvote(Request $request, Post $post)
    {
        $user = $request->user();

        // Buscar si el usuario ya ha votado
        $vote = PostVote::where('post_id', $post->id)
            ->where('user_id', $user->id)
            ->first();

        if ($vote) {
            if ($vote->vote === -1) {
                // Cambiar voto de negativo a positivo
                $vote->update(['vote' => 1]);
                $post->increment('votes', 2);
            } elseif ($vote?->vote === 1) {
                // Si ya votó positivo, eliminar voto
                $vote->delete();
                $post->decrement('votes', 1);
                return redirect()->back()->with('message', 'Vote removed successfully');
            }
        } else {
            // Crear nuevo voto positivo
            PostVote::create([
                'post_id' => $post->id,
                'user_id' => $user->id,
                'vote' => 1,
            ]);
            $post->increment('votes', 1);
        }

        return redirect()->back()->with('message', 'Vote updated successfully');
    }

    public function downvote(Request $request, Post $post)
    {
        $user = $request->user();

        // Buscar si el usuario ya ha votado
        $vote = PostVote::where('post_id', $post->id)
            ->where('user_id', $user->id)
            ->first();

        if ($vote) {
            if ($vote->vote === 1) {
                // Cambiar voto de positivo a negativo
                $vote->update(['vote' => -1]);
                $post->decrement('votes', 2);
            } elseif ($vote->vote === -1) {
                // Si ya votó negativo, eliminar voto
                $vote->delete();
                $post->increment('votes', 1);
                return redirect()->back()->with('message', 'Vote removed successfully');
            }
        } else {
            // Crear nuevo voto negativo
            PostVote::create([
                'post_id' => $post->id,
                'user_id' => $user->id,
                'vote' => -1,
            ]);
            $post->decrement('votes', 1);
        }

        return redirect()->back()->with('message', 'Vote updated successfully');
    }

    public function removeVote(Request $request, $post)
    {
        // Logic to handle removing a vote from a post
        // For example, you might want to update the post's vote count in the database
    }
    public function getVote(Request $request, $post)
    {
        // Logic to handle getting the current vote status of a post
        // For example, you might want to return the current vote count or the user's vote status
    }
}
