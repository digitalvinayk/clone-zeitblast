import React from 'react';
import Link from 'next/link';
import { Container, Button, Card } from '@/components/ui';

export default function DripCampaignsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <Container>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block bg-gradient-to-r from-brand-teal to-brand-blue text-white px-4 py-2 rounded-full mb-6 text-sm font-semibold">
              Features
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Automated Drip Campaigns
            </h1>
            <p className="text-xl text-gray-600">
              Nurture leads automatically with intelligent, timed SMS sequences
            </p>
          </div>

          <Card variant="elevated" padding="lg" className="mb-8">
            <div className="prose max-w-none">
              <p className="text-gray-600 mb-6">
                Set up once and let our automation handle the rest. Create sophisticated
                drip campaigns that respond to customer actions and behaviors.
              </p>

              <div className="bg-gradient-to-r from-brand-teal/10 to-brand-blue/10 border-2 border-brand-teal/30 rounded-lg p-6 mb-6">
                <h3 className="font-bold text-brand-blue mb-3">Key Features:</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>✓ Visual campaign builder</li>
                  <li>✓ Time-based and trigger-based sequences</li>
                  <li>✓ Personalization with merge tags</li>
                  <li>✓ A/B testing capabilities</li>
                  <li>✓ Performance analytics</li>
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
                    See Demo
                  </Button>
                </Link>
              </div>
            </div>
          </Card>

          <div className="text-center">
            <Link href="/features" className="text-brand-teal hover:text-brand-blue font-semibold">
              ← Back to Features
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
