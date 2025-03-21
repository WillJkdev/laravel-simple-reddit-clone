export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

export interface Community {
  id: string;
  name: string;
  slug: string;
  description?: string;
  posts_count?: number;
  icon?: string;
  color?: string;
  isPopular?: boolean;
  members?: number;
}

export interface PostVote {
  id: number;
  post_id: number;
  user_id: number;
  vote: number;
  created_at: string;
  updated_at: string;
}

export interface Comment {
  id: string;
  user: User;
  username: string;
  content: string;
  updated_at: string;
  votes?: number;
  replies?: Comment[];
}

export interface Post {
  id: number;
  title: string;
  description: string;
  created_at: string;
  updated_at: string;
  owner: boolean;
  votes?: number;
  user: User;
  community: Community;
  comments_count?: number;
  comments?: Comment[];
  user_vote?: 'up' | 'down' | null;
  postVotes: PostVote[];
  community_slug: string;
  username: string;
  community_name: string;
  slug: string;
}
export interface PostSummary {
  id: string;
  title: string;
  slug: string;
  votes: number;
  icon?: string;
  color?: string;
  isPopular?: boolean;
}
