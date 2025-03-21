<?php

use App\Http\Controllers\Backend\CommunityController;
use App\Http\Controllers\Backend\CommunityPostController;
use App\Http\Controllers\Backend\PostVoteController;
use App\Http\Controllers\Frontend\CommunityController as FrontendCommunityController;
use App\Http\Controllers\Frontend\PostCommentController;
use App\Http\Controllers\Frontend\PostController;
use App\Http\Controllers\Frontend\SubredditController;
use App\Http\Controllers\Frontend\WelcomeController;
use App\Models\Community;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [WelcomeController::class, 'welcome'])->name('home');

Route::get('/r/{slug}', [FrontendCommunityController::class, 'show'])->name('frontend.communities.show');
Route::get('/r/{community_slug}/posts/{post:slug}', [PostController::class, 'show'])->name('frontend.communities.posts.show');


Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
    Route::resource(name: '/communities', controller: CommunityController::class);
    Route::resource(name: '/communities.posts', controller: CommunityPostController::class);

    Route::post('/post/{post:slug}/upvote', [PostVoteController::class, 'upvote'])->name('posts.upvote');
    Route::post('/post/{post:slug}/downvote', [PostVoteController::class, 'downvote'])->name('posts.downvote');

    Route::post('/r/{community_slug}/posts/{post:slug}/comments', [PostCommentController::class, 'store'])->name('frontend.posts.comments');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
