import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Comment } from '@/interfaces';
import { type SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';
import { Bookmark, Gift, MessageSquare, MoreHorizontal, Share2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import CommentInput from './CommentInput';
import CommentItem from './CommentItem';
import PostVote from './PostVote';

interface RedditPostDetailProps {
  owner: boolean;
  community_name: string;
  community: { slug: string };
  created_at: string;
  updated_at: string;
  username: string;
  title: string;
  description?: string;
  slug: string;
  url?: string;
  votes?: number;
  comments_count?: number;
  comments?: Comment[];
  user_vote?: 'up' | 'down' | null;
  can_update?: boolean;
  can_delete?: boolean;
}

export default function RedditPostDetail({
  owner = false,
  community_name = 'r/Laravel',
  created_at = '2025-03-15 19:23:48',
  updated_at = '2025-03-15 19:23:48',
  username = 'username',
  title = 'Noteworthy technology acquisitions 2021',
  description = 'Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.',
  url = 'https://example.com',
  slug = 'ejemplo-slug',
  votes = 42,
  comments_count = 0,
  comments = [],
  community = { slug: 'sin-comunidad' },
  user_vote = null,
  can_update = false,
  can_delete = false,
}: RedditPostDetailProps) {
  const [relativeTime, setRelativeTime] = useState(formatDistanceToNow(new Date(updated_at), { addSuffix: true, locale: es }));
  const { auth } = usePage<SharedData>().props;
  useEffect(() => {
    const interval = setInterval(() => {
      setRelativeTime(formatDistanceToNow(new Date(updated_at), { addSuffix: true, locale: es }));
    }, 60000); // Se actualiza cada minuto

    return () => clearInterval(interval); // Limpia el intervalo
  }, [updated_at]);
  const handleCommentClick = () => {
    if (!auth.user) {
      window.location.href = '/login';
    }
  };
  return (
    <div className="mx-auto w-full max-w-4xl rounded-md">
      <Card className="border-gray-200 shadow-sm dark:border-gray-700">
        <div className="flex">
          {/* Voting section */}
          <PostVote votes={votes} slug={slug} user_vote={user_vote} />

          {/* Post content */}
          <div className="flex-1">
            <CardHeader className="px-4 pt-3 pb-2">
              <div className="flex items-center justify-between gap-1 text-xs leading-tight text-gray-500 md:text-sm dark:text-gray-400">
                <div>
                  <Link href="#" className="font-medium text-gray-900 hover:underline dark:text-gray-100">
                    r/{community_name}
                  </Link>
                  <span>•</span>
                  <span>{relativeTime}</span>
                </div>
                {auth.user && (
                  <div className="flex items-center gap-2 text-xs leading-tight text-gray-500">
                    <div className="dark:hover:text-blue-600">
                      {can_update && (
                        <Link href={route('communities.posts.edit', [community.slug, slug])} className="hover:underline">
                          Edit
                        </Link>
                      )}
                    </div>
                    <div className="dark:hover:text-red-600">
                      {can_delete && (
                        <Link
                          href={route('communities.posts.destroy', [community.slug, slug])}
                          className="cursor-pointer hover:underline"
                          method="delete"
                        >
                          Deleted
                        </Link>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <div className="-mt-1 text-xs leading-tight text-gray-500 md:text-sm dark:text-gray-400">
                <Link href="#" className="hover:underline">
                  u/{username}
                </Link>
              </div>

              <h1 className="mt-2 text-lg font-bold text-gray-900 md:text-xl dark:text-gray-100">{title}</h1>
            </CardHeader>

            <CardContent className="px-4 py-3">
              <div className="prose prose-sm max-w-none">
                <p className="whitespace-pre-line text-gray-800 dark:text-gray-300">{description}</p>
              </div>
              <div className="prose prose-sm max-w-none">
                <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline dark:text-blue-400">
                  {url}
                </a>
              </div>
            </CardContent>

            <CardFooter className="flex items-center gap-2 px-4 pt-0 pb-3">
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
                onClick={auth.user ? undefined : handleCommentClick}
              >
                <MessageSquare className="mr-1.5 h-4 w-4" />
                {comments_count} Comments
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700">
                <Share2 className="mr-1.5 h-4 w-4" />
                Share
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700">
                <Bookmark className="mr-1.5 h-4 w-4" />
                Save
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700">
                <Gift className="mr-1.5 h-4 w-4" />
                Award
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="ml-auto text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900">
                  <DropdownMenuItem className="hover:bg-gray-100 dark:hover:bg-gray-700">Hide post</DropdownMenuItem>
                  <DropdownMenuItem className="hover:bg-gray-100 dark:hover:bg-gray-700">Report</DropdownMenuItem>
                  <DropdownMenuItem className="hover:bg-gray-100 dark:hover:bg-gray-700">Block user</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardFooter>
          </div>
        </div>
      </Card>
      {auth.user && <CommentInput community_slug={community.slug} username={auth.user.username as string} postSlug={slug} />}
      {comments.map((comment, index) => (
        <CommentItem key={index} {...comment} />
      ))}
    </div>
  );
}
