'use client';

import React from 'react';
import { Container, Card, Button } from '@/components/ui';
import { motion } from 'framer-motion';
import { FiCheck, FiDollarSign, FiTrendingUp, FiClock } from 'react-icons/fi';

export default function RealEstateSolutionPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-green via-primary-blue to-primary-dark text-white py-20">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                SMS Marketing for{' '}
                <span className="text-yellow-300">Real Estate</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-100 mb-8">
                Generate more qualified leads and close more deals with automated SMS campaigns designed specifically for real estate professionals
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="white" size="lg">
                  Start Free Trial
                </Button>
                <Button variant="outline" size="lg">
                  Watch Demo
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card variant="elevated" className="bg-white bg-opacity-10 backdrop-blur-lg">
                <div className="text-white space-y-4">
                  <div className="flex items-center">
                    <FiCheck className="text-yellow-300 mr-3" size={24} />
                    <span className="text-lg">99.9% Deliverability Rate</span>
                  </div>
                  <div className="flex items-center">
                    <FiCheck className="text-yellow-300 mr-3" size={24} />
                    <span className="text-lg">10-30% Response Rates</span>
                  </div>
                  <div className="flex items-center">
                    <FiCheck className="text-yellow-300 mr-3" size={24} />
                    <span className="text-lg">Full A2P 10DLC Compliance</span>
                  </div>
                  <div className="flex items-center">
                    <FiCheck className="text-yellow-300 mr-3" size={24} />
                    <span className="text-lg">Seamless CRM Integration</span>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <Container>
          <h2 className="text-3xl md:text-4xl font-bold text-primary-dark mb-12 text-center">
            Why Real Estate Professionals Choose Intello Blast
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: FiDollarSign,
                title: 'Higher ROI',
                description: 'SMS marketing delivers 5-10x higher ROI compared to traditional marketing channels like direct mail or cold calling.',
                color: 'text-green-500',
              },
              {
                icon: FiTrendingUp,
                title: 'Better Response Rates',
                description: 'Achieve 10-30% response rates with SMS vs. 1-3% with cold calling or 2-5% with email marketing.',
                color: 'text-blue-500',
              },
              {
                icon: FiClock,
                title: 'Save Time',
                description: 'Automate your outreach with drip campaigns and quick replies. Spend less time on lead generation and more time closing deals.',
                color: 'text-purple-500',
              },
            ].map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card hover variant="elevated" className="h-full text-center">
                    <div className={`${benefit.color} mb-4 flex justify-center`}>
                      <Icon size={48} />
                    </div>
                    <h3 className="text-xl font-bold text-primary-dark mb-3">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-600">{benefit.description}</p>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Use Cases Section */}
      <section className="py-20 bg-gray-50">
        <Container>
          <h2 className="text-3xl md:text-4xl font-bold text-primary-dark mb-12 text-center">
            Perfect For Every Real Estate Professional
          </h2>

          <div className="space-y-8">
            {[
              {
                title: 'Real Estate Investors',
                description: 'Find motivated sellers, negotiate deals, and build your rental portfolio with targeted SMS campaigns.',
                features: ['Motivated seller leads', 'Off-market properties', 'Quick negotiations', 'Portfolio expansion'],
              },
              {
                title: 'Wholesalers',
                description: 'Scale your wholesaling business with automated outreach to find properties and connect with buyers.',
                features: ['Distressed property leads', 'Buyer list building', 'Quick flips', 'Deal automation'],
              },
              {
                title: 'Real Estate Agents',
                description: 'Stay top-of-mind with past clients, generate referrals, and nurture leads automatically.',
                features: ['Client follow-up', 'Listing alerts', 'Market updates', 'Referral generation'],
              },
              {
                title: 'Real Estate Teams',
                description: 'Coordinate with team members, manage multiple markets, and scale your operations efficiently.',
                features: ['Team collaboration', 'Multi-market management', 'Performance tracking', 'Centralized dashboard'],
              },
            ].map((useCase, index) => (
              <motion.div
                key={useCase.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card variant="elevated">
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="md:col-span-2">
                      <h3 className="text-2xl font-bold text-primary-dark mb-3">
                        {useCase.title}
                      </h3>
                      <p className="text-gray-600 mb-4">{useCase.description}</p>
                    </div>
                    <div>
                      <ul className="space-y-2">
                        {useCase.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start">
                            <FiCheck className="text-primary-green mt-1 mr-2 flex-shrink-0" size={16} />
                            <span className="text-gray-700 text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Card>
              </motion.div>
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
              Ready to Transform Your Real Estate Business?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join thousands of real estate professionals who are generating more leads and closing more deals with Intello Blast
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
