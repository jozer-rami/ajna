'use client';
import { useRouter } from 'next/navigation';
import { Button } from "@worldcoin/mini-apps-ui-kit-react";

export const BackButton = () => {
  const router = useRouter();
  
  return (
    <Button 
      onClick={() => router.back()}
      variant="secondary" 
      size="sm"
      className="mb-4"
    >
      ← Back
    </Button>
  );
}; 