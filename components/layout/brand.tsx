import Link from "next/link";

const BrandMark = ({ compact = false }: { compact?: boolean }) => {
  return (
    <Link href="/" className="flex items-center gap-2">
      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/15 text-lg font-black text-primary">
        M
      </span>
      <span className="flex flex-col leading-none">
        <span className="text-lg font-bold tracking-tight text-foreground">
          Mira Haat
        </span>
        {!compact && (
          <span className="mt-1 text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
            Online Shop
          </span>
        )}
      </span>
    </Link>
  );
};

export default BrandMark;
