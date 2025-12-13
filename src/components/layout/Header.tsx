'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button, Container } from '@/components/ui';
import Logo from '@/components/ui/Logo';
import { FiMenu, FiX, FiChevronDown } from 'react-icons/fi';
import clsx from 'clsx';

interface NavItem {
  label: string;
  href?: string;
  children?: { label: string; href: string }[];
}

const navItems: NavItem[] = [
  {
    label: 'Solutions',
    children: [
      { label: 'Real Estate Lead Generation', href: '/solutions/real-estate' },
      { label: 'Real Estate Wholesaler', href: '/solutions/wholesaler' },
      { label: 'Done-for-You Lead Generation', href: '/solutions/done-for-you' },
      { label: 'Sales Teams', href: '/solutions/sales-teams' },
      { label: 'Marketing Teams', href: '/solutions/marketing-teams' },
      { label: 'Customer Support', href: '/solutions/customer-support' },
    ],
  },
  {
    label: 'Product',
    children: [
      { label: 'High Deliverability', href: '/features/deliverability' },
      { label: 'Drip Campaigns', href: '/features/drip-campaigns' },
      { label: 'Multi-Market Outreach', href: '/features/multi-market' },
      { label: 'CRM Integration', href: '/features/crm-integration' },
      { label: 'Analytics', href: '/features/analytics' },
    ],
  },
  {
    label: 'Features',
    href: '/features',
  },
  {
    label: 'Resources',
    children: [
      { label: 'Blog', href: '/blog' },
      { label: 'Customer Stories', href: '/customer-stories' },
      { label: 'Partner Stories', href: '/partner-stories' },
      { label: 'Real Estate Education', href: '/education' },
    ],
  },
  {
    label: 'Pricing',
    href: '/pricing',
  },
  {
    label: 'Company',
    children: [
      { label: 'About Us', href: '/about' },
      { label: 'Contact', href: '/contact' },
      { label: 'Careers', href: '/careers' },
      { label: 'Press Room', href: '/press' },
    ],
  },
];

const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <Container>
        <nav className="flex items-center justify-between py-4">
          {/* Logo */}
          <Logo size="md" />

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <div
                key={item.label}
                className="relative group"
                onMouseEnter={() => setOpenDropdown(item.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                {item.href ? (
                  <Link
                    href={item.href}
                    className="text-gray-700 hover:text-primary-green font-medium transition-colors"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <button className="flex items-center text-gray-700 hover:text-primary-green font-medium transition-colors">
                    {item.label}
                    <FiChevronDown className="ml-1" />
                  </button>
                )}

                {/* Dropdown Menu */}
                {item.children && (
                  <div
                    className={clsx(
                      'absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg py-2 transition-all duration-200',
                      openDropdown === item.label
                        ? 'opacity-100 visible translate-y-0'
                        : 'opacity-0 invisible -translate-y-2'
                    )}
                  >
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-primary-green transition-colors"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link href="/auth/signin">
              <Button variant="outline" size="sm">
                Login
              </Button>
            </Link>
            <Link href="/auth/signup">
              <Button variant="primary" size="sm">
                Get Started
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-gray-700"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </nav>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t">
            {navItems.map((item) => (
              <div key={item.label} className="py-2">
                {item.href ? (
                  <Link
                    href={item.href}
                    className="block text-gray-700 hover:text-primary-green font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <>
                    <button
                      className="flex items-center justify-between w-full text-gray-700 font-medium"
                      onClick={() =>
                        setOpenDropdown(openDropdown === item.label ? null : item.label)
                      }
                    >
                      {item.label}
                      <FiChevronDown
                        className={clsx(
                          'transition-transform',
                          openDropdown === item.label && 'rotate-180'
                        )}
                      />
                    </button>
                    {openDropdown === item.label && item.children && (
                      <div className="pl-4 mt-2 space-y-2">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="block text-gray-600 hover:text-primary-green"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>
            ))}
            <div className="mt-4 space-y-2">
              <Link href="/auth/signin" className="block">
                <Button variant="outline" size="sm" fullWidth onClick={() => setMobileMenuOpen(false)}>
                  Login
                </Button>
              </Link>
              <Link href="/auth/signup" className="block">
                <Button variant="primary" size="sm" fullWidth onClick={() => setMobileMenuOpen(false)}>
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        )}
      </Container>
    </header>
  );
};

export default Header;
