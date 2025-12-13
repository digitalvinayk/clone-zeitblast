import React from 'react';
import Link from 'next/link';
import { Container, Button, Card } from '@/components/ui';

export default function PressPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <Container>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block bg-gradient-to-r from-brand-teal to-brand-blue text-white px-4 py-2 rounded-full mb-6 text-sm font-semibold">
              Company
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Press Room
            </h1>
            <p className="text-xl text-gray-600">
              Latest news and media resources
            </p>
          </div>

          <Card variant="elevated" padding="lg" className="mb-8">
            <div className="text-center space-y-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-teal/10 rounded-full mb-4">
                <svg className="w-8 h-8 text-brand-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
              </div>

              <h2 className="text-2xl font-bold text-gray-900">
                Media Inquiries
              </h2>

              <p className="text-gray-600 mb-6">
                For press inquiries, interviews, or media kits, please reach out to our team.
              </p>

              <div className="bg-gradient-to-r from-brand-teal/10 to-brand-blue/10 border-2 border-brand-teal/30 rounded-lg p-6">
                <h3 className="font-bold text-brand-blue mb-3">Quick Facts:</h3>
                <ul className="space-y-2 text-gray-700 text-left">
                  <li><strong>Founded:</strong> 2024</li>
                  <li><strong>Focus:</strong> Intelligent SMS Marketing Platform</li>
                  <li><strong>Mission:</strong> Empower businesses to grow through smart communication</li>
                  <li><strong>Target Market:</strong> Real estate, sales teams, and growing businesses</li>
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Link href="/contact">
                  <Button variant="primary" size="lg">
                    Contact Media Team
                  </Button>
                </Link>
              </div>
            </div>
          </Card>

          <div className="text-center">
            <Link href="/about" className="text-brand-teal hover:text-brand-blue font-semibold">
              ← About Intello Blast
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
