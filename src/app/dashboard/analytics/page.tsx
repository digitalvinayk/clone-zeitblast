'use client';

import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui';
import { FiMessageCircle, FiSend, FiUsers, FiTrendingUp } from 'react-icons/fi';

interface Stats {
  totalContacts: number;
  totalMessages: number;
  totalConversations: number;
  averageResponseRate: number;
  messagesByStatus: { [key: string]: number };
  contactsByStatus: { [key: string]: number };
}

export default function AnalyticsPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const response = await fetch('/api/analytics');
      const data = await response.json();

      if (response.ok) {
        setStats(data.stats);
      }
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-8">
        <div className="text-center py-12">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary-green border-r-transparent"></div>
          <p className="mt-4 text-gray-600">Loading analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-primary-dark mb-8">Analytics</h1>

      {/* Main Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card variant="elevated" className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Contacts</p>
              <p className="text-3xl font-bold text-primary-dark mt-2">
                {stats?.totalContacts || 0}
              </p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <FiUsers className="text-blue-500" size={24} />
            </div>
          </div>
        </Card>

        <Card variant="elevated" className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Messages Sent</p>
              <p className="text-3xl font-bold text-primary-dark mt-2">
                {stats?.totalMessages || 0}
              </p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <FiSend className="text-green-500" size={24} />
            </div>
          </div>
        </Card>

        <Card variant="elevated" className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Conversations</p>
              <p className="text-3xl font-bold text-primary-dark mt-2">
                {stats?.totalConversations || 0}
              </p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <FiMessageCircle className="text-purple-500" size={24} />
            </div>
          </div>
        </Card>

        <Card variant="elevated" className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Response Rate</p>
              <p className="text-3xl font-bold text-primary-dark mt-2">
                {stats?.averageResponseRate || 0}%
              </p>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg">
              <FiTrendingUp className="text-orange-500" size={24} />
            </div>
          </div>
        </Card>
      </div>

      {/* Contact Status Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card variant="elevated" className="p-6">
          <h3 className="text-lg font-semibold text-primary-dark mb-4">
            Contacts by Status
          </h3>
          <div className="space-y-3">
            {stats?.contactsByStatus && Object.entries(stats.contactsByStatus).map(([status, count]) => (
              <div key={status} className="flex items-center justify-between">
                <span className="text-gray-700">{status}</span>
                <span className="font-semibold text-primary-dark">{count}</span>
              </div>
            ))}
            {(!stats?.contactsByStatus || Object.keys(stats.contactsByStatus).length === 0) && (
              <p className="text-gray-500 text-center py-4">No data available</p>
            )}
          </div>
        </Card>

        <Card variant="elevated" className="p-6">
          <h3 className="text-lg font-semibold text-primary-dark mb-4">
            Messages by Status
          </h3>
          <div className="space-y-3">
            {stats?.messagesByStatus && Object.entries(stats.messagesByStatus).map(([status, count]) => (
              <div key={status} className="flex items-center justify-between">
                <span className="text-gray-700">{status}</span>
                <span className="font-semibold text-primary-dark">{count}</span>
              </div>
            ))}
            {(!stats?.messagesByStatus || Object.keys(stats.messagesByStatus).length === 0) && (
              <p className="text-gray-500 text-center py-4">No data available</p>
            )}
          </div>
        </Card>
      </div>

      {/* Campaign Performance */}
      <Card variant="elevated" className="p-6">
        <h3 className="text-lg font-semibold text-primary-dark mb-4">
          Campaign Performance
        </h3>
        <p className="text-gray-500 text-center py-12">
          Campaign analytics will appear here after you send campaigns
        </p>
      </Card>
    </div>
  );
}
