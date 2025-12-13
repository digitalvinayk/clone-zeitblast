'use client';

import React from 'react';
import { Container, Card } from '@/components/ui';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface BlogPost {
  title: string;
  excerpt: string;
  date: string;
  category: string;
  readTime: string;
  slug: string;
}

const blogPosts: BlogPost[] = [
  {
    title: '10 SMS Marketing Strategies That Convert for Real Estate',
    excerpt: 'Discover the proven SMS marketing tactics that top real estate investors use to generate consistent leads and close more deals.',
    date: 'December 10, 2025',
    category: 'Marketing',
    readTime: '5 min read',
    slug: '10-sms-marketing-strategies',
  },
  {
    title: 'How to Stay Compliant with A2P 10DLC Regulations',
    excerpt: 'Everything you need to know about A2P 10DLC compliance and how Intello Blast helps you stay on the right side of carrier regulations.',
    date: 'December 8, 2025',
    category: 'Compliance',
    readTime: '7 min read',
    slug: 'a2p-10dlc-compliance-guide',
  },
  {
    title: 'The Ultimate Guide to Real Estate Drip Campaigns',
    excerpt: 'Learn how to create effective drip campaigns that nurture leads automatically and increase your conversion rates.',
    date: 'December 5, 2025',
    category: 'Strategy',
    readTime: '10 min read',
    slug: 'real-estate-drip-campaigns-guide',
  },
  {
    title: 'Cold Calling vs SMS Marketing: Which is Better?',
    excerpt: 'We compare traditional cold calling with SMS marketing to show you which method delivers better ROI for real estate professionals.',
    date: 'December 1, 2025',
    category: 'Comparison',
    readTime: '6 min read',
    slug: 'cold-calling-vs-sms-marketing',
  },
  {
    title: 'How to Write SMS Messages That Get Responses',
    excerpt: 'Master the art of crafting compelling SMS messages that grab attention and generate high response rates.',
    date: 'November 28, 2025',
    category: 'Copywriting',
    readTime: '8 min read',
    slug: 'write-sms-messages-that-convert',
  },
  {
    title: 'Integrating Intello Blast with Your CRM: A Step-by-Step Guide',
    excerpt: 'Follow our detailed guide to seamlessly integrate Intello Blast with your existing CRM and automate your lead management.',
    date: 'November 25, 2025',
    category: 'Tutorial',
    readTime: '12 min read',
    slug: 'integrate-zeitblast-with-crm',
  },
];

export default function BlogPage() {
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
              Intello Blast <span className="text-yellow-300">Blog</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-100">
              Tips, strategies, and insights to help you master SMS marketing for real estate
            </p>
          </motion.div>
        </Container>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-20 bg-gray-50">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link href={`/blog/${post.slug}`}>
                  <Card hover variant="elevated" className="h-full flex flex-col">
                    <div className="mb-4">
                      <span className="inline-block px-3 py-1 text-xs font-semibold text-white bg-primary-green rounded-full">
                        {post.category}
                      </span>
                    </div>

                    <h2 className="text-xl font-bold text-primary-dark mb-3 hover:text-primary-green transition-colors">
                      {post.title}
                    </h2>

                    <p className="text-gray-600 mb-4 flex-grow">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t border-gray-200">
                      <span>{post.date}</span>
                      <span>{post.readTime}</span>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Pagination */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex justify-center mt-12 gap-2"
          >
            {[1, 2, 3, 4].map((page) => (
              <button
                key={page}
                className={`w-10 h-10 rounded-lg font-semibold transition-colors ${
                  page === 1
                    ? 'bg-primary-green text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {page}
              </button>
            ))}
          </motion.div>
        </Container>
      </section>

      {/* Newsletter Section */}
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
              Subscribe to Our Newsletter
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Get the latest SMS marketing tips, strategies, and industry insights delivered to your inbox
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-green"
                required
              />
              <button
                type="submit"
                className="px-6 py-3 bg-primary-green text-white font-semibold rounded-lg hover:bg-opacity-90 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </motion.div>
        </Container>
      </section>
    </>
  );
}
