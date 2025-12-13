'use client';

import React from 'react';
import { Container, Card, Button } from '@/components/ui';
import { motion } from 'framer-motion';
import {
  FiSend,
  FiTarget,
  FiMessageCircle,
  FiBarChart,
  FiCheckCircle,
  FiUsers,
  FiZap,
  FiShield,
  FiTag,
  FiPhone,
  FiLink,
  FiRefreshCw,
} from 'react-icons/fi';
import type { Metadata } from 'next';

interface FeatureDetail {
  icon: React.ElementType;
  title: string;
  description: string;
  benefits: string[];
  color: string;
}

const featureDetails: FeatureDetail[] = [
  {
    icon: FiSend,
    title: 'High Deliverability & Response Rates',
    description: 'Our platform ensures your messages reach your prospects with industry-leading deliverability rates of 99.9%. Get more responses than traditional cold calling or email marketing.',
    benefits: [
      'Automatic carrier optimization',
      'Spam filter avoidance',
      'Message timing optimization',
      'Real-time delivery tracking',
    ],
    color: 'text-green-500',
  },
  {
    icon: FiTarget,
    title: 'Automated Drip Campaigns',
    description: 'Create sophisticated multi-step SMS campaigns that nurture leads automatically. Set it up once and let it run on autopilot.',
    benefits: [
      'Customizable message sequences',
      'Time-based triggers',
      'Behavior-based automation',
      'A/B testing capabilities',
    ],
    color: 'text-blue-500',
  },
  {
    icon: FiMessageCircle,
    title: 'Multi-Market Outreach',
    description: 'Manage campaigns across multiple markets simultaneously. Scale your real estate business without multiplying your workload.',
    benefits: [
      'Unlimited market management',
      'Market-specific templates',
      'Centralized dashboard',
      'Performance comparison',
    ],
    color: 'text-purple-500',
  },
  {
    icon: FiZap,
    title: 'Quick Replies',
    description: 'Respond to leads instantly with pre-built templates. Maintain personalization while saving valuable time.',
    benefits: [
      'Customizable templates',
      'One-click responses',
      'Variable insertion',
      'Mobile-friendly interface',
    ],
    color: 'text-yellow-500',
  },
  {
    icon: FiTag,
    title: 'Custom Tagging',
    description: 'Organize your contacts with custom tags and segments for targeted messaging and better campaign management.',
    benefits: [
      'Unlimited custom tags',
      'Automated tagging rules',
      'Segment-based campaigns',
      'Advanced filtering',
    ],
    color: 'text-pink-500',
  },
  {
    icon: FiPhone,
    title: 'Phone Number Validation',
    description: 'Automatically verify phone numbers before sending messages. Reduce bounced messages and improve deliverability.',
    benefits: [
      'Real-time validation',
      'Invalid number detection',
      'Carrier identification',
      'Cost optimization',
    ],
    color: 'text-orange-500',
  },
  {
    icon: FiShield,
    title: 'Built-in Compliance Features',
    description: 'Stay compliant with A2P 10DLC regulations automatically. No need to worry about carrier restrictions or legal issues.',
    benefits: [
      'Auto-compliance checking',
      'Opt-out management',
      'Legal text templates',
      'Audit trail logging',
    ],
    color: 'text-red-500',
  },
  {
    icon: FiLink,
    title: 'CRM Integration',
    description: 'Seamlessly integrate with your existing CRM. Push leads directly into your sales pipeline without manual data entry.',
    benefits: [
      'Two-way sync',
      'Popular CRM support',
      'Custom field mapping',
      'Webhook integration',
    ],
    color: 'text-indigo-500',
  },
  {
    icon: FiBarChart,
    title: 'Data-Driven Analytics',
    description: 'Track campaign performance in real-time with detailed analytics and insights to optimize your strategy.',
    benefits: [
      'Real-time dashboards',
      'Response rate tracking',
      'ROI calculations',
      'Exportable reports',
    ],
    color: 'text-teal-500',
  },
  {
    icon: FiUsers,
    title: '24/7 Customer Support',
    description: 'Get help whenever you need it with our around-the-clock customer support team and extensive knowledge base.',
    benefits: [
      'Live chat support',
      'Email support',
      'Video tutorials',
      'Dedicated account managers',
    ],
    color: 'text-cyan-500',
  },
  {
    icon: FiCheckCircle,
    title: 'Campaign Management',
    description: 'Manage all your campaigns from one centralized dashboard. Monitor performance and make adjustments in real-time.',
    benefits: [
      'Unified dashboard',
      'Campaign scheduling',
      'Performance metrics',
      'Quick editing',
    ],
    color: 'text-lime-500',
  },
  {
    icon: FiRefreshCw,
    title: 'Webhooks & API',
    description: 'Integrate Zeitblast with your existing tools and workflows using our robust API and webhook system.',
    benefits: [
      'RESTful API',
      'Real-time webhooks',
      'Custom integrations',
      'Developer documentation',
    ],
    color: 'text-violet-500',
  },
];

export default function FeaturesPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-green via-primary-blue to-primary-dark text-white py-20">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Powerful Features for{' '}
              <span className="text-yellow-300">Real Estate Pros</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-100 mb-8">
              Everything you need to generate more leads, close more deals, and dominate your market
            </p>
          </motion.div>
        </Container>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-gray-50">
        <Container>
          <div className="space-y-20">
            {featureDetails.map((feature, index) => {
              const Icon = feature.icon;
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className={`grid md:grid-cols-2 gap-12 items-center ${
                    !isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  <div className={isEven ? 'md:order-1' : 'md:order-2'}>
                    <div className={`${feature.color} mb-4`}>
                      <Icon size={48} />
                    </div>
                    <h2 className="text-3xl font-bold text-primary-dark mb-4">
                      {feature.title}
                    </h2>
                    <p className="text-lg text-gray-600 mb-6">
                      {feature.description}
                    </p>
                    <ul className="space-y-3">
                      {feature.benefits.map((benefit, idx) => (
                        <li key={idx} className="flex items-start">
                          <FiCheckCircle className="text-primary-green mt-1 mr-3 flex-shrink-0" size={20} />
                          <span className="text-gray-700">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className={isEven ? 'md:order-2' : 'md:order-1'}>
                    <Card variant="elevated" className="bg-gradient-to-br from-white to-gray-50 p-8">
                      <div className="aspect-video bg-gradient-to-br from-primary-green to-primary-blue rounded-lg flex items-center justify-center">
                        <Icon className="text-white" size={120} />
                      </div>
                    </Card>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-dark text-white">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Transform Your Lead Generation?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join thousands of real estate professionals who are closing more deals with Zeitblast
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="white" size="lg">
                Start Free Trial
              </Button>
              <Button variant="outline" size="lg">
                Schedule Demo
              </Button>
            </div>
          </motion.div>
        </Container>
      </section>
    </>
  );
}
