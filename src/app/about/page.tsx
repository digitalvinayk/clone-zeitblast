'use client';

import React from 'react';
import { Container, Card, Button } from '@/components/ui';
import { motion } from 'framer-motion';
import { FiTarget, FiHeart, FiUsers, FiAward } from 'react-icons/fi';

export default function AboutPage() {
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
              About <span className="text-yellow-300">Zeitblast</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-100">
              Empowering real estate professionals with cutting-edge SMS marketing technology
            </p>
          </motion.div>
        </Container>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-white">
        <Container>
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-primary-dark mb-6">
                Our Mission
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                At Zeitblast, we believe that every real estate professional deserves access to powerful,
                compliant, and effective SMS marketing tools. Our mission is to democratize lead generation
                and help you close more deals through intelligent automation and world-class support.
              </p>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <Container>
          <h2 className="text-3xl md:text-4xl font-bold text-primary-dark mb-12 text-center">
            Our Values
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: FiTarget,
                title: 'Results-Driven',
                description: 'We focus on delivering measurable results that directly impact your bottom line.',
                color: 'text-green-500',
              },
              {
                icon: FiHeart,
                title: 'Customer-First',
                description: 'Your success is our success. We go above and beyond to support your goals.',
                color: 'text-red-500',
              },
              {
                icon: FiUsers,
                title: 'Community',
                description: 'We build lasting relationships and foster a supportive community of real estate pros.',
                color: 'text-blue-500',
              },
              {
                icon: FiAward,
                title: 'Excellence',
                description: 'We strive for excellence in everything we do, from product to support.',
                color: 'text-purple-500',
              },
            ].map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card hover variant="elevated" className="h-full text-center">
                    <div className={`${value.color} mb-4 flex justify-center`}>
                      <Icon size={48} />
                    </div>
                    <h3 className="text-xl font-bold text-primary-dark mb-3">
                      {value.title}
                    </h3>
                    <p className="text-gray-600">{value.description}</p>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-white">
        <Container>
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-primary-dark mb-8 text-center">
                Our Story
              </h2>
              <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                <p>
                  Zeitblast was born out of frustration with existing SMS marketing platforms that were
                  either too complex, too expensive, or simply didn't deliver results. Our founders,
                  experienced real estate investors themselves, knew there had to be a better way.
                </p>
                <p>
                  After years of cold calling, direct mail, and experimenting with various marketing channels,
                  they discovered that SMS had the highest ROI—but only when done right. The challenge was
                  finding a platform that balanced compliance, deliverability, ease of use, and affordability.
                </p>
                <p>
                  That's when Zeitblast was created. Built by real estate professionals for real estate
                  professionals, our platform combines cutting-edge technology with deep industry expertise
                  to deliver unmatched results.
                </p>
                <p>
                  Today, we serve thousands of real estate investors, wholesalers, agents, and teams across
                  the country, helping them generate more leads and close more deals than ever before.
                </p>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-primary-dark text-white">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
              Zeitblast by the Numbers
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { number: '10,000+', label: 'Active Users' },
                { number: '50M+', label: 'Messages Delivered' },
                { number: '99.9%', label: 'Deliverability Rate' },
                { number: '25%', label: 'Avg Response Rate' },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-4xl md:text-5xl font-bold text-primary-green mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-300">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-primary-dark mb-6">
              Join Our Growing Community
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Become part of a thriving community of real estate professionals who are transforming
              their businesses with Zeitblast.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="primary" size="lg">
                Start Free Trial
              </Button>
              <Button variant="outline" size="lg">
                Contact Us
              </Button>
            </div>
          </motion.div>
        </Container>
      </section>
    </>
  );
}
