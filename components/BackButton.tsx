'use client';
import { useRouter } from 'next/navigation';
import { Button } from "@worldcoin/mini-apps-ui-kit-react";

export type BackButtonProps = {
  className?: string;
};

export const BackButton = ({ className }: BackButtonProps) => {
  const router = useRouter();

  return (
    <Button
      onClick={() => router.back()}
      variant="secondary"
      size="sm"
      className="mb-4 self-start w-fit"
    >
      ← Back
    </Button>
  );
};
