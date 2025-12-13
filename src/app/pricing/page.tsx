'use client';

import React, { useState } from 'react';
import { Container, Card, Button } from '@/components/ui';
import { motion } from 'framer-motion';
import { FiCheck, FiX } from 'react-icons/fi';

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
      'Basic analytics',
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
      'API access',
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
      'Full API access',
      'Custom workflows',
      'Hands-free lead generation',
      'Transaction coordination',
      'Custom development support',
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
      'Done-for-you campaigns',
    ],
    cta: 'Join JV Program',
  },
];

const comparisonFeatures = [
  {
    category: 'Messages & Campaigns',
    features: [
      { name: 'Monthly Messages', values: ['5,000', '15,000', '50,000', '10,000'] },
      { name: 'Drip Campaigns', values: [true, true, true, true] },
      { name: 'Multi-Market Outreach', values: [true, true, true, true] },
      { name: 'A/B Testing', values: [false, true, true, false] },
      { name: 'Custom Workflows', values: [false, false, true, false] },
    ],
  },
  {
    category: 'Features & Tools',
    features: [
      { name: 'Quick Replies', values: [true, true, true, true] },
      { name: 'Custom Tagging', values: [true, true, true, true] },
      { name: 'Number Validation', values: [true, true, true, true] },
      { name: 'CRM Integration', values: [true, true, true, true] },
      { name: 'Auto Compliance', values: [true, true, true, true] },
      { name: 'White-Label Options', values: [false, false, true, false] },
    ],
  },
  {
    category: 'Analytics & Reporting',
    features: [
      { name: 'Basic Analytics', values: [true, true, true, true] },
      { name: 'Advanced Analytics', values: [false, true, true, false] },
      { name: 'Real-time Dashboards', values: [false, true, true, false] },
      { name: 'Exportable Reports', values: [false, true, true, false] },
    ],
  },
  {
    category: 'Support & Training',
    features: [
      { name: '24/7 Support', values: [true, true, true, true] },
      { name: 'Priority Support', values: [false, true, true, false] },
      { name: 'Dedicated Account Manager', values: [false, true, true, false] },
      { name: 'Weekly Q&A Sessions', values: [false, true, true, true] },
      { name: 'Real Estate Education', values: [false, false, false, true] },
    ],
  },
  {
    category: 'Advanced Features',
    features: [
      { name: 'API Access', values: [false, true, true, false] },
      { name: 'Webhooks', values: [false, true, true, false] },
      { name: 'Unlimited Users', values: [false, false, true, false] },
      { name: 'Done-for-You Service', values: [false, false, false, true] },
      { name: 'Deal Split Program', values: [false, false, false, true] },
    ],
  },
];

export default function PricingPage() {
  const [showComparison, setShowComparison] = useState(false);

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
              Simple, Transparent{' '}
              <span className="text-yellow-300">Pricing</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-100 mb-8">
              Choose the perfect plan for your business. Start with a 14-day free trial.
            </p>
          </motion.div>
        </Container>
      </section>

      {/* Pricing Cards */}
      <section className="py-20 bg-gray-50">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
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

          {/* Toggle Comparison */}
          <div className="text-center">
            <Button
              variant="outline"
              onClick={() => setShowComparison(!showComparison)}
            >
              {showComparison ? 'Hide' : 'Show'} Detailed Comparison
            </Button>
          </div>
        </Container>
      </section>

      {/* Comparison Table */}
      {showComparison && (
        <section className="py-20 bg-white">
          <Container>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-primary-dark mb-8 text-center">
                Feature Comparison
              </h2>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-gray-300">
                      <th className="text-left p-4 font-semibold">Features</th>
                      {pricingPlans.map((plan) => (
                        <th key={plan.name} className="p-4 text-center">
                          <div className="font-bold text-primary-dark">{plan.name}</div>
                          <div className="text-2xl font-bold text-primary-green mt-2">
                            {plan.price}
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonFeatures.map((category, categoryIndex) => (
                      <React.Fragment key={categoryIndex}>
                        <tr className="bg-gray-100">
                          <td colSpan={5} className="p-4 font-semibold text-primary-dark">
                            {category.category}
                          </td>
                        </tr>
                        {category.features.map((feature, featureIndex) => (
                          <tr key={featureIndex} className="border-b border-gray-200">
                            <td className="p-4 text-gray-700">{feature.name}</td>
                            {feature.values.map((value, valueIndex) => (
                              <td key={valueIndex} className="p-4 text-center">
                                {typeof value === 'boolean' ? (
                                  value ? (
                                    <FiCheck className="text-primary-green mx-auto" size={24} />
                                  ) : (
                                    <FiX className="text-gray-400 mx-auto" size={24} />
                                  )
                                ) : (
                                  <span className="font-semibold text-primary-dark">{value}</span>
                                )}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </Container>
        </section>
      )}

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <Container size="lg">
          <h2 className="text-3xl font-bold text-primary-dark mb-12 text-center">
            Pricing FAQs
          </h2>

          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                q: 'Is there a free trial?',
                a: 'Yes! All plans include a 14-day free trial. No credit card required to start.',
              },
              {
                q: 'Can I change plans later?',
                a: 'Absolutely! You can upgrade or downgrade your plan at any time. Changes take effect immediately.',
              },
              {
                q: 'What happens if I exceed my message limit?',
                a: 'You can purchase additional messages at a discounted rate, or upgrade to a higher tier plan for better value.',
              },
              {
                q: 'Are there any setup fees?',
                a: 'No setup fees, no hidden charges. The price you see is the price you pay.',
              },
              {
                q: 'How does the JV program work?',
                a: 'The Jumpstart JV program is unique - we handle your campaigns and split closed deals 50/50. You also get full access to our real estate education vault.',
              },
            ].map((faq, index) => (
              <Card key={index} variant="elevated">
                <h3 className="font-semibold text-lg text-primary-dark mb-2">
                  {faq.q}
                </h3>
                <p className="text-gray-600">{faq.a}</p>
              </Card>
            ))}
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
              Ready to Get Started?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join thousands of real estate professionals who trust Zeitblast for their SMS marketing
            </p>
            <Button variant="white" size="lg">
              Start Your Free Trial
            </Button>
          </motion.div>
        </Container>
      </section>
    </>
  );
}
