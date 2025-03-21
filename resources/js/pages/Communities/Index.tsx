import PaginationComponent from '@/components/PaginationComponent';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Community } from '@/interfaces';
import AppGuestLayout from '@/layouts/app-guest-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { Pencil, Trash2 } from 'lucide-react';

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

interface PaginatedCommunities {
  current_page: number;
  last_page: number;
  next_page_url: string | null;
  prev_page_url: string | null;
  links: { url: string | null; label: string; active: boolean }[];
  data: Community[];
}

export default function Index({ communities }: { communities: PaginatedCommunities }) {
  const { delete: destroy } = useForm();
  const handleDelete = (slug: string) => {
    if (confirm('¿Estás seguro de eliminar esta comunidad?')) {
      destroy(route('communities.destroy', slug), {
        preserveScroll: true,
      });
    }
  };
  return (
    <AppGuestLayout breadcrumbs={breadcrumbs}>
      <Head title="Communities" />

      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
        <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border p-4 md:min-h-min">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold">Communities</h2>
            <Link href={route('communities.create')}>
              <Button className="cursor-pointer">Crear Comunidad</Button>
            </Link>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {communities.data.map((community) => (
                <TableRow key={community.id}>
                  <TableCell>
                    <Link className="hover:text-blue-500 hover:underline" href={route('frontend.communities.show', community.slug)}>
                      {community.name}
                    </Link>
                  </TableCell>
                  <TableCell>{community.slug}</TableCell>
                  <TableCell className="text-right">
                    <Link href={route('communities.edit', community.slug)}>
                      <Button variant="ghost" size="icon" className="cursor-pointer">
                        <Pencil className="h-4 w-4 text-blue-500" />
                      </Button>
                    </Link>
                    <Button variant="ghost" size="icon" className="cursor-pointer" onClick={() => handleDelete(community.slug)}>
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {/* Paginación */}

          <PaginationComponent pagination={communities} />
        </div>
      </div>
    </AppGuestLayout>
  );
}
