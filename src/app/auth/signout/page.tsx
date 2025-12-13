'use client';

import React, { useEffect } from 'react';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Container, Card } from '@/components/ui';
import Logo from '@/components/ui/Logo';

export default function SignOutPage() {
  const router = useRouter();

  useEffect(() => {
    const handleSignOut = async () => {
      await signOut({ redirect: false });
      setTimeout(() => {
        router.push('/');
      }, 2000);
    };

    handleSignOut();
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <Container size="sm">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-6">
            <Logo size="lg" />
          </div>
        </div>

        <Card variant="elevated" padding="lg">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-teal/10 rounded-full mb-4">
              <svg
                className="w-8 h-8 text-brand-teal animate-spin"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
            </div>

            <h1 className="text-2xl font-bold text-gray-900">
              Signing you out...
            </h1>

            <p className="text-gray-600">
              You've been successfully signed out. Redirecting to homepage...
            </p>
          </div>
        </Card>
      </Container>
    </div>
  );
}
