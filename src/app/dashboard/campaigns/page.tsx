'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card, Button } from '@/components/ui';
import { FiPlus, FiSend, FiClock, FiCheckCircle } from 'react-icons/fi';
import toast from 'react-hot-toast';

interface Campaign {
  id: string;
  name: string;
  type: string;
  status: string;
  messageTemplate: string;
  createdAt: string;
  scheduledAt: string | null;
  createdBy: {
    name: string;
  };
  _count: {
    contacts: number;
    messages: number;
  };
}

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const fetchCampaigns = async () => {
    try {
      const response = await fetch('/api/campaigns');
      const data = await response.json();

      if (response.ok) {
        setCampaigns(data.campaigns);
      } else {
        toast.error('Failed to load campaigns');
      }
    } catch (error) {
      toast.error('Failed to load campaigns');
    } finally {
      setLoading(false);
    }
  };

  const handleSendCampaign = async (campaignId: string) => {
    if (!confirm('Are you sure you want to send this campaign?')) {
      return;
    }

    try {
      const response = await fetch(`/api/campaigns/${campaignId}/send`, {
        method: 'POST',
      });
      const data = await response.json();

      if (response.ok) {
        toast.success(
          `Campaign sent! ${data.successCount} messages sent, ${data.failCount} failed`
        );
        fetchCampaigns();
      } else {
        toast.error(data.error || 'Failed to send campaign');
      }
    } catch (error) {
      toast.error('Failed to send campaign');
    }
  };

  const getStatusBadge = (status: string) => {
    const badges: { [key: string]: { color: string; icon: React.ReactNode } } = {
      DRAFT: { color: 'bg-gray-100 text-gray-800', icon: null },
      SCHEDULED: { color: 'bg-blue-100 text-blue-800', icon: <FiClock className="inline mr-1" size={14} /> },
      ACTIVE: { color: 'bg-yellow-100 text-yellow-800', icon: <FiSend className="inline mr-1" size={14} /> },
      COMPLETED: { color: 'bg-green-100 text-green-800', icon: <FiCheckCircle className="inline mr-1" size={14} /> },
      PAUSED: { color: 'bg-orange-100 text-orange-800', icon: null },
      CANCELLED: { color: 'bg-red-100 text-red-800', icon: null },
    };

    const badge = badges[status] || badges.DRAFT;

    return (
      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${badge.color}`}>
        {badge.icon}
        {status}
      </span>
    );
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-primary-dark">Campaigns</h1>
          <p className="text-gray-600 mt-2">Create and manage SMS campaigns</p>
        </div>
        <Link href="/dashboard/campaigns/new">
          <Button variant="primary">
            <FiPlus className="mr-2" />
            Create Campaign
          </Button>
        </Link>
      </div>

      {/* Campaigns Grid */}
      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary-green border-r-transparent"></div>
          <p className="mt-4 text-gray-600">Loading campaigns...</p>
        </div>
      ) : campaigns.length === 0 ? (
        <Card variant="elevated" className="p-12 text-center">
          <FiSend className="mx-auto text-gray-400 mb-4" size={48} />
          <p className="text-gray-600 mb-4">No campaigns yet</p>
          <Link href="/dashboard/campaigns/new">
            <Button variant="primary">Create Your First Campaign</Button>
          </Link>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {campaigns.map((campaign) => (
            <Card key={campaign.id} variant="elevated" className="p-6">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-lg font-semibold text-primary-dark">
                  {campaign.name}
                </h3>
                {getStatusBadge(campaign.status)}
              </div>

              <div className="space-y-2 mb-4 text-sm text-gray-600">
                <div className="flex items-center justify-between">
                  <span>Type:</span>
                  <span className="font-medium">{campaign.type}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Contacts:</span>
                  <span className="font-medium">{campaign._count.contacts}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Messages Sent:</span>
                  <span className="font-medium">{campaign._count.messages}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Created by:</span>
                  <span className="font-medium">{campaign.createdBy.name}</span>
                </div>
              </div>

              <div className="border-t pt-4 mt-4">
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                  {campaign.messageTemplate}
                </p>

                {campaign.status === 'DRAFT' && (
                  <Button
                    variant="primary"
                    size="sm"
                    fullWidth
                    onClick={() => handleSendCampaign(campaign.id)}
                  >
                    <FiSend className="mr-2" size={14} />
                    Send Campaign
                  </Button>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
