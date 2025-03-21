import { Button } from '@/components/ui/button';
import { Comment } from '@/interfaces';
import { Link } from '@inertiajs/react';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';
import { Gift, MessageSquare, MoreHorizontal, Share2 } from 'lucide-react';
import { useEffect, useState } from 'react';

interface CommentItemProps {
  username: string;
  content: string;
  updated_at: string;
  votes?: number;
  replies?: Comment[];
}

export default function CommentItem({ username, content, updated_at = '2025-03-15 19:23:48', votes = 0, replies = [] }: CommentItemProps) {
  const [commentVotes, setCommentVotes] = useState(votes);
  const [userVote, setUserVote] = useState<'up' | 'down' | null>(null);
  const [relativeTime, setRelativeTime] = useState(
    formatDistanceToNow(new Date(updated_at), { addSuffix: true, locale: es }).replace('en alrededor de ', 'hace '),
  );
  useEffect(() => {
    const interval = setInterval(() => {
      setRelativeTime(formatDistanceToNow(new Date(updated_at), { addSuffix: true, locale: es }).replace('en alrededor de ', 'hace '));
    }, 60000); // Se actualiza cada minuto

    return () => clearInterval(interval); // Limpia el intervalo
  }, [updated_at]);

  return (
    <div className="border-t border-gray-200 px-4 py-3 dark:border-gray-700">
      <div className="flex gap-2">
        <div className="flex-1">
          <div className="mb-1 flex items-center gap-1 text-xs">
            <Link href="#" className="font-medium text-gray-900 hover:underline dark:text-gray-200">
              u/{username}
            </Link>
            <span className="text-gray-500 dark:text-gray-400">{relativeTime}</span>
          </div>

          <p className="mb-2 ml-2 text-sm text-gray-800 dark:text-gray-300">{content}</p>
          <div className="mb-2 flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
            <Button variant="ghost" size="sm" className="h-6 px-2 text-xs text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800">
              <MessageSquare className="mr-1 h-3 w-3" />
              Reply
            </Button>
            <Button variant="ghost" size="sm" className="h-6 px-2 text-xs text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800">
              <Share2 className="mr-1 h-3 w-3" />
              Share
            </Button>
            <Button variant="ghost" size="sm" className="h-6 px-2 text-xs text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800">
              <Gift className="mr-1 h-3 w-3" />
              Award
            </Button>
            <Button variant="ghost" size="sm" className="h-6 px-2 text-xs text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800">
              <MoreHorizontal className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
