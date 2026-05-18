'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { PropsWithChildren } from 'react';
import { useEffect, useState } from 'react';
import { PageViewTracker } from '@/components/PageViewTracker';
import { primaryNavItems } from '@/lib/siteNavigation';

function isActive(pathname: string, href: string) {
  if (href === '/') {
    return pathname === '/';
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteFrame({ children }: PropsWithChildren) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setMenuOpen(false);
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [menuOpen]);

  return (
    <>
      <PageViewTracker />
      <header className="topbar">
        <Link href="/" className="topbar-brand" aria-label="navyracooon portfolio home">
          navyracooon
        </Link>
        <button
          type="button"
          className="menu-toggle"
          aria-label={menuOpen ? 'ナビゲーションを閉じる' : 'ナビゲーションを開く'}
          aria-controls="site-sidebar"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </button>
      </header>

      {menuOpen ? <div className="sidebar-backdrop sidebar-backdrop-open" onClick={() => setMenuOpen(false)} /> : null}

      <div className="app-shell">
        {menuOpen ? (
          <aside id="site-sidebar" className="sidebar sidebar-open" aria-label="Primary navigation">
            <div className="sidebar-heading">
              <p className="eyebrow">Navigation</p>
              <button type="button" className="sidebar-close" onClick={() => setMenuOpen(false)} aria-label="ナビゲーションを閉じる">
                Close
              </button>
            </div>

            <nav className="site-nav" aria-label="Portfolio sections">
              {primaryNavItems.map((item) => {
                const active = !item.external && isActive(pathname, item.href);

                if (item.external) {
                  return (
                    <a
                      key={item.key}
                      href={item.href}
                      className="nav-link nav-link-external"
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${item.label} を新しいタブで開く`}
                    >
                      <span className="nav-label">{item.label}</span>
                      <span className="nav-meta">{item.short} ↗</span>
                    </a>
                  );
                }

                return (
                  <Link
                    key={item.key}
                    href={item.href}
                    className={active ? 'nav-link nav-link-active' : 'nav-link'}
                    aria-current={active ? 'page' : undefined}
                  >
                    <span className="nav-label">{item.label}</span>
                    <span className="nav-meta">{active ? 'Current' : item.short}</span>
                  </Link>
                );
              })}
            </nav>

            <p className="sidebar-note">
              3D 操作が使えない場合も、このメニューから全ページへ移動できます。
            </p>
          </aside>
        ) : null}

        <div className="content-shell">
          {children}
          <footer className="site-footer">
            <p>Internal service details, private URLs, and node lists are intentionally excluded.</p>
          </footer>
        </div>
      </div>
    </>
  );
}
