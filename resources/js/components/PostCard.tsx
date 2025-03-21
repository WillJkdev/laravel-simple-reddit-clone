import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { PostVote } from '@/interfaces';
import { Link } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';
import PostVotes from './PostVote';

interface RedditPostProps {
  community_slug: string;
  community_name: string;
  username: string;
  title: string;
  description: string;
  votes?: number;
  slug?: string;
  postVote?: PostVote[];
  comments_count?: number;
  userVote?: 'up' | 'down' | null;
}

export default function RedditPost({
  community_slug = 'default-slug',
  community_name = 'r/SinComunidad',
  username = 'username',
  title = 'Titulo vacio',
  description = 'Descripcion vacia',
  comments_count = 2,
  votes = 10,
  slug = 'slug',
  userVote = null,
}: RedditPostProps) {
  return (
    <Card className="max-w-3xl border border-gray-300 shadow-sm transition-all dark:border-gray-700 dark:bg-gray-950">
      <div className="flex">
        {/* vote section */}
        <PostVotes votes={votes} slug={slug} user_vote={userVote} />

        {/* Post description */}
        <div className="flex-1">
          <CardHeader className="px-3 pt-3 pb-2">
            <div className="flex items-center gap-1 text-sm">
              <Link
                href={route('frontend.communities.show', community_slug)}
                className="font-medium text-gray-900 hover:underline dark:text-gray-200"
              >
                r/{community_name}
              </Link>
              <span className="text-gray-500 dark:text-gray-500">•</span>
              <span className="text-gray-500 dark:text-gray-400">Posted by</span>
              <Link href="#" className="text-gray-500 hover:underline dark:text-gray-400 dark:hover:text-gray-300">
                {username}
              </Link>
            </div>
            <h2 className="mt-1 text-xl font-bold text-gray-900 dark:text-gray-100">{title}</h2>
          </CardHeader>

          <CardContent className="px-3 py-2">
            <p className="text-sm text-gray-700 dark:text-gray-300">{description}</p>
          </CardContent>

          <CardFooter className="flex items-center gap-2 px-3 pt-0 pb-3">
            <Button
              variant="outline"
              size="sm"
              className="h-8 rounded-full border-gray-300 text-xs text-gray-600 dark:border-gray-500 dark:text-gray-300"
            >
              Comments ( {comments_count} )
            </Button>
            <Link
              href={route('frontend.communities.posts.show', { community_slug, post: { slug } })}
              className="flex h-8 items-center rounded-full bg-blue-600 px-3 text-xs text-white hover:bg-blue-700 dark:bg-blue-400 dark:hover:bg-blue-500"
            >
              Read more <ArrowRight className="ml-1 h-3 w-3" />
            </Link>
          </CardFooter>
        </div>
      </div>
    </Card>
  );
}
