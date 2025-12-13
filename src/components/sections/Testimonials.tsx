'use client';

import React from 'react';
import { Container, Card } from '@/components/ui';
import { motion } from 'framer-motion';
import { FiStar } from 'react-icons/fi';

interface Testimonial {
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    name: 'Sarah Johnson',
    role: 'Real Estate Investor',
    company: 'Johnson Properties',
    content: 'Zeitblast has transformed my lead generation process. I\'m closing 3x more deals than before with less effort. The automation features are a game-changer!',
    rating: 5,
  },
  {
    name: 'Michael Chen',
    role: 'Wholesaler',
    company: 'Chen Wholesale Group',
    content: 'The deliverability and response rates are incredible. I was skeptical at first, but after seeing 25% response rates on my first campaign, I\'m a believer. Best investment I\'ve made.',
    rating: 5,
  },
  {
    name: 'Jennifer Martinez',
    role: 'Team Leader',
    company: 'Martinez Real Estate Team',
    content: 'Managing multiple markets used to be a nightmare. Zeitblast makes it effortless. The CRM integration saved us countless hours of manual data entry.',
    rating: 5,
  },
  {
    name: 'David Thompson',
    role: 'Real Estate Agent',
    company: 'Thompson Realty',
    content: 'I love how easy it is to stay compliant. No more worrying about regulations or carrier restrictions. Zeitblast handles everything automatically so I can focus on closing deals.',
    rating: 5,
  },
  {
    name: 'Amanda Rodriguez',
    role: 'Investment Firm Owner',
    company: 'Rodriguez Investments',
    content: 'The analytics and insights are phenomenal. I can see exactly which campaigns are working and optimize in real-time. ROI is through the roof!',
    rating: 5,
  },
  {
    name: 'Robert Williams',
    role: 'Real Estate Broker',
    company: 'Williams Brokerage',
    content: 'Customer support is outstanding. Whenever I have a question, the team responds immediately. The weekly Q&A sessions have been incredibly valuable for our entire team.',
    rating: 5,
  },
];

const Testimonials: React.FC = () => {
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
            Trusted by{' '}
            <span className="text-primary-green">Top Performers</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            See what real estate professionals are saying about Zeitblast
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card variant="elevated" className="h-full">
                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FiStar key={i} className="text-yellow-400 fill-current" size={20} />
                  ))}
                </div>

                {/* Content */}
                <p className="text-gray-700 mb-6 italic">
                  "{testimonial.content}"
                </p>

                {/* Author */}
                <div className="border-t pt-4">
                  <p className="font-semibold text-primary-dark">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-gray-600">
                    {testimonial.role}
                  </p>
                  <p className="text-sm text-primary-green">
                    {testimonial.company}
                  </p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <div className="text-4xl font-bold text-primary-green mb-2">10K+</div>
              <div className="text-gray-600">Active Users</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary-green mb-2">99.9%</div>
              <div className="text-gray-600">Deliverability</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary-green mb-2">25%</div>
              <div className="text-gray-600">Avg Response Rate</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary-green mb-2">24/7</div>
              <div className="text-gray-600">Support</div>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
};

export default Testimonials;
