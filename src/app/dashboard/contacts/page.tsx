'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card, Button } from '@/components/ui';
import { FiPlus, FiSearch, FiEdit, FiTrash2, FiUser } from 'react-icons/fi';
import toast from 'react-hot-toast';

interface Contact {
  id: string;
  firstName: string | null;
  lastName: string | null;
  primaryPhone: string;
  status: string;
  createdAt: string;
  assignedTo: {
    name: string;
  } | null;
  properties: Array<{
    address: string;
    city: string;
    state: string;
  }>;
}

export default function ContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  useEffect(() => {
    fetchContacts();
  }, [search, statusFilter]);

  const fetchContacts = async () => {
    try {
      const params = new URLSearchParams();
      if (search) params.append('search', search);
      if (statusFilter) params.append('status', statusFilter);

      const response = await fetch(`/api/contacts?${params.toString()}`);
      const data = await response.json();

      if (response.ok) {
        setContacts(data.contacts);
      } else {
        toast.error('Failed to load contacts');
      }
    } catch (error) {
      toast.error('Failed to load contacts');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this contact?')) {
      return;
    }

    try {
      const response = await fetch(`/api/contacts/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        toast.success('Contact deleted successfully');
        fetchContacts();
      } else {
        toast.error('Failed to delete contact');
      }
    } catch (error) {
      toast.error('Failed to delete contact');
    }
  };

  const getStatusColor = (status: string) => {
    const colors: { [key: string]: string } = {
      NEW: 'bg-blue-100 text-blue-800',
      CONTACTED: 'bg-yellow-100 text-yellow-800',
      INTERESTED: 'bg-purple-100 text-purple-800',
      HOT: 'bg-red-100 text-red-800',
      UNDER_CONTRACT: 'bg-green-100 text-green-800',
      CLOSED: 'bg-gray-100 text-gray-800',
      DEAD: 'bg-gray-100 text-gray-600',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-primary-dark">Contacts</h1>
          <p className="text-gray-600 mt-2">Manage your contact database</p>
        </div>
        <Link href="/dashboard/contacts/new">
          <Button variant="primary">
            <FiPlus className="mr-2" />
            Add Contact
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <Card variant="elevated" className="p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search contacts..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-green"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-green"
          >
            <option value="">All Statuses</option>
            <option value="NEW">New</option>
            <option value="CONTACTED">Contacted</option>
            <option value="INTERESTED">Interested</option>
            <option value="HOT">Hot</option>
            <option value="UNDER_CONTRACT">Under Contract</option>
            <option value="CLOSED">Closed</option>
            <option value="DEAD">Dead</option>
          </select>
          <Link href="/dashboard/contacts/import">
            <Button variant="outline" fullWidth>
              Import Contacts
            </Button>
          </Link>
        </div>
      </Card>

      {/* Contacts Table */}
      <Card variant="elevated">
        {loading ? (
          <div className="p-12 text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary-green border-r-transparent"></div>
            <p className="mt-4 text-gray-600">Loading contacts...</p>
          </div>
        ) : contacts.length === 0 ? (
          <div className="p-12 text-center">
            <FiUser className="mx-auto text-gray-400 mb-4" size={48} />
            <p className="text-gray-600 mb-4">No contacts found</p>
            <Link href="/dashboard/contacts/new">
              <Button variant="primary">Add Your First Contact</Button>
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Phone
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Property
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Assigned To
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {contacts.map((contact) => (
                  <tr key={contact.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">
                        {contact.firstName || contact.lastName
                          ? `${contact.firstName || ''} ${contact.lastName || ''}`
                          : 'No Name'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {contact.primaryPhone}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {contact.properties[0]
                        ? `${contact.properties[0].address}, ${contact.properties[0].city}, ${contact.properties[0].state}`
                        : '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                          contact.status
                        )}`}
                      >
                        {contact.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {contact.assignedTo?.name || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link
                        href={`/dashboard/contacts/${contact.id}`}
                        className="text-primary-green hover:text-primary-blue mr-3"
                      >
                        <FiEdit className="inline" size={16} />
                      </Link>
                      <button
                        onClick={() => handleDelete(contact.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <FiTrash2 className="inline" size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {/* Stats */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card variant="bordered" className="p-4">
          <div className="text-sm text-gray-600">Total Contacts</div>
          <div className="text-2xl font-bold text-primary-dark mt-1">
            {contacts.length}
          </div>
        </Card>
        <Card variant="bordered" className="p-4">
          <div className="text-sm text-gray-600">New</div>
          <div className="text-2xl font-bold text-blue-600 mt-1">
            {contacts.filter((c) => c.status === 'NEW').length}
          </div>
        </Card>
        <Card variant="bordered" className="p-4">
          <div className="text-sm text-gray-600">Hot Leads</div>
          <div className="text-2xl font-bold text-red-600 mt-1">
            {contacts.filter((c) => c.status === 'HOT').length}
          </div>
        </Card>
        <Card variant="bordered" className="p-4">
          <div className="text-sm text-gray-600">Under Contract</div>
          <div className="text-2xl font-bold text-green-600 mt-1">
            {contacts.filter((c) => c.status === 'UNDER_CONTRACT').length}
          </div>
        </Card>
      </div>
    </div>
  );
}
