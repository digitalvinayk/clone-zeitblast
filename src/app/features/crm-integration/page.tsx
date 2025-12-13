import React from 'react';
import Link from 'next/link';
import { Container, Button, Card } from '@/components/ui';

export default function CRMIntegrationPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <Container>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block bg-gradient-to-r from-brand-teal to-brand-blue text-white px-4 py-2 rounded-full mb-6 text-sm font-semibold">
              Features
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              CRM Integration
            </h1>
            <p className="text-xl text-gray-600">
              Seamlessly connect with your existing CRM and tools
            </p>
          </div>

          <Card variant="elevated" padding="lg" className="mb-8">
            <div className="prose max-w-none">
              <p className="text-gray-600 mb-6">
                Sync contacts, track conversations, and automate workflows between
                Intello Blast and your favorite CRM platforms.
              </p>

              <div className="bg-gradient-to-r from-brand-teal/10 to-brand-blue/10 border-2 border-brand-teal/30 rounded-lg p-6 mb-6">
                <h3 className="font-bold text-brand-blue mb-3">Supported Integrations:</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>✓ Salesforce integration</li>
                  <li>✓ HubSpot connectivity</li>
                  <li>✓ Zapier automation</li>
                  <li>✓ REI BlackBook sync</li>
                  <li>✓ Custom API access</li>
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
                    View Integrations
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
