'use client';

import React from 'react';
import { useSession } from 'next-auth/react';
import { Card } from '@/components/ui';
import {
  FiUsers,
  FiMessageCircle,
  FiSend,
  FiTrendingUp,
} from 'react-icons/fi';

export default function DashboardPage() {
  const { data: session } = useSession();

  const stats = [
    {
      name: 'Total Contacts',
      value: '0',
      icon: FiUsers,
      change: '+0%',
      changeType: 'positive',
      color: 'text-blue-500',
      bgColor: 'bg-blue-50',
    },
    {
      name: 'Conversations',
      value: '0',
      icon: FiMessageCircle,
      change: '+0%',
      changeType: 'positive',
      color: 'text-green-500',
      bgColor: 'bg-green-50',
    },
    {
      name: 'Messages Sent',
      value: '0',
      icon: FiSend,
      change: '+0%',
      changeType: 'positive',
      color: 'text-purple-500',
      bgColor: 'bg-purple-50',
    },
    {
      name: 'Response Rate',
      value: '0%',
      icon: FiTrendingUp,
      change: '+0%',
      changeType: 'positive',
      color: 'text-orange-500',
      bgColor: 'bg-orange-50',
    },
  ];

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-primary-dark">
          Welcome back, {session?.user?.name}!
        </h1>
        <p className="text-gray-600 mt-2">
          Here's what's happening with your SMS campaigns today
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.name} variant="elevated" className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                  <p className="text-3xl font-bold text-primary-dark mt-2">
                    {stat.value}
                  </p>
                  <p className={`text-sm mt-2 ${
                    stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.change} from last month
                  </p>
                </div>
                <div className={`${stat.bgColor} p-4 rounded-lg`}>
                  <Icon className={stat.color} size={24} />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card variant="elevated" className="p-6">
          <h3 className="text-lg font-semibold text-primary-dark mb-4">
            Quick Actions
          </h3>
          <div className="space-y-3">
            <a
              href="/dashboard/contacts/new"
              className="block p-4 border border-gray-200 rounded-lg hover:border-primary-green hover:bg-green-50 transition-colors"
            >
              <div className="flex items-center">
                <FiUsers className="text-primary-green mr-3" size={20} />
                <div>
                  <div className="font-medium">Add Contacts</div>
                  <div className="text-sm text-gray-600">Import or create new contacts</div>
                </div>
              </div>
            </a>
            <a
              href="/dashboard/campaigns/new"
              className="block p-4 border border-gray-200 rounded-lg hover:border-primary-green hover:bg-green-50 transition-colors"
            >
              <div className="flex items-center">
                <FiSend className="text-primary-green mr-3" size={20} />
                <div>
                  <div className="font-medium">Create Campaign</div>
                  <div className="text-sm text-gray-600">Start a new SMS campaign</div>
                </div>
              </div>
            </a>
            <a
              href="/dashboard/conversations"
              className="block p-4 border border-gray-200 rounded-lg hover:border-primary-green hover:bg-green-50 transition-colors"
            >
              <div className="flex items-center">
                <FiMessageCircle className="text-primary-green mr-3" size={20} />
                <div>
                  <div className="font-medium">View Conversations</div>
                  <div className="text-sm text-gray-600">Check and reply to messages</div>
                </div>
              </div>
            </a>
          </div>
        </Card>

        <Card variant="elevated" className="p-6">
          <h3 className="text-lg font-semibold text-primary-dark mb-4">
            Getting Started
          </h3>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="flex-shrink-0 w-8 h-8 bg-primary-green text-white rounded-full flex items-center justify-center font-semibold">
                1
              </div>
              <div className="ml-4">
                <div className="font-medium">Set up your first phone number</div>
                <div className="text-sm text-gray-600 mt-1">
                  Purchase a local number to start sending SMS
                </div>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 w-8 h-8 bg-gray-300 text-white rounded-full flex items-center justify-center font-semibold">
                2
              </div>
              <div className="ml-4">
                <div className="font-medium">Import your contacts</div>
                <div className="text-sm text-gray-600 mt-1">
                  Upload a CSV file with your property owner list
                </div>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 w-8 h-8 bg-gray-300 text-white rounded-full flex items-center justify-center font-semibold">
                3
              </div>
              <div className="ml-4">
                <div className="font-medium">Launch your first campaign</div>
                <div className="text-sm text-gray-600 mt-1">
                  Create and send your first SMS campaign
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card variant="elevated" className="p-6">
        <h3 className="text-lg font-semibold text-primary-dark mb-4">
          Recent Activity
        </h3>
        <div className="text-center py-12">
          <FiMessageCircle className="mx-auto text-gray-400 mb-4" size={48} />
          <p className="text-gray-600">No recent activity</p>
          <p className="text-sm text-gray-500 mt-2">
            Start by creating a campaign or importing contacts
          </p>
        </div>
      </Card>
    </div>
  );
}
