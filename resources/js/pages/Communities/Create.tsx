import AppGuestLayout from '@/layouts/app-guest-layout';

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
    title: 'Inicio',
    href: '/',
  },
  {
    title: 'Communities',
    href: '/communities',
  },
  {
    title: 'Create',
    href: '/communities/create',
  },
];

type RegisterForm = {
  name: string;
  description: string;
  // slug: string;
};

export default function Create() {
  const { data, setData, post, processing, errors, reset } = useForm<Required<RegisterForm>>({
    name: '',
    description: '',
    // slug: '',
  });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();
    post(route('communities.store'), {
      preserveScroll: true,
      onSuccess: () => reset(),
    });
  };
  return (
    <AppGuestLayout breadcrumbs={breadcrumbs}>
      <Head title="Create Community" />
      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
        <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
          <form className="mx-auto my-10 flex max-w-2xl flex-col gap-6" onSubmit={submit}>
            <div className="grid gap-6">
              <div className="grid gap-2">
                <Label htmlFor="name">Nombre</Label>
                <Input
                  id="name"
                  type="text"
                  required
                  autoFocus
                  tabIndex={1}
                  autoComplete="name"
                  value={data.name}
                  onChange={(e) => setData('name', e.target.value)}
                  disabled={processing}
                  placeholder="Full name"
                />
                <InputError message={errors.name} className="mt-2" />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="description">Descripcion</Label>
                <Input
                  id="description"
                  type="text"
                  required
                  tabIndex={2}
                  autoComplete="description"
                  value={data.description}
                  onChange={(e) => setData('description', e.target.value)}
                  disabled={processing}
                  placeholder="description"
                />
                <InputError message={errors.description} />
              </div>

              <Button type="submit" className="mt-2 w-full" tabIndex={3} disabled={processing}>
                {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                Registrar Comunidad
              </Button>
            </div>
          </form>
        </div>
      </div>
    </AppGuestLayout>
  );
}
