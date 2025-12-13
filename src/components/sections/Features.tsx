'use client';

import React from 'react';
import { Container, Card } from '@/components/ui';
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
} from 'react-icons/fi';

interface Feature {
  icon: React.ElementType;
  title: string;
  description: string;
  color: string;
}

const features: Feature[] = [
  {
    icon: FiSend,
    title: 'High Deliverability & Response Rates',
    description: 'Reach your prospects with industry-leading deliverability rates and get more responses than traditional cold calling.',
    color: 'text-green-500',
  },
  {
    icon: FiTarget,
    title: 'Automated Drip Campaigns',
    description: 'Set up automated text message sequences that nurture leads over time without manual intervention.',
    color: 'text-blue-500',
  },
  {
    icon: FiMessageCircle,
    title: 'Multi-Market Outreach',
    description: 'Manage campaigns across multiple markets simultaneously and scale your real estate business faster.',
    color: 'text-purple-500',
  },
  {
    icon: FiZap,
    title: 'Quick Replies',
    description: 'Respond to leads instantly with pre-built templates and save valuable time while maintaining personalization.',
    color: 'text-yellow-500',
  },
  {
    icon: FiCheckCircle,
    title: 'Custom Tagging',
    description: 'Organize your contacts with custom tags and segments for targeted messaging and better campaign management.',
    color: 'text-pink-500',
  },
  {
    icon: FiShield,
    title: 'Built-in Compliance',
    description: 'Stay compliant with A2P 10DLC regulations automatically. No need to worry about carrier restrictions.',
    color: 'text-red-500',
  },
  {
    icon: FiUsers,
    title: 'CRM Integration',
    description: 'Seamlessly integrate with your existing CRM and push leads directly into your sales pipeline.',
    color: 'text-indigo-500',
  },
  {
    icon: FiBarChart,
    title: 'Data-Driven Analytics',
    description: 'Track campaign performance in real-time with detailed analytics and insights to optimize your strategy.',
    color: 'text-teal-500',
  },
];

const Features: React.FC = () => {
  return (
    <section className="py-20 bg-gray-50">
      <Container>
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-dark mb-4"
          >
            Everything You Need to{' '}
            <span className="text-primary-green">Dominate Your Market</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Powerful features designed specifically for real estate professionals who want to generate more leads and close more deals
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card hover variant="elevated" className="h-full">
                  <div className={`${feature.color} mb-4`}>
                    <Icon size={40} />
                  </div>
                  <h3 className="text-xl font-semibold text-primary-dark mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <a
            href="/features"
            className="inline-flex items-center text-primary-green hover:text-primary-blue font-semibold text-lg transition-colors"
          >
            Explore All Features
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </motion.div>
      </Container>
    </section>
  );
};

export default Features;
