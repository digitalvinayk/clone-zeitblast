import React from 'react';
import Link from 'next/link';
import { Container, Card } from '@/components/ui';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <Container>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Terms of Service
            </h1>
            <p className="text-gray-600">
              Last updated: December 13, 2025
            </p>
          </div>

          <Card variant="elevated" padding="lg" className="mb-8">
            <div className="prose max-w-none">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-700 mb-6">
                By accessing and using Intello Blast ("the Service"), you accept and agree to be bound
                by the terms and provision of this agreement.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Use License</h2>
              <p className="text-gray-700 mb-6">
                Permission is granted to use the Service for commercial purposes in accordance with
                these Terms of Service and applicable laws including TCPA compliance.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. SMS Marketing Compliance</h2>
              <p className="text-gray-700 mb-4">
                You agree to:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-6 space-y-2">
                <li>Obtain proper consent before sending SMS messages to recipients</li>
                <li>Comply with TCPA (Telephone Consumer Protection Act) regulations</li>
                <li>Honor opt-out requests immediately</li>
                <li>Maintain proper records of consent</li>
                <li>Follow carrier guidelines and best practices</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Account Responsibilities</h2>
              <p className="text-gray-700 mb-6">
                You are responsible for maintaining the confidentiality of your account credentials
                and for all activities that occur under your account.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Prohibited Uses</h2>
              <p className="text-gray-700 mb-4">
                You may not use the Service:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-6 space-y-2">
                <li>For any unlawful purpose</li>
                <li>To send spam or unsolicited messages</li>
                <li>To harass, abuse, or harm others</li>
                <li>To violate any applicable laws or regulations</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Service Modifications</h2>
              <p className="text-gray-700 mb-6">
                Intello Blast reserves the right to modify or discontinue the Service at any time
                without notice.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Limitation of Liability</h2>
              <p className="text-gray-700 mb-6">
                Intello Blast shall not be liable for any indirect, incidental, special, consequential
                or punitive damages resulting from your use of or inability to use the Service.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Contact</h2>
              <p className="text-gray-700">
                For questions about these Terms, please contact us through our{' '}
                <Link href="/contact" className="text-brand-teal hover:text-brand-blue font-semibold">
                  contact page
                </Link>.
              </p>
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
