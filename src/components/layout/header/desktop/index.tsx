"use client";

import Link from "next/link";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import SearchIcon from "@/components/ui/search-icon";
import { HeaderData } from "@/types/landing";
import { smoothScrollTo, scrollToSectionContent } from "@/lib/scroll";
import styles from "./index.module.scss";

interface DesktopHeaderProps {
    header: HeaderData;
}

export default function DesktopHeader({ header }: DesktopHeaderProps) {
    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        e.stopPropagation();

        if (href === "/" || href === "#trang-chu") {
            smoothScrollTo(0, 650, () => {
                window.history.pushState(null, "", "/");
            });
        } else if (href.startsWith("#")) {
            const targetId = href.replace("#", "");
            const element = document.getElementById(targetId);
            if (element) {
                const headerEl = document.querySelector("header");
                const headerHeight = headerEl ? headerEl.getBoundingClientRect().height : 80;

                scrollToSectionContent(element, headerHeight, 14, 650, () => {
                    window.history.pushState(null, "", href);
                });
            }
        }
    };

    return (
        <>
            <header className={styles.header}>
                <div className={styles.container}>
                    <div className={styles.leftGroup}>
                        <Link href="/" className={styles.logo} onClick={(e) => handleNavClick(e, "/")} scroll={false}>
                            <Image
                                src="/logo.svg"
                                alt="ilearning School Logo"
                                width={55}
                                height={40}
                                priority
                            />
                            <div className={styles.brandText}>
                                <span>{header.brand.title}</span>
                                <span>{header.brand.subtitle}</span>
                            </div>
                        </Link>

                        <div className={styles.searchBox}>
                            <SearchIcon className={styles.searchIcon} size="1.5rem" strokeWidth={1.5} />
                            <input
                                type="text"
                                placeholder={header.searchPlaceholder}
                            />
                        </div>
                    </div>

                    <div className={styles.rightGroup}>
                        <nav className={styles.navMenu}>
                            {header.navLinks.map((link) => (
                                <Link
                                    key={link.id}
                                    href={link.href}
                                    className={styles.navLink}
                                    onClick={(e) => handleNavClick(e, link.href)}
                                    scroll={false}
                                >
                                    <span>{link.label}</span>
                                    {link.hasDropdown && <ChevronDown size="1.1rem" />}
                                </Link>
                            ))}
                        </nav>

                        <div className={styles.divider} />

                        <Link
                            href={header.loginButton.href}
                            className={styles.loginLink}
                            onClick={(e) => handleNavClick(e, header.loginButton.href)}
                            scroll={false}
                        >
                            {header.loginButton.label}
                        </Link>

                        <Link
                            href={header.signButton.href}
                            className={styles.signBtn}
                            onClick={(e) => handleNavClick(e, header.signButton.href)}
                            scroll={false}
                        >
                            {header.signButton.label}
                        </Link>
                    </div>
                </div>
            </header>
            <div className={styles.headerPlaceholder} />
        </>
    );
}
