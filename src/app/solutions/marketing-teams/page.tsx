import React from 'react';
import Link from 'next/link';
import { Container, Button, Card } from '@/components/ui';

export default function MarketingTeamsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <Container>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block bg-gradient-to-r from-brand-teal to-brand-blue text-white px-4 py-2 rounded-full mb-6 text-sm font-semibold">
              Solutions
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              SMS Marketing for Marketing Teams
            </h1>
            <p className="text-xl text-gray-600">
              Scale your marketing campaigns with intelligent SMS automation
            </p>
          </div>

          <Card variant="elevated" padding="lg" className="mb-8">
            <div className="prose max-w-none">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Coming Soon
              </h2>
              <p className="text-gray-600 mb-6">
                Marketing-specific features launching soon. Create multi-channel campaigns
                with SMS as your secret weapon for higher engagement.
              </p>

              <div className="bg-gradient-to-r from-brand-teal/10 to-brand-blue/10 border-2 border-brand-teal/30 rounded-lg p-6 mb-6">
                <h3 className="font-bold text-brand-blue mb-3">What to Expect:</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>✓ Advanced segmentation tools</li>
                  <li>✓ A/B testing and analytics</li>
                  <li>✓ Multi-channel campaign coordination</li>
                  <li>✓ Marketing automation workflows</li>
                  <li>✓ Attribution and ROI tracking</li>
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/auth/signup" className="flex-1">
                  <Button variant="primary" size="lg" fullWidth>
                    Start Free Trial
                  </Button>
                </Link>
                <Link href="/contact" className="flex-1">
                  <Button variant="outline" size="lg" fullWidth>
                    Schedule Demo
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
