'use client';

import React, { useState, useEffect } from 'react';
import { Card, Button, Input } from '@/components/ui';
import { FiMessageCircle, FiSend } from 'react-icons/fi';
import toast from 'react-hot-toast';

interface Message {
  id: string;
  content: string;
  direction: string;
  createdAt: string;
  status: string;
}

interface Conversation {
  id: string;
  lastMessageAt: string | null;
  lastMessagePreview: string | null;
  unreadCount: number;
  status: string;
  contact: {
    id: string;
    firstName: string | null;
    lastName: string | null;
    primaryPhone: string;
  };
  phoneNumber: {
    number: string;
  };
  messages: Message[];
}

export default function ConversationsPage() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    fetchConversations();
  }, []);

  const fetchConversations = async () => {
    try {
      const response = await fetch('/api/conversations');
      const data = await response.json();

      if (response.ok) {
        setConversations(data.conversations || []);
        if (data.conversations && data.conversations.length > 0 && !selectedConversation) {
          setSelectedConversation(data.conversations[0]);
        }
      }
    } catch (error) {
      console.error('Error fetching conversations:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedConversation || !newMessage.trim()) {
      return;
    }

    setSending(true);

    try {
      const response = await fetch('/api/sms/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: selectedConversation.contact.primaryPhone,
          message: newMessage,
          contactId: selectedConversation.contact.id,
          fromNumberId: selectedConversation.phoneNumber.number,
        }),
      });

      if (response.ok) {
        setNewMessage('');
        toast.success('Message sent!');
        fetchConversations();
      } else {
        toast.error('Failed to send message');
      }
    } catch (error) {
      toast.error('Failed to send message');
    } finally {
      setSending(false);
    }
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-primary-dark mb-8">Conversations</h1>

      <div className="grid grid-cols-12 gap-6 h-[calc(100vh-200px)]">
        {/* Conversation List */}
        <div className="col-span-4">
          <Card variant="elevated" className="h-full overflow-hidden flex flex-col">
            <div className="p-4 border-b">
              <Input
                placeholder="Search conversations..."
                fullWidth
              />
            </div>

            <div className="flex-1 overflow-y-auto">
              {loading ? (
                <div className="p-8 text-center">
                  <div className="inline-block h-6 w-6 animate-spin rounded-full border-4 border-solid border-primary-green border-r-transparent"></div>
                </div>
              ) : conversations.length === 0 ? (
                <div className="p-8 text-center">
                  <FiMessageCircle className="mx-auto text-gray-400 mb-4" size={48} />
                  <p className="text-gray-600">No conversations yet</p>
                  <p className="text-sm text-gray-500 mt-2">
                    Start a campaign to begin conversations
                  </p>
                </div>
              ) : (
                conversations.map((conv) => (
                  <div
                    key={conv.id}
                    onClick={() => setSelectedConversation(conv)}
                    className={`p-4 border-b cursor-pointer hover:bg-gray-50 ${
                      selectedConversation?.id === conv.id ? 'bg-blue-50' : ''
                    }`}
                  >
                    <div className="flex items-start justify-between mb-1">
                      <div className="font-semibold text-gray-900">
                        {conv.contact.firstName || conv.contact.lastName
                          ? `${conv.contact.firstName || ''} ${conv.contact.lastName || ''}`
                          : conv.contact.primaryPhone}
                      </div>
                      {conv.unreadCount > 0 && (
                        <span className="bg-primary-green text-white text-xs px-2 py-1 rounded-full">
                          {conv.unreadCount}
                        </span>
                      )}
                    </div>
                    <div className="text-sm text-gray-600 truncate">
                      {conv.lastMessagePreview || 'No messages'}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {conv.lastMessageAt
                        ? new Date(conv.lastMessageAt).toLocaleDateString()
                        : ''}
                    </div>
                  </div>
                ))
              )}
            </div>
          </Card>
        </div>

        {/* Message Thread */}
        <div className="col-span-8">
          <Card variant="elevated" className="h-full flex flex-col">
            {selectedConversation ? (
              <>
                {/* Header */}
                <div className="p-4 border-b">
                  <div className="font-semibold text-lg text-gray-900">
                    {selectedConversation.contact.firstName || selectedConversation.contact.lastName
                      ? `${selectedConversation.contact.firstName || ''} ${selectedConversation.contact.lastName || ''}`
                      : 'Unknown'}
                  </div>
                  <div className="text-sm text-gray-600">
                    {selectedConversation.contact.primaryPhone}
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {selectedConversation.messages.length === 0 ? (
                    <div className="text-center text-gray-500 py-12">
                      No messages yet
                    </div>
                  ) : (
                    selectedConversation.messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${
                          message.direction === 'OUTBOUND' ? 'justify-end' : 'justify-start'
                        }`}
                      >
                        <div
                          className={`max-w-[70%] rounded-lg px-4 py-2 ${
                            message.direction === 'OUTBOUND'
                              ? 'bg-primary-green text-white'
                              : 'bg-gray-100 text-gray-900'
                          }`}
                        >
                          <div>{message.content}</div>
                          <div
                            className={`text-xs mt-1 ${
                              message.direction === 'OUTBOUND'
                                ? 'text-green-100'
                                : 'text-gray-500'
                            }`}
                          >
                            {formatTime(message.createdAt)} • {message.status}
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Message Input */}
                <form onSubmit={handleSendMessage} className="p-4 border-t">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Type your message..."
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-green"
                      disabled={sending}
                    />
                    <Button type="submit" variant="primary" disabled={sending || !newMessage.trim()}>
                      <FiSend />
                    </Button>
                  </div>
                  <div className="text-xs text-gray-500 mt-2">
                    {newMessage.length} / 160 characters
                  </div>
                </form>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-gray-500">
                <div className="text-center">
                  <FiMessageCircle className="mx-auto mb-4" size={64} />
                  <p>Select a conversation to start messaging</p>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
