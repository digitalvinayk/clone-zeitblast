'use client';

import React, { useState, useEffect } from 'react';
import { Card, Button } from '@/components/ui';
import { FiPhone, FiPlus } from 'react-icons/fi';
import toast from 'react-hot-toast';

interface PhoneNumber {
  id: string;
  number: string;
  areaCode: string;
  status: string;
  healthScore: number;
  messagesSent: number;
  messagesToday: number;
  createdAt: string;
}

export default function PhoneNumbersPage() {
  const [phoneNumbers, setPhoneNumbers] = useState<PhoneNumber[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPhoneNumbers();
  }, []);

  const fetchPhoneNumbers = async () => {
    try {
      const response = await fetch('/api/phone-numbers');
      const data = await response.json();

      if (response.ok) {
        setPhoneNumbers(data.phoneNumbers || []);
      }
    } catch (error) {
      console.error('Error fetching phone numbers:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    const colors: { [key: string]: string } = {
      ACTIVE: 'bg-green-100 text-green-800',
      FLAGGED: 'bg-yellow-100 text-yellow-800',
      BLOCKED: 'bg-red-100 text-red-800',
      RELEASED: 'bg-gray-100 text-gray-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getHealthColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-primary-dark">Phone Numbers</h1>
          <p className="text-gray-600 mt-2">Manage your SMS phone number pool</p>
        </div>
        <Button variant="primary" disabled>
          <FiPlus className="mr-2" />
          Purchase Number (Coming Soon)
        </Button>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary-green border-r-transparent"></div>
        </div>
      ) : phoneNumbers.length === 0 ? (
        <Card variant="elevated" className="p-12 text-center">
          <FiPhone className="mx-auto text-gray-400 mb-4" size={48} />
          <p className="text-gray-600 mb-4">No phone numbers yet</p>
          <p className="text-sm text-gray-500">
            Add your Twilio phone number to .env to get started
          </p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {phoneNumbers.map((phone) => (
            <Card key={phone.id} variant="elevated" className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="text-2xl font-bold text-primary-dark">
                  {phone.number}
                </div>
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(phone.status)}`}>
                  {phone.status}
                </span>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Health Score:</span>
                  <span className={`font-semibold ${getHealthColor(phone.healthScore)}`}>
                    {phone.healthScore}%
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Total Sent:</span>
                  <span className="font-semibold">{phone.messagesSent}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Sent Today:</span>
                  <span className="font-semibold">{phone.messagesToday}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Area Code:</span>
                  <span className="font-semibold">{phone.areaCode}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Instructions */}
      <Card variant="bordered" className="mt-8 p-6">
        <h3 className="font-semibold text-lg text-primary-dark mb-4">
          Getting Started with Phone Numbers
        </h3>
        <div className="space-y-2 text-sm text-gray-600">
          <p>1. Create a Twilio account at <a href="https://twilio.com" target="_blank" className="text-primary-green hover:underline">twilio.com</a></p>
          <p>2. Purchase a phone number from your Twilio console</p>
          <p>3. Add your Twilio credentials to .env file:</p>
          <pre className="bg-gray-100 p-3 rounded mt-2 overflow-x-auto">
            TWILIO_ACCOUNT_SID=your_account_sid<br/>
            TWILIO_AUTH_TOKEN=your_auth_token<br/>
            TWILIO_PHONE_NUMBER=+1234567890
          </pre>
          <p className="mt-3">4. Restart your application for changes to take effect</p>
        </div>
      </Card>
    </div>
  );
}
