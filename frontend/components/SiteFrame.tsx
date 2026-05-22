"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { PropsWithChildren } from "react";
import { useEffect, useState } from "react";
import { PageViewTracker } from "@/components/PageViewTracker";
import { primaryNavItems } from "@/lib/siteNavigation";
import styles from "./SiteFrame.module.css";

function isActive(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
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
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [menuOpen]);

  return (
    <>
      <PageViewTracker />
      <header className={styles.topbar}>
        <Link href="/" className={styles.topbarBrand} aria-label="navyracooon portfolio home">
          navyracooon
        </Link>
        <button
          type="button"
          className={styles.menuToggle}
          aria-label={menuOpen ? "ナビゲーションを閉じる" : "ナビゲーションを開く"}
          aria-controls="site-sidebar"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </button>
      </header>

      {menuOpen ? <div className={styles.sidebarBackdrop} onClick={() => setMenuOpen(false)} /> : null}

      <div className={styles.appShell}>
        {menuOpen ? (
          <aside id="site-sidebar" className={styles.sidebar} aria-label="Primary navigation">
            <div className={styles.sidebarHeading}>
              <p className="eyebrow">Navigation</p>
              <button
                type="button"
                className={styles.sidebarClose}
                onClick={() => setMenuOpen(false)}
                aria-label="ナビゲーションを閉じる"
              >
                Close
              </button>
            </div>

            <nav className={styles.siteNav} aria-label="Portfolio sections">
              {primaryNavItems.map((item) => {
                const active = !item.external && isActive(pathname, item.href);

                if (item.external) {
                  return (
                    <a
                      key={item.key}
                      href={item.href}
                      className={`${styles.navLink} ${styles.navLinkExternal}`}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${item.label} を新しいタブで開く`}
                    >
                      <span className={styles.navLabel}>{item.label}</span>
                      <span className={styles.navMeta}>{item.short} ↗</span>
                    </a>
                  );
                }

                return (
                  <Link
                    key={item.key}
                    href={item.href}
                    className={active ? `${styles.navLink} ${styles.navLinkActive}` : styles.navLink}
                    aria-current={active ? "page" : undefined}
                  >
                    <span className={styles.navLabel}>{item.label}</span>
                    <span className={styles.navMeta}>{active ? "Current" : item.short}</span>
                  </Link>
                );
              })}
            </nav>

            <p className={styles.sidebarNote}>3D 操作が使えない場合も、このメニューから全ページへ移動できます。</p>
          </aside>
        ) : null}

        <div className={styles.contentShell}>
          {children}
          <footer className={styles.siteFooter}>
            <p>Internal service details, private URLs, and node lists are intentionally excluded.</p>
          </footer>
        </div>
      </div>
    </>
  );
}
