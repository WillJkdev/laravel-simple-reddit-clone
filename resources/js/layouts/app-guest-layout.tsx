import FlashMessages from '@/components/flash-messages';
import AppLayoutTemplate from '@/layouts/app/app-header-layout';
import { type BreadcrumbItem } from '@/types';
import { type ReactNode } from 'react';
import { Toaster } from 'sonner';

interface AppLayoutProps {
  children: ReactNode;
  breadcrumbs?: BreadcrumbItem[];
}

export default ({ children, breadcrumbs, ...props }: AppLayoutProps) => (
  <>
    <Toaster richColors position="bottom-right" />
    <FlashMessages />
    <AppLayoutTemplate breadcrumbs={breadcrumbs} {...props}>
      {children}
    </AppLayoutTemplate>
  </>
);
