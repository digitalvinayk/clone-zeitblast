'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, Button, Input } from '@/components/ui';
import { FiArrowLeft } from 'react-icons/fi';
import Link from 'next/link';
import toast from 'react-hot-toast';

export default function NewContactPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    primaryPhone: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    source: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          primaryPhone: formData.primaryPhone,
          emails: formData.email ? [formData.email] : [],
          mailingAddress: {
            address: formData.address,
            city: formData.city,
            state: formData.state,
            zip: formData.zip,
          },
          source: formData.source || 'Manual Entry',
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Contact created successfully!');
        router.push('/dashboard/contacts');
      } else {
        toast.error(data.error || 'Failed to create contact');
      }
    } catch (error) {
      toast.error('Failed to create contact');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8">
      <div className="mb-6">
        <Link
          href="/dashboard/contacts"
          className="inline-flex items-center text-primary-green hover:text-primary-blue mb-4"
        >
          <FiArrowLeft className="mr-2" />
          Back to Contacts
        </Link>
        <h1 className="text-3xl font-bold text-primary-dark">Add New Contact</h1>
        <p className="text-gray-600 mt-2">Create a new contact in your database</p>
      </div>

      <div className="max-w-3xl">
        <Card variant="elevated" className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div>
              <h3 className="text-lg font-semibold text-primary-dark mb-4">
                Personal Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="First Name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="John"
                  fullWidth
                />
                <Input
                  label="Last Name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Doe"
                  fullWidth
                />
              </div>
            </div>

            {/* Contact Information */}
            <div>
              <h3 className="text-lg font-semibold text-primary-dark mb-4">
                Contact Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Phone Number *"
                  name="primaryPhone"
                  type="tel"
                  value={formData.primaryPhone}
                  onChange={handleChange}
                  placeholder="+1234567890"
                  required
                  fullWidth
                />
                <Input
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  fullWidth
                />
              </div>
            </div>

            {/* Address Information */}
            <div>
              <h3 className="text-lg font-semibold text-primary-dark mb-4">
                Property Address (Optional)
              </h3>
              <div className="space-y-4">
                <Input
                  label="Street Address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="123 Main St"
                  fullWidth
                />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Input
                    label="City"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="New York"
                    fullWidth
                  />
                  <Input
                    label="State"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    placeholder="NY"
                    fullWidth
                  />
                  <Input
                    label="ZIP Code"
                    name="zip"
                    value={formData.zip}
                    onChange={handleChange}
                    placeholder="10001"
                    fullWidth
                  />
                </div>
              </div>
            </div>

            {/* Source */}
            <div>
              <h3 className="text-lg font-semibold text-primary-dark mb-4">
                Additional Information
              </h3>
              <Input
                label="Source"
                name="source"
                value={formData.source}
                onChange={handleChange}
                placeholder="e.g., Facebook Ads, Referral, Cold Call"
                fullWidth
              />
            </div>

            {/* Actions */}
            <div className="flex gap-4 pt-6 border-t">
              <Button type="submit" variant="primary" size="lg" disabled={loading}>
                {loading ? 'Creating...' : 'Create Contact'}
              </Button>
              <Link href="/dashboard/contacts">
                <Button type="button" variant="outline" size="lg">
                  Cancel
                </Button>
              </Link>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}
