import React from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui';
import Logo from '@/components/ui/Logo';
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaYoutube,
  FaApple,
  FaGooglePlay,
} from 'react-icons/fa';

interface FooterLink {
  label: string;
  href: string;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

const footerSections: FooterSection[] = [
  {
    title: 'Solutions',
    links: [
      { label: 'Real Estate Lead Generation', href: '/solutions/real-estate' },
      { label: 'Real Estate Wholesaler', href: '/solutions/wholesaler' },
      { label: 'Done-for-You Lead Generation', href: '/solutions/done-for-you' },
      { label: 'Sales Teams', href: '/solutions/sales-teams' },
      { label: 'Marketing Teams', href: '/solutions/marketing-teams' },
      { label: 'Customer Support', href: '/solutions/customer-support' },
    ],
  },
  {
    title: 'Product Features',
    links: [
      { label: 'High Deliverability', href: '/features/deliverability' },
      { label: 'Drip Campaigns', href: '/features/drip-campaigns' },
      { label: 'Multi-Market Outreach', href: '/features/multi-market' },
      { label: 'Quick Replies', href: '/features/quick-replies' },
      { label: 'Custom Tagging', href: '/features/tagging' },
      { label: 'Number Validation', href: '/features/validation' },
      { label: 'CRM Integration', href: '/features/crm-integration' },
      { label: 'Analytics', href: '/features/analytics' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Blog', href: '/blog' },
      { label: 'Customer Stories', href: '/customer-stories' },
      { label: 'Partner Stories', href: '/partner-stories' },
      { label: 'Real Estate Education', href: '/education' },
      { label: 'Glossary', href: '/glossary' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'Contact', href: '/contact' },
      { label: 'Careers', href: '/careers' },
      { label: 'Press Room', href: '/press' },
      { label: 'Uptime Status', href: '/status' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Security', href: '/security' },
      { label: 'Terms of Service', href: '/terms' },
      { label: 'Sitemap', href: '/sitemap' },
    ],
  },
];

const socialLinks = [
  { icon: FaFacebookF, href: 'https://facebook.com', label: 'Facebook' },
  { icon: FaTwitter, href: 'https://twitter.com', label: 'Twitter' },
  { icon: FaLinkedinIn, href: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: FaInstagram, href: 'https://instagram.com', label: 'Instagram' },
  { icon: FaYoutube, href: 'https://youtube.com', label: 'YouTube' },
];

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary-dark text-white">
      <Container className="py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Logo and Description */}
          <div className="lg:col-span-2">
            <div className="mb-4">
              <Logo variant="white" size="md" />
            </div>
            <p className="text-gray-300 mb-6 max-w-sm">
              Intelligent SMS marketing platform to generate leads and close more deals through powerful text message campaigns.
            </p>

            {/* Social Media Links */}
            <div className="flex space-x-4 mb-6">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-white bg-opacity-10 rounded-full flex items-center justify-center hover:bg-primary-green transition-colors"
                    aria-label={social.label}
                  >
                    <Icon className="text-white" size={18} />
                  </a>
                );
              })}
            </div>

            {/* App Store Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="#"
                className="flex items-center space-x-2 bg-white bg-opacity-10 hover:bg-opacity-20 px-4 py-2 rounded-lg transition-colors"
              >
                <FaApple size={24} />
                <div className="text-left">
                  <div className="text-xs">Download on the</div>
                  <div className="text-sm font-semibold">App Store</div>
                </div>
              </a>
              <a
                href="#"
                className="flex items-center space-x-2 bg-white bg-opacity-10 hover:bg-opacity-20 px-4 py-2 rounded-lg transition-colors"
              >
                <FaGooglePlay size={24} />
                <div className="text-left">
                  <div className="text-xs">GET IT ON</div>
                  <div className="text-sm font-semibold">Google Play</div>
                </div>
              </a>
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold text-lg mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-gray-300 hover:text-primary-green transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white border-opacity-10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-300 text-sm">
            © {currentYear} Intello Blast. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link
              href="/privacy"
              className="text-gray-300 hover:text-primary-green text-sm transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-gray-300 hover:text-primary-green text-sm transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              href="/cookies"
              className="text-gray-300 hover:text-primary-green text-sm transition-colors"
            >
              Cookie Preferences
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
