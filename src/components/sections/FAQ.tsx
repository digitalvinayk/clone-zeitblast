'use client';

import React, { useState } from 'react';
import { Container } from '@/components/ui';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown } from 'react-icons/fi';
import clsx from 'clsx';

interface FAQItem {
  question: string;
  answer: string;
}

const faqItems: FAQItem[] = [
  {
    question: 'What is Intello Blast and how does it work?',
    answer: 'Intello Blast is a powerful SMS marketing platform designed specifically for real estate professionals. It allows you to send automated text message campaigns to prospects, manage multiple markets, track responses, and integrate with your existing CRM to streamline your lead generation process.',
  },
  {
    question: 'Is Intello Blast compliant with messaging regulations?',
    answer: 'Yes! Intello Blast is fully compliant with A2P 10DLC regulations and all carrier requirements. We automatically handle compliance checks, number validation, and ensure all your campaigns meet industry standards so you can focus on closing deals.',
  },
  {
    question: 'How quickly can I get started?',
    answer: 'You can get started in minutes! Simply sign up for an account, import your contact list, create your first campaign, and start sending messages. Our intuitive interface makes it easy to launch your first campaign within 15 minutes.',
  },
  {
    question: 'What kind of response rates can I expect?',
    answer: 'Our customers typically see response rates of 10-30%, which is significantly higher than traditional cold calling (1-3%) or email marketing (2-5%). The personal nature of SMS combined with our deliverability optimization leads to exceptional engagement.',
  },
  {
    question: 'Can I integrate Intello Blast with my existing CRM?',
    answer: 'Absolutely! Intello Blast integrates seamlessly with popular CRMs including Salesforce, HubSpot, Podio, and many others. You can automatically push leads into your CRM and sync contact information bidirectionally.',
  },
  {
    question: 'What support do you offer?',
    answer: 'We offer 24/7 customer support via chat and email for all plans. Time to Scale and higher tiers include dedicated account managers and weekly Q&A sessions. We also provide extensive documentation, video tutorials, and training resources.',
  },
  {
    question: 'Is there a contract or can I cancel anytime?',
    answer: 'There are no long-term contracts required. You can cancel your subscription at any time. We believe in earning your business every month by delivering exceptional results and service.',
  },
  {
    question: 'How does the Jumpstart JV program work?',
    answer: 'The Jumpstart JV program is a unique partnership where we handle your SMS marketing campaigns for you in exchange for a 50/50 split on closed deals. This includes full Vault Access to our real estate education courses, making it perfect for those who want done-for-you lead generation.',
  },
];

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-gray-50">
      <Container size="lg">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-dark mb-4"
          >
            Frequently Asked{' '}
            <span className="text-primary-green">Questions</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Everything you need to know about Intello Blast and SMS marketing for real estate
          </motion.p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-sm overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
              >
                <span className="font-semibold text-primary-dark pr-8">
                  {item.question}
                </span>
                <FiChevronDown
                  className={clsx(
                    'text-primary-green flex-shrink-0 transition-transform duration-300',
                    openIndex === index && 'rotate-180'
                  )}
                  size={24}
                />
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-6 pb-5 text-gray-600">
                      {item.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12"
        >
          <p className="text-gray-600 mb-4">
            Still have questions?
          </p>
          <a
            href="/contact"
            className="text-primary-green hover:text-primary-blue font-semibold text-lg transition-colors"
          >
            Contact our team →
          </a>
        </motion.div>
      </Container>
    </section>
  );
};

export default FAQ;
