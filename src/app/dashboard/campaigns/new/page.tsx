'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card, Button, Input } from '@/components/ui';
import { FiArrowLeft } from 'react-icons/fi';
import toast from 'react-hot-toast';

interface Contact {
  id: string;
  firstName: string | null;
  lastName: string | null;
  primaryPhone: string;
}

export default function NewCampaignPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [selectedContacts, setSelectedContacts] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    type: 'BLAST',
    messageTemplate: '',
  });

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await fetch('/api/contacts?limit=1000');
      const data = await response.json();
      if (response.ok) {
        setContacts(data.contacts);
      }
    } catch (error) {
      console.error('Error fetching contacts:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const toggleContact = (contactId: string) => {
    setSelectedContacts(prev =>
      prev.includes(contactId)
        ? prev.filter(id => id !== contactId)
        : [...prev, contactId]
    );
  };

  const toggleAll = () => {
    if (selectedContacts.length === contacts.length) {
      setSelectedContacts([]);
    } else {
      setSelectedContacts(contacts.map(c => c.id));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (selectedContacts.length === 0) {
      toast.error('Please select at least one contact');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/campaigns', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          contactIds: selectedContacts,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Campaign created successfully!');
        router.push('/dashboard/campaigns');
      } else {
        toast.error(data.error || 'Failed to create campaign');
      }
    } catch (error) {
      toast.error('Failed to create campaign');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8">
      <div className="mb-6">
        <Link
          href="/dashboard/campaigns"
          className="inline-flex items-center text-primary-green hover:text-primary-blue mb-4"
        >
          <FiArrowLeft className="mr-2" />
          Back to Campaigns
        </Link>
        <h1 className="text-3xl font-bold text-primary-dark">Create New Campaign</h1>
        <p className="text-gray-600 mt-2">Set up and send SMS campaign to your contacts</p>
      </div>

      <form onSubmit={handleSubmit} className="max-w-4xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Campaign Settings */}
          <div>
            <Card variant="elevated" className="p-6">
              <h3 className="text-lg font-semibold text-primary-dark mb-4">
                Campaign Settings
              </h3>

              <div className="space-y-4">
                <Input
                  label="Campaign Name *"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Spring 2025 Campaign"
                  required
                  fullWidth
                />

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Campaign Type *
                  </label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-green"
                    required
                  >
                    <option value="BLAST">Blast (Send All At Once)</option>
                    <option value="DRIP">Drip (Scheduled Sequence)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message Template *
                  </label>
                  <textarea
                    name="messageTemplate"
                    value={formData.messageTemplate}
                    onChange={handleChange}
                    placeholder="Hi {firstName}, we're interested in buying your property..."
                    rows={6}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-green"
                    required
                  />
                  <p className="mt-2 text-sm text-gray-500">
                    Use merge fields: {'{firstName}'}, {'{lastName}'}, {'{phone}'}
                  </p>
                  <p className="mt-1 text-sm text-gray-600">
                    Characters: {formData.messageTemplate.length} / 160
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Contact Selection */}
          <div>
            <Card variant="elevated" className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-primary-dark">
                  Select Recipients
                </h3>
                <button
                  type="button"
                  onClick={toggleAll}
                  className="text-sm text-primary-green hover:text-primary-blue"
                >
                  {selectedContacts.length === contacts.length ? 'Deselect All' : 'Select All'}
                </button>
              </div>

              <p className="text-sm text-gray-600 mb-4">
                Selected: {selectedContacts.length} of {contacts.length}
              </p>

              <div className="max-h-96 overflow-y-auto border border-gray-200 rounded-lg">
                {contacts.length === 0 ? (
                  <div className="p-8 text-center text-gray-500">
                    <p>No contacts found</p>
                    <Link href="/dashboard/contacts/new" className="text-primary-green hover:underline mt-2 inline-block">
                      Add contacts first
                    </Link>
                  </div>
                ) : (
                  <div className="divide-y divide-gray-200">
                    {contacts.map((contact) => (
                      <label
                        key={contact.id}
                        className="flex items-center p-3 hover:bg-gray-50 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={selectedContacts.includes(contact.id)}
                          onChange={() => toggleContact(contact.id)}
                          className="rounded border-gray-300 text-primary-green focus:ring-primary-green mr-3"
                        />
                        <div className="flex-1">
                          <div className="font-medium text-gray-900">
                            {contact.firstName || contact.lastName
                              ? `${contact.firstName || ''} ${contact.lastName || ''}`
                              : 'No Name'}
                          </div>
                          <div className="text-sm text-gray-600">
                            {contact.primaryPhone}
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            </Card>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 flex gap-4">
          <Button type="submit" variant="primary" size="lg" disabled={loading}>
            {loading ? 'Creating...' : 'Create & Send Campaign'}
          </Button>
          <Link href="/dashboard/campaigns">
            <Button type="button" variant="outline" size="lg">
              Cancel
            </Button>
          </Link>
        </div>
      </form>
    </div>
  );
}
