<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CommunityPostResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'community_name' => $this->whenLoaded('community', fn() => $this->community->name),
            'title' => $this->title,
            'description' => $this->description,
            'username' => $this->whenLoaded('user', fn() => $this->user->username),
            'slug' => $this->slug,
            'votes' => $this->votes,
            'postVotes' => $this->whenLoaded('postVotes'),
            'user_vote' => $this->postVotes->first()?->vote === 1 ? 'up' : ($this->postVotes->first()?->vote === -1 ? 'down' : null),
            'comments_count' => $this->comments_count,
            'post_votes_count' => $this->post_votes_count,
            'community_slug' => $this->community->slug,
        ];
    }
}
