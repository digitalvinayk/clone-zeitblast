import React from 'react';
import Link from 'next/link';
import { Container, Button, Card } from '@/components/ui';

export default function DoneForYouPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <Container>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block bg-gradient-to-r from-brand-teal to-brand-blue text-white px-4 py-2 rounded-full mb-6 text-sm font-semibold">
              Solutions
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Done-for-You Lead Generation
            </h1>
            <p className="text-xl text-gray-600">
              Let our experts handle your SMS marketing campaigns from start to finish
            </p>
          </div>

          <Card variant="elevated" padding="lg" className="mb-8">
            <div className="prose max-w-none">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Coming Soon
              </h2>
              <p className="text-gray-600 mb-6">
                Our done-for-you service is launching soon. Get a dedicated team managing
                your entire SMS lead generation strategy.
              </p>

              <div className="bg-gradient-to-r from-brand-teal/10 to-brand-blue/10 border-2 border-brand-teal/30 rounded-lg p-6 mb-6">
                <h3 className="font-bold text-brand-blue mb-3">What's Included:</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>✓ Campaign strategy and planning</li>
                  <li>✓ Professional copywriting</li>
                  <li>✓ List management and segmentation</li>
                  <li>✓ A/B testing and optimization</li>
                  <li>✓ Monthly performance reports</li>
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/contact" className="flex-1">
                  <Button variant="primary" size="lg" fullWidth>
                    Schedule Consultation
                  </Button>
                </Link>
                <Link href="/auth/signup" className="flex-1">
                  <Button variant="outline" size="lg" fullWidth>
                    Start DIY Trial
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
