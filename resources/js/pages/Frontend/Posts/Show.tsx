import PostList from '@/components/PostList';
import RedditPostDetail from '@/components/RedditPostDetail';
import { Button } from '@/components/ui/button';
import { Community, Post, User } from '@/interfaces';
import AppGuestLayout from '@/layouts/app-guest-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { PlusCircle } from 'lucide-react';

interface PaginatedPost {
  id: string;
  title: string;
  slug: string;
  votes: number;
  icon?: string;
  color?: string;
  isPopular?: boolean;
}
interface PostsList {
  id: string;
  title: string;
  slug: string;
  votes: number;
  icon?: string;
  color?: string;
  isPopular?: boolean;
}

interface Props {
  community: Community;
  auth: {
    user: User | null;
  };
  post: { data: Post };
  posts: { data: PostsList[] };
  can_update: boolean;
  can_delete: boolean;
}

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Inicio',
    href: '/',
  },
  {
    title: 'Communities',
    href: '/communities',
  },
];

export default function Show({ community, auth, post, posts, can_update, can_delete }: Props) {
  return (
    <>
      <AppGuestLayout breadcrumbs={breadcrumbs}>
        <Head title={`r/${community.slug}`} />
        <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
          <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border p-4 md:min-h-min">
            <div className="mb-6">
              <Link href={route('frontend.communities.show', community.slug)} className="text-3xl font-bold hover:underline">
                r/{community.name}
              </Link>
              <span className="mb-2 block text-sm font-medium">{community.name}</span>
              <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">{community.description}</p>
              {auth.user && (
                <Link href={route('communities.posts.create', community.slug)}>
                  <Button className="flex items-center gap-2">
                    <PlusCircle className="h-5 w-5" />
                    Crear Post
                  </Button>
                </Link>
              )}
            </div>

            {/* Aquí puedes agregar más contenido como posts, botones de acción, etc */}
            <section className="m-2 flex flex-col gap-4 p-2 md:flex-row">
              {/* Contenedor de los posts */}
              <RedditPostDetail {...post.data} community={community} can_update={can_update} can_delete={can_delete} />

              {/* Contenedor del contenido adicional */}
              <div className="md:w-4/12">
                <PostList posts={posts.data} community_slug={community.slug} />
              </div>
            </section>
          </div>
        </div>
      </AppGuestLayout>
    </>
  );
}
