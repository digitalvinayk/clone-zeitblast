'use client';

import React, { useState } from 'react';
import { Container, Card, Button, Input } from '@/components/ui';
import { motion } from 'framer-motion';
import { FiMail, FiPhone, FiMapPin, FiClock } from 'react-icons/fi';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission
    alert('Thank you for contacting us! We will get back to you soon.');
    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      message: '',
    });
  };

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
              Get in <span className="text-yellow-300">Touch</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-100">
              Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </motion.div>
        </Container>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gray-50">
        <Container>
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Information */}
            <div className="lg:col-span-1 space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-2xl font-bold text-primary-dark mb-6">
                  Contact Information
                </h2>

                <div className="space-y-6">
                  <Card variant="elevated">
                    <div className="flex items-start">
                      <FiMail className="text-primary-green mt-1 mr-4" size={24} />
                      <div>
                        <h3 className="font-semibold text-primary-dark mb-1">Email</h3>
                        <a
                          href="mailto:support@zeitblast.com"
                          className="text-gray-600 hover:text-primary-green transition-colors"
                        >
                          support@zeitblast.com
                        </a>
                      </div>
                    </div>
                  </Card>

                  <Card variant="elevated">
                    <div className="flex items-start">
                      <FiPhone className="text-primary-green mt-1 mr-4" size={24} />
                      <div>
                        <h3 className="font-semibold text-primary-dark mb-1">Phone</h3>
                        <a
                          href="tel:+18001234567"
                          className="text-gray-600 hover:text-primary-green transition-colors"
                        >
                          1-800-123-4567
                        </a>
                      </div>
                    </div>
                  </Card>

                  <Card variant="elevated">
                    <div className="flex items-start">
                      <FiMapPin className="text-primary-green mt-1 mr-4" size={24} />
                      <div>
                        <h3 className="font-semibold text-primary-dark mb-1">Office</h3>
                        <p className="text-gray-600">
                          123 Business Ave<br />
                          Suite 100<br />
                          San Francisco, CA 94102
                        </p>
                      </div>
                    </div>
                  </Card>

                  <Card variant="elevated">
                    <div className="flex items-start">
                      <FiClock className="text-primary-green mt-1 mr-4" size={24} />
                      <div>
                        <h3 className="font-semibold text-primary-dark mb-1">Business Hours</h3>
                        <p className="text-gray-600">
                          Monday - Friday: 9am - 6pm PST<br />
                          Saturday - Sunday: Closed<br />
                          <span className="text-primary-green font-semibold">24/7 Support Available</span>
                        </p>
                      </div>
                    </div>
                  </Card>
                </div>
              </motion.div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <Card variant="elevated" padding="lg">
                  <h2 className="text-2xl font-bold text-primary-dark mb-6">
                    Send us a Message
                  </h2>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <Input
                        label="Full Name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        required
                        fullWidth
                      />

                      <Input
                        label="Email Address"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        required
                        fullWidth
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <Input
                        label="Phone Number"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="(555) 123-4567"
                        fullWidth
                      />

                      <Input
                        label="Company Name"
                        name="company"
                        type="text"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="Your Company"
                        fullWidth
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Message
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="How can we help you?"
                        rows={6}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-green focus:border-transparent transition-all duration-200"
                      />
                    </div>

                    <Button type="submit" variant="primary" size="lg" fullWidth>
                      Send Message
                    </Button>
                  </form>
                </Card>
              </motion.div>
            </div>
          </div>
        </Container>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <Container>
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-primary-dark mb-8 text-center">
              Quick Answers
            </h2>

            <div className="space-y-4">
              {[
                {
                  q: 'How quickly can I get started?',
                  a: 'You can sign up and start sending messages within 15 minutes. No technical setup required.',
                },
                {
                  q: 'Do you offer demos?',
                  a: 'Yes! Schedule a personalized demo with our team to see Zeitblast in action.',
                },
                {
                  q: 'What kind of support do you provide?',
                  a: 'We offer 24/7 customer support via chat and email, plus dedicated account managers for premium plans.',
                },
                {
                  q: 'Can I integrate with my existing tools?',
                  a: 'Absolutely! We integrate with all major CRMs and offer API access for custom integrations.',
                },
              ].map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card variant="bordered">
                    <h3 className="font-semibold text-lg text-primary-dark mb-2">
                      {faq.q}
                    </h3>
                    <p className="text-gray-600">{faq.a}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
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
              Prefer to Talk?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Schedule a call with our team to discuss how Zeitblast can help grow your business
            </p>
            <Button variant="white" size="lg">
              Schedule a Call
            </Button>
          </motion.div>
        </Container>
      </section>
    </>
  );
}
