"use client";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";

interface LeaderboardPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function LeaderboardPagination({
  currentPage,
  totalPages,
  onPageChange,
}: LeaderboardPaginationProps) {
  // Generate page numbers to show
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    let start = Math.max(1, currentPage - 2);
    const end = Math.min(totalPages, start + maxVisiblePages - 1);

    // Adjust start if we're near the end
    if (end === totalPages) {
      start = Math.max(1, end - maxVisiblePages + 1);
    }

    return { start, end };
  };

  const { start, end } = getPageNumbers();
  const showStartEllipsis = start > 1;
  const showEndEllipsis = end < totalPages;

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (currentPage > 1) onPageChange(currentPage - 1);
            }}
            className={cn(
              "bg-[#0D0E19] border-[#04D9FF]/30 text-[#04D9FF]",
              "hover:bg-[#04D9FF]/10 hover:border-[#04D9FF] transition-colors",
              "data-[disabled]:opacity-50 data-[disabled]:pointer-events-none",
              currentPage === 1 && "opacity-50 pointer-events-none"
            )}
          />
        </PaginationItem>

        {showStartEllipsis && (
          <>
            <PaginationItem>
              <PaginationLink
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  onPageChange(1);
                }}
                className={cn(
                  "bg-[#0D0E19] border-[#04D9FF]/30 text-[#04D9FF] hover:bg-[#04D9FF]/10",
                  "hover:border-[#04D9FF] transition-all",
                  currentPage === 1 &&
                    "bg-[#04D9FF] text-[#0D0E19] hover:bg-[#04D9FF]/90"
                )}
              >
                1
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis className="text-[#04D9FF]/50" />
            </PaginationItem>
          </>
        )}

        {Array.from({ length: end - start + 1 }, (_, i) => start + i).map(
          (pageNumber) => (
            <PaginationItem key={pageNumber}>
              <PaginationLink
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  onPageChange(pageNumber);
                }}
                className={cn(
                  "bg-[#0D0E19] border-[#04D9FF]/30 text-[#04D9FF]",
                  "hover:bg-[#04D9FF]/10 hover:border-[#04D9FF]",
                  "transition-all duration-200",
                  currentPage === pageNumber && [
                    "bg-[#04D9FF] text-[#0D0E19] hover:bg-[#04D9FF]/90",
                    "shadow-[0_0_10px_rgba(4,217,255,0.3)]",
                    "scale-110",
                  ]
                )}
                isActive={currentPage === pageNumber}
              >
                {pageNumber}
              </PaginationLink>
            </PaginationItem>
          )
        )}

        {showEndEllipsis && (
          <>
            <PaginationItem>
              <PaginationEllipsis className="text-[#04D9FF]/50" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  onPageChange(totalPages);
                }}
                className={cn(
                  "bg-[#0D0E19] border-[#04D9FF]/30 text-[#04D9FF] hover:bg-[#04D9FF]/10",
                  "hover:border-[#04D9FF] transition-all",
                  currentPage === totalPages &&
                    "bg-[#04D9FF] text-[#0D0E19] hover:bg-[#04D9FF]/90"
                )}
              >
                {totalPages}
              </PaginationLink>
            </PaginationItem>
          </>
        )}

        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (currentPage < totalPages) onPageChange(currentPage + 1);
            }}
            className={cn(
              "bg-[#0D0E19] border-[#04D9FF]/30 text-[#04D9FF]",
              "hover:bg-[#04D9FF]/10 hover:border-[#04D9FF] transition-colors",
              "data-[disabled]:opacity-50 data-[disabled]:pointer-events-none",
              currentPage === totalPages && "opacity-50 pointer-events-none"
            )}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
