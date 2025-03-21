import { usePage } from '@inertiajs/react';
import { useEffect } from 'react';
import { toast } from 'sonner';

export default function FlashMessages() {
  // Obtener `flash.message`, asegurando que `flash` existe
  const { flash } = usePage().props as { flash?: { message?: string } };

  useEffect(() => {
    if (flash?.message) {
      toast(flash.message);
    }
  }, [flash]);

  return null; // No renderiza nada, solo ejecuta los toasts
}
