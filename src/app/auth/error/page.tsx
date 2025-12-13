'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Container, Button, Card } from '@/components/ui';
import Logo from '@/components/ui/Logo';

function AuthErrorContent() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  const errorMessages: Record<string, { title: string; description: string }> = {
    Configuration: {
      title: 'Configuration Error',
      description: 'There is a problem with the server configuration. Please contact support.',
    },
    AccessDenied: {
      title: 'Access Denied',
      description: 'You do not have permission to sign in.',
    },
    Verification: {
      title: 'Verification Error',
      description: 'The verification token has expired or has already been used.',
    },
    Default: {
      title: 'Authentication Error',
      description: 'An error occurred during authentication. Please try again.',
    },
  };

  const errorInfo = errorMessages[error || 'Default'] || errorMessages.Default;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <Container size="sm">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-6">
            <Logo size="lg" />
          </div>
          <div className="mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
              <svg
                className="w-8 h-8 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {errorInfo.title}
            </h1>
            <p className="text-gray-600">{errorInfo.description}</p>
          </div>
        </div>

        <Card variant="elevated" padding="lg">
          <div className="space-y-4">
            <Link href="/auth/signin" className="block">
              <Button variant="primary" size="lg" fullWidth>
                Back to Sign In
              </Button>
            </Link>

            <Link href="/" className="block">
              <Button variant="outline" size="lg" fullWidth>
                Go to Homepage
              </Button>
            </Link>

            <div className="text-center pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-600 mb-2">
                Need help? Contact our support team
              </p>
              <Link
                href="/contact"
                className="text-brand-teal hover:text-brand-blue font-semibold transition-colors text-sm"
              >
                Contact Support →
              </Link>
            </div>
          </div>
        </Card>

        {error && (
          <div className="mt-6 p-4 bg-gray-100 rounded-lg">
            <p className="text-xs text-gray-500 text-center font-mono">
              Error Code: {error}
            </p>
          </div>
        )}
      </Container>
    </div>
  );
}

export default function AuthErrorPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
        <Container size="sm">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <Logo size="lg" />
            </div>
            <p className="text-gray-600">Loading...</p>
          </div>
        </Container>
      </div>
    }>
      <AuthErrorContent />
    </Suspense>
  );
}
