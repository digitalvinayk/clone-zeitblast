import React from 'react';
import Link from 'next/link';
import { Container, Button, Card } from '@/components/ui';

export default function CustomerStoriesPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <Container>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block bg-gradient-to-r from-brand-teal to-brand-blue text-white px-4 py-2 rounded-full mb-6 text-sm font-semibold">
              Resources
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Customer Success Stories
            </h1>
            <p className="text-xl text-gray-600">
              See how businesses are growing with Intello Blast
            </p>
          </div>

          <Card variant="elevated" padding="lg" className="mb-8">
            <div className="text-center space-y-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-teal/10 rounded-full mb-4">
                <svg className="w-8 h-8 text-brand-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>

              <h2 className="text-2xl font-bold text-gray-900">
                Coming Soon
              </h2>

              <p className="text-gray-600">
                We're collecting inspiring stories from our customers. Check back soon to see
                how real businesses are achieving remarkable results with Intello Blast.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Link href="/auth/signup">
                  <Button variant="primary" size="lg">
                    Start Your Success Story
                  </Button>
                </Link>
              </div>
            </div>
          </Card>

          <div className="text-center">
            <Link href="/" className="text-brand-teal hover:text-brand-blue font-semibold">
              ← Back to Home
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
