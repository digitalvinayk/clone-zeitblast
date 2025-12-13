import React from 'react';
import Link from 'next/link';
import { Container, Button, Card } from '@/components/ui';

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <Container>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block bg-gradient-to-r from-brand-teal to-brand-blue text-white px-4 py-2 rounded-full mb-6 text-sm font-semibold">
              Company
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Join Our Team
            </h1>
            <p className="text-xl text-gray-600">
              Help us build the future of intelligent SMS marketing
            </p>
          </div>

          <Card variant="elevated" padding="lg" className="mb-8">
            <div className="text-center space-y-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-teal/10 rounded-full mb-4">
                <svg className="w-8 h-8 text-brand-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>

              <h2 className="text-2xl font-bold text-gray-900">
                No Open Positions Right Now
              </h2>

              <p className="text-gray-600">
                We're currently focused on building an amazing product. Check back soon
                for opportunities to join our growing team.
              </p>

              <div className="bg-gradient-to-r from-brand-teal/10 to-brand-blue/10 border-2 border-brand-teal/30 rounded-lg p-6">
                <h3 className="font-bold text-brand-blue mb-3">Why Join Intello Blast?</h3>
                <ul className="space-y-2 text-gray-700 text-left">
                  <li>✓ Work on cutting-edge technology</li>
                  <li>✓ Collaborative remote-first culture</li>
                  <li>✓ Competitive compensation and benefits</li>
                  <li>✓ Opportunity to make an impact</li>
                  <li>✓ Growth and learning opportunities</li>
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Link href="/contact">
                  <Button variant="primary" size="lg">
                    Get in Touch
                  </Button>
                </Link>
              </div>
            </div>
          </Card>

          <div className="text-center">
            <Link href="/about" className="text-brand-teal hover:text-brand-blue font-semibold">
              ← Learn About Us
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
