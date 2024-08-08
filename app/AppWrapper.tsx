import Footer from '@/components/layout/footer';
import Navbar from '@/components/layout/navbar';
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

const AppWrapper = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <main>
      <Navbar />
      <div className={cn(className)}>{children}</div>
      <Footer />
    </main>
  );
};

export default AppWrapper;
