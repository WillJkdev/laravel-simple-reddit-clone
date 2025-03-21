<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CommentResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'username' => $this->whenLoaded('user', fn() => $this->user->username),
            'content' => $this->content,
            'updated_at' => $this->updated_at->format('Y-m-d H:i:s'),
        ];
    }
}
