import CommunityList from '@/components/CommunityList';
import PostCard from '@/components/PostCard';
import { Community, Post } from '@/interfaces';
import AppGuestLayout from '@/layouts/app-guest-layout';
import { Head } from '@inertiajs/react';
import { Flame } from 'lucide-react';

interface PaginatedPost {
  data: Post[];
  links: { first: string | null; last: string | null }[];
  meta: {
    current_page: number;
    last_page: number;
    next_page_url: string | null;
    prev_page_url: string | null;
    links: { url: string | null; label: string; active: boolean }[];
  };
}

interface Props {
  communities: { data: Community[] };
  posts: PaginatedPost;
}

export default function Welcome({ posts, communities }: Props) {
  return (
    <AppGuestLayout>
      <Head title={'Welcome'} />
      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
        <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border p-4 md:min-h-min">
          <div className="flex items-center space-x-3 pl-5">
            <h1 className="text-primary text-4xl font-extrabold tracking-tight md:text-4xl">Popular Posts</h1>
            <Flame className="h-8 w-8 text-red-500" />
          </div>
          <section className="m-2 flex flex-col gap-4 p-2 md:flex-row">
            {/* Contenedor de los posts */}
            <div className="flex flex-col space-y-4 md:w-8/12">
              {posts.data.map((post) => (
                <PostCard key={post.id} {...post} community_slug={post.community_slug} userVote={post.user_vote} />
              ))}
            </div>

            {/* Contenedor del contenido adicional */}
            <div className="md:w-4/12">
              <CommunityList communities={communities.data} />
            </div>
          </section>
        </div>
      </div>
    </AppGuestLayout>
  );
}
