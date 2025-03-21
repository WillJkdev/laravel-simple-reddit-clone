import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';

interface PaginationProps {
  current_page: number;
  last_page: number;
  next_page_url: string | null; // Para saber si hay página siguiente
  prev_page_url: string | null; // Para saber si hay página anterior
  links: { url: string | null; label: string; active: boolean }[];
}

export default function PaginationComponent({ pagination }: { pagination: PaginationProps }) {
  return (
    <div className="flex items-center justify-between space-x-2 py-4">
      <div className="text-muted-foreground text-sm whitespace-nowrap">
        Página {pagination.current_page} de {pagination.last_page}
      </div>
      <Pagination>
        <PaginationContent>
          {/* Botón Anterior */}
          {pagination.current_page > 1 ? (
            <PaginationItem>
              <PaginationPrevious href={`?page=${pagination.current_page - 1}`} />
            </PaginationItem>
          ) : (
            <PaginationItem>
              <PaginationPrevious className="pointer-events-none opacity-50" />
            </PaginationItem>
          )}

          {/* Números de página */}
          {pagination.links
            .filter((link) => !isNaN(Number(link.label))) // Filtra solo números, evita «Previous» y «Next»
            .map((link, index) => (
              <PaginationItem key={index}>
                <PaginationLink href={link.url || '#'} isActive={link.active} className={link.active ? 'bg-white font-bold text-black' : ''}>
                  {link.label}
                </PaginationLink>
              </PaginationItem>
            ))}

          {/* Botón Siguiente */}
          {pagination.current_page < pagination.last_page ? (
            <PaginationItem>
              <PaginationNext href={`?page=${pagination.current_page + 1}`} />
            </PaginationItem>
          ) : (
            <PaginationItem>
              <PaginationNext className="pointer-events-none opacity-50" />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    </div>
  );
}
