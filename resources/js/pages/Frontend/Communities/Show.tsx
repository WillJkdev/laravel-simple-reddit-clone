import CommunityList from '@/components/CommunityList';
import PaginationComponent from '@/components/PaginationComponent';
import PostCard from '@/components/PostCard';
import { Button } from '@/components/ui/button';
import { Community, Post, User } from '@/interfaces';
import AppGuestLayout from '@/layouts/app-guest-layout';
import { Head, Link } from '@inertiajs/react';
import { PlusCircle } from 'lucide-react';

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
  community: Community;
  auth: {
    user: User | null;
  };
  posts: PaginatedPost;
  communities: { data: Community[] };
}

export default function Show({ community, auth, posts, communities }: Props) {
  return (
    <AppGuestLayout>
      <Head title={`r/${community.slug}`} />
      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
        <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border p-4 md:min-h-min">
          <div className="mb-6 rounded-lg bg-gray-100 p-6 shadow-sm dark:bg-gray-900">
            <Link href={route('frontend.communities.show', community.slug)} className="text-3xl font-bold hover:underline">
              <span className="block text-3xl font-semibold text-gray-700 dark:text-gray-300">Comunidad de {community.name}</span>
            </Link>

            <p className="mt-2 text-gray-600 dark:text-gray-400">{community.description}</p>

            {auth.user && (
              <Link href={route('communities.posts.create', community.slug)}>
                <Button className="mt-4 flex w-full items-center gap-2 md:w-auto">
                  <PlusCircle className="h-5 w-5" />
                  Crear Post
                </Button>
              </Link>
            )}
          </div>

          {/* Aquí puedes agregar más contenido como posts, botones de acción, etc */}
          <section className="m-2 flex flex-col gap-4 p-2 md:flex-row">
            {/* Contenedor de los posts */}
            <div className="flex flex-col space-y-4 md:w-8/12">
              {posts.data.map((post) => (
                <PostCard key={post.id} {...post} community_slug={community.slug} userVote={post.user_vote} />
              ))}
              <PaginationComponent pagination={posts.meta} />
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
