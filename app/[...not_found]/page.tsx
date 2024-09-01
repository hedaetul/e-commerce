"use client";

import { Button } from "@/components/ui/button";
import notFound from "@/public/notFound.webp";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Custom404 = () => {
  const router = useRouter();

  return (
    <div>
      <div className="flex-col-center h-screen w-screen">
        <Image src={notFound} alt="404 Page not found" />
        <div className="flex gap-4">
          <Button onClick={() => router.back()} variant="outline">
            Go back
          </Button>
          <Link href="/">
            <Button>Back to home</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Custom404;
