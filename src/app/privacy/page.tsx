import React from 'react';
import Link from 'next/link';
import { Container, Card } from '@/components/ui';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <Container>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Privacy Policy
            </h1>
            <p className="text-gray-600">
              Last updated: December 13, 2025
            </p>
          </div>

          <Card variant="elevated" padding="lg" className="mb-8">
            <div className="prose max-w-none">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Information We Collect</h2>
              <p className="text-gray-700 mb-4">
                We collect information you provide directly to us, including:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-6 space-y-2">
                <li>Account information (name, email, organization name)</li>
                <li>Contact lists and recipient data you upload</li>
                <li>SMS campaign content and performance data</li>
                <li>Payment and billing information</li>
                <li>Usage data and analytics</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. How We Use Your Information</h2>
              <p className="text-gray-700 mb-4">
                We use the information we collect to:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-6 space-y-2">
                <li>Provide, maintain, and improve our services</li>
                <li>Process transactions and send SMS messages on your behalf</li>
                <li>Send you technical notices and support messages</li>
                <li>Respond to your comments and questions</li>
                <li>Monitor and analyze trends and usage</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Information Sharing</h2>
              <p className="text-gray-700 mb-6">
                We do not sell your personal information. We may share your information with:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-6 space-y-2">
                <li>SMS carriers to deliver messages</li>
                <li>Service providers who assist in our operations</li>
                <li>Law enforcement when required by law</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Data Security</h2>
              <p className="text-gray-700 mb-6">
                We implement appropriate security measures to protect your information. However,
                no method of transmission over the Internet is 100% secure.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Data Retention</h2>
              <p className="text-gray-700 mb-6">
                We retain your information for as long as your account is active or as needed to
                provide you services. You may request deletion of your data at any time.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Your Rights</h2>
              <p className="text-gray-700 mb-4">
                You have the right to:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-6 space-y-2">
                <li>Access your personal information</li>
                <li>Correct inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Object to processing of your information</li>
                <li>Export your data</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Cookies</h2>
              <p className="text-gray-700 mb-6">
                We use cookies and similar technologies to improve user experience, analyze usage,
                and assist in our marketing efforts.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Changes to This Policy</h2>
              <p className="text-gray-700 mb-6">
                We may update this privacy policy from time to time. We will notify you of any
                changes by posting the new policy on this page.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Contact Us</h2>
              <p className="text-gray-700">
                If you have questions about this privacy policy, please contact us through our{' '}
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
