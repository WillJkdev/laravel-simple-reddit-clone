import { useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';

type CommentInputProps = {
  community_slug: string;
  username?: string;
  postSlug: string;
};

type RegisterCommentForm = {
  content: string;
};

export default function CommentInput({ community_slug, username = '', postSlug }: CommentInputProps) {
  const { data, setData, post, processing, errors, reset } = useForm<RegisterCommentForm>({
    content: '',
  });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();
    post(route('frontend.posts.comments', { community_slug, post: postSlug }), {
      preserveScroll: true,
      onSuccess: () => reset(),
    });
  };

  return (
    <div className="mt-4 rounded-md border border-gray-200 bg-white px-4 py-3 dark:border-gray-700 dark:bg-gray-900">
      {/* Avatar y usuario */}
      <div className="mb-3 flex items-center gap-2">
        <Avatar className="h-8 w-8">
          <AvatarImage src="" alt="User avatar" />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
        <span className="text-sm text-gray-500 dark:text-gray-300">
          Comment as <span className="text-blue-500 dark:text-blue-400">u/{username}</span>
        </span>
      </div>

      {/* Formulario */}
      <form onSubmit={submit}>
        <Textarea
          placeholder="What are your thoughts?"
          className="mb-3 min-h-24 border-gray-300 bg-gray-100 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:placeholder-gray-400 dark:focus:border-blue-400 dark:focus:ring-blue-400"
          value={data.content}
          onChange={(e) => setData('content', e.target.value)}
          disabled={processing}
          aria-label="Write a comment"
        />
        {errors.content && <p className="text-sm text-red-500">{errors.content}</p>}

        {/* Botón de enviar */}
        <div className="flex justify-end">
          <Button
            type="submit"
            variant="default"
            size="sm"
            className="bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
            disabled={!data.content.trim() || processing}
          >
            {processing ? 'Submitting...' : 'Comment'}
          </Button>
        </div>
      </form>
    </div>
  );
}
