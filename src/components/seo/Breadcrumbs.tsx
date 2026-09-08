import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { APP_CONFIG } from '../../config';

export interface BreadcrumbCrumb {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbCrumb[];
  onNavigate?: (href: string) => void;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, onNavigate }) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href?: string) => {
    if (!href) return;
    if (onNavigate) {
      e.preventDefault();
      onNavigate(href);
    }
  };

  const breadcrumbsSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: `${APP_CONFIG.siteUrl}/`,
      },
      ...items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 2,
        name: item.label,
        item: item.href ? `${APP_CONFIG.siteUrl}${item.href}` : undefined,
      })),
    ],
  };

  return (
    <nav className="breadcrumbs-nav" aria-label="Breadcrumb">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsSchema) }}
      />
      <ol className="breadcrumbs-list">
        <li className="breadcrumb-item">
          <a
            href="/"
            onClick={(e) => handleClick(e, '/')}
            className="breadcrumb-link home-link"
            aria-label="MediaGrabs Home"
          >
            <Home size={14} />
            <span>Home</span>
          </a>
        </li>

        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={index} className="breadcrumb-item">
              <ChevronRight size={13} className="breadcrumb-separator" aria-hidden="true" />
              {isLast || !item.href ? (
                <span className="breadcrumb-current" aria-current="page">
                  {item.label}
                </span>
              ) : (
                <a
                  href={item.href}
                  onClick={(e) => handleClick(e, item.href)}
                  className="breadcrumb-link"
                >
                  {item.label}
                </a>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
