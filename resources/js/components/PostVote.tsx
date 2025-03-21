import { Button } from '@/components/ui/button';
import { useForm } from '@inertiajs/react';
import { ArrowBigDown, ArrowBigUp } from 'lucide-react';
import { useEffect, useState } from 'react';

interface PostVoteProps {
  votes?: number;
  slug: string;
  user_vote?: 'up' | 'down' | null;
}

export default function PostVote({ votes = 0, slug, user_vote = null }: PostVoteProps) {
  const [voteCount, setVoteCount] = useState(votes);
  const [userVote, setUserVote] = useState<'up' | 'down' | null>(user_vote);
  const [isLoading, setIsLoading] = useState(false); // Evita clics múltiples
  const { post } = useForm();
  // Sincronizar el estado local con el valor recibido del backend
  useEffect(() => {
    setUserVote(user_vote);
  }, [user_vote]);
  const handleVote = (type: 'up' | 'down') => {
    if (isLoading) return;
    setIsLoading(true);

    const isUpvote = type === 'up';
    const isDownvote = type === 'down';

    let voteChange = 0;

    if (userVote === type) {
      // Si el usuario hace clic en el mismo voto, se elimina (resta 1)
      voteChange = isUpvote ? -1 : 1;
    } else if (userVote === null) {
      // Si no hay voto previo, suma 1
      voteChange = isUpvote ? 1 : -1;
    } else {
      // Si cambia de upvote a downvote o viceversa, cambia 2
      voteChange = isUpvote ? 2 : -2;
    }

    post(route(`posts.${type}vote`, { post: slug }), {
      preserveScroll: true,
      onSuccess: () => {
        setVoteCount((prev) => prev + voteChange);
        setUserVote(userVote === type ? null : type); // Alternar voto
      },
      onFinish: () => setIsLoading(false),
    });
  };

  return (
    <div className="flex flex-col items-center rounded-md bg-gray-50 px-2 py-4 dark:bg-gray-800">
      <Button
        variant="ghost"
        size="icon"
        disabled={isLoading}
        className={`h-8 w-8 transition-colors ${
          userVote === 'up'
            ? 'text-orange-500 dark:text-orange-400'
            : 'text-gray-500 hover:text-orange-500 dark:text-gray-400 dark:hover:text-orange-400'
        }`}
        onClick={() => handleVote('up')}
      >
        <ArrowBigUp className="h-6 w-6" />
      </Button>

      <span className="my-1 text-sm font-medium text-gray-900 dark:text-gray-100">{voteCount}</span>

      <Button
        variant="ghost"
        size="icon"
        disabled={isLoading}
        className={`h-8 w-8 transition-colors ${
          userVote === 'down' ? 'text-blue-500 dark:text-blue-400' : 'text-gray-500 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400'
        }`}
        onClick={() => handleVote('down')}
      >
        <ArrowBigDown className="h-6 w-6" />
      </Button>
    </div>
  );
}
