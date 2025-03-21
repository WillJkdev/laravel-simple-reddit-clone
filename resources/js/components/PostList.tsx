import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Link } from '@inertiajs/react';
import { ChevronRight, Search, TrendingUp } from 'lucide-react';
import { useState } from 'react';

interface PostsList {
  id: string;
  title: string;
  slug: string;
  votes: number;
  icon?: string;
  color?: string;
  isPopular?: boolean;
}

interface CommunitiesSidebarProps {
  posts: PostsList[];
  title?: string;
  community_slug?: string;
}

export default function CommunitiesSidebar({ posts = [], title = 'Popular Posts', community_slug = '' }: CommunitiesSidebarProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCommunities = searchQuery ? posts.filter((post) => post.title.toLowerCase().includes(searchQuery.toLowerCase())) : posts;

  return (
    <Card className="w-full max-w-xs border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center text-base font-medium text-gray-900 dark:text-gray-100">
          <TrendingUp className="mr-2 h-4 w-4 text-orange-500" />
          {title}
        </CardTitle>
        <div className="relative mt-2">
          <Search className="absolute top-2.5 left-2 h-4 w-4 text-gray-400 dark:text-gray-500" />
          <Input
            placeholder="Search communities"
            className="h-9 bg-gray-100 pl-8 text-sm text-gray-900 placeholder-gray-500 dark:bg-gray-800 dark:text-gray-200 dark:placeholder-gray-400"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </CardHeader>
      <CardContent className="px-3 pb-3">
        {filteredCommunities.length === 0 ? (
          <div className="py-6 text-center text-sm text-gray-500 dark:text-gray-400">No communities found</div>
        ) : (
          <ul className="space-y-1">
            {filteredCommunities.map((post) => (
              <li key={post.id}>
                <Link
                  href={route('frontend.communities.posts.show', { community_slug, post: post.slug })}
                  className="flex items-center rounded-md px-2 py-2 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <Avatar className="mr-3 h-8 w-8">
                    {post.icon ? (
                      <AvatarImage src={post.icon} alt={post.title} />
                    ) : (
                      <AvatarFallback className={`bg-${post.color || 'blue'}-500 text-white`}>
                        {post.title.replace(/^r\//, '').substring(0, 2)}
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center">
                      <span className="truncate text-sm font-medium text-gray-900 dark:text-gray-100">r/{post.title}</span>
                      {post.isPopular && (
                        <Badge
                          variant="outline"
                          className="ml-2 h-5 border-orange-200 bg-orange-50 px-1.5 text-[10px] text-orange-600 dark:border-orange-400 dark:bg-orange-900 dark:text-orange-300"
                        >
                          Popular
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="ml-2 flex items-center">
                    <span className="mr-1 text-xs font-medium text-gray-500 dark:text-gray-400">{post.votes}</span>
                    <ChevronRight className="h-4 w-4 text-gray-400 dark:text-gray-500" />
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}

        <Separator className="my-3 dark:bg-gray-700" />

        <div className="flex items-center justify-between">
          <Link href={route('communities.index')}>
            <Button variant="link" className="h-auto p-0 text-xs text-blue-600 dark:text-blue-400">
              View All Communities
            </Button>
          </Link>
          <Link href={route('communities.create')}>
            <Button
              variant="outline"
              size="sm"
              className="h-8 cursor-pointer border-gray-300 text-xs text-gray-800 dark:border-gray-600 dark:text-gray-200"
            >
              Create Community
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
