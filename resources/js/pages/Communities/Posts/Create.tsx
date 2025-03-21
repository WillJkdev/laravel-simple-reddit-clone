import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
  },
  {
    title: 'Posts',
    href: '/posts',
  },
  {
    title: 'Create',
    href: '/posts/create',
  },
];

type PostForm = {
  title: string;
  description: string;
  url: string;
};

type Props = {
  community: {
    name: string;
    slug: string;
  };
};

export default function Create({ community }: Props) {
  const { data, setData, post, processing, errors, reset } = useForm<PostForm>({
    title: '',
    description: '',
    url: '',
  });
  const submit: FormEventHandler = (e) => {
    e.preventDefault();
    post(route('communities.posts.store', community.slug), {
      preserveScroll: true,
      onSuccess: () => reset(),
    });
  };
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Crear Post" />
      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
        <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
          <h1 className="text-3xl font-bold">Crear Post para la comunidad de {community.name}</h1>
          <form className="mx-auto my-10 flex max-w-2xl flex-col gap-6" onSubmit={submit}>
            <div className="grid gap-6">
              {/* Título */}
              <div className="grid gap-2">
                <Label htmlFor="title">Título</Label>
                <Input
                  id="title"
                  type="text"
                  required
                  autoFocus
                  value={data.title}
                  onChange={(e) => setData('title', e.target.value)}
                  disabled={processing}
                  placeholder="Escribe el título del post"
                />
                <InputError message={errors.title} className="mt-2" />
              </div>

              {/* Descripción */}
              <div className="grid gap-2">
                <Label htmlFor="description">Descripción</Label>
                <textarea
                  id="description"
                  required
                  value={data.description}
                  onChange={(e) => setData('description', e.target.value)}
                  disabled={processing}
                  placeholder="Describe el contenido del post..."
                  className="border-input bg-background ring-offset-background focus-visible:ring-ring flex min-h-[120px] w-full rounded-md border px-3 py-2 text-sm shadow-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
                />
                <InputError message={errors.description} />
              </div>

              {/* URL */}
              <div className="grid gap-2">
                <Label htmlFor="url">URL (opcional)</Label>
                <Input
                  id="url"
                  type="url"
                  value={data.url}
                  onChange={(e) => setData('url', e.target.value)}
                  disabled={processing}
                  placeholder="https://ejemplo.com"
                />
                <InputError message={errors.url} />
              </div>

              {/* Botón de enviar */}
              <Button type="submit" className="mt-2 w-full" disabled={processing}>
                {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                Publicar Post
              </Button>
            </div>
          </form>
        </div>
      </div>
    </AppLayout>
  );
}
