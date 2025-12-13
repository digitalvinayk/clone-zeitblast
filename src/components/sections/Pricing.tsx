'use client';

import React from 'react';
import { Container, Card, Button } from '@/components/ui';
import { motion } from 'framer-motion';
import { FiCheck } from 'react-icons/fi';

interface PricingPlan {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  highlighted?: boolean;
  cta: string;
}

const pricingPlans: PricingPlan[] = [
  {
    name: "I'm Serious",
    price: '$495',
    period: '/month',
    description: 'Perfect for individuals getting started with SMS marketing',
    features: [
      '5,000 messages per month',
      'Drip campaigns',
      'Multi-market outreach',
      'Quick replies',
      'Custom tagging',
      'Number validation',
      'CRM integration',
      '24/7 support',
    ],
    cta: 'Get Started',
  },
  {
    name: 'Time to Scale',
    price: '$795',
    period: '/month',
    description: 'Ideal for growing teams ready to scale their outreach',
    features: [
      '15,000 messages per month',
      'Everything in I\'m Serious',
      'Advanced analytics',
      'A/B testing',
      'Priority support',
      'Dedicated account manager',
      'Custom integrations',
      'Weekly Q&A sessions',
    ],
    highlighted: true,
    cta: 'Start Scaling',
  },
  {
    name: 'Market Dominator',
    price: '$1,495',
    period: '/month',
    description: 'For established businesses dominating their market',
    features: [
      '50,000 messages per month',
      'Everything in Time to Scale',
      'Unlimited users',
      'White-label options',
      'API access',
      'Custom workflows',
      'Hands-free lead generation',
      'Transaction coordination',
    ],
    cta: 'Dominate Now',
  },
  {
    name: 'Jumpstart JV + Vault',
    price: '$495',
    period: '/month',
    description: 'Done-for-you service with 50/50 deal split',
    features: [
      '10,000 messages per month',
      '50/50 deal split on closings',
      'Full Vault Access',
      'Real estate courses',
      'Novation training',
      'Subject-To strategies',
      'Wholesaling education',
      'Weekly coaching calls',
    ],
    cta: 'Join JV Program',
  },
];

const Pricing: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <Container>
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-dark mb-4"
          >
            Simple, Transparent{' '}
            <span className="text-primary-green">Pricing</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Choose the perfect plan for your business. All plans include our core features and world-class support.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="h-full"
            >
              <Card
                variant={plan.highlighted ? 'elevated' : 'bordered'}
                className={`h-full flex flex-col ${
                  plan.highlighted ? 'ring-2 ring-primary-green' : ''
                }`}
              >
                {plan.highlighted && (
                  <div className="bg-primary-green text-white text-center py-2 -mt-6 -mx-6 mb-6 rounded-t-xl font-semibold">
                    Most Popular
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-primary-dark mb-2">
                    {plan.name}
                  </h3>
                  <div className="flex items-baseline mb-2">
                    <span className="text-4xl font-bold text-primary-dark">
                      {plan.price}
                    </span>
                    <span className="text-gray-600 ml-2">{plan.period}</span>
                  </div>
                  <p className="text-gray-600 text-sm">{plan.description}</p>
                </div>

                <ul className="space-y-3 mb-8 flex-grow">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <FiCheck className="text-primary-green mt-1 mr-3 flex-shrink-0" size={20} />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  variant={plan.highlighted ? 'primary' : 'outline'}
                  fullWidth
                  size="lg"
                >
                  {plan.cta}
                </Button>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12"
        >
          <p className="text-gray-600 mb-4">
            All plans include a 14-day free trial. No credit card required.
          </p>
          <a
            href="/pricing"
            className="text-primary-green hover:text-primary-blue font-semibold transition-colors"
          >
            Compare all features →
          </a>
        </motion.div>
      </Container>
    </section>
  );
};

export default Pricing;
