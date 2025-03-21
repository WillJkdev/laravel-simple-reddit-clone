<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PostShowResource extends JsonResource
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
            'url' => $this->url,
            'created_at' => $this->created_at->format('Y-m-d H:i:s'),
            'updated_at' => $this->updated_at->format('Y-m-d H:i:s'),
            // 'owner' => $request->user()?->id === optional($this->user)->id,
            'comments' => CommentResource::collection($this->whenLoaded('comments')),
            'comments_count' => $this->comments_count,
            'votes' => $this->votes,
            'user_vote' => $this->postVotes->first()?->vote === 1 ? 'up' : ($this->postVotes->first()?->vote === -1 ? 'down' : null),
        ];
    }
}
