"use client";

import Link from "next/link";
import Image from "next/image";
import { Search, ChevronDown } from "lucide-react";
import { HeaderData } from "@/types/landing";
import styles from "./index.module.scss";

interface DesktopHeaderProps {
    header: HeaderData;
}

export default function DesktopHeader({ header }: DesktopHeaderProps) {
    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        if (href === "/" || href === "#trang-chu") {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
            window.history.pushState(null, "", "/");
        } else if (href.startsWith("#")) {
            e.preventDefault();
            const targetId = href.replace("#", "");
            const element = document.getElementById(targetId);
            if (element) {
                element.scrollIntoView({ behavior: "smooth" });
                window.history.pushState(null, "", href);
            }
        }
    };

    return (
        <>
            <header className={styles.header}>
                <div className={styles.container}>
                    {/* Khối Trái: Logo & Search */}
                    <div className={styles.leftGroup}>
                        <Link href="/" className={styles.logo} onClick={(e) => handleNavClick(e, "/")}>
                            <Image
                                src="/logo.svg"
                                alt="ilearning School Logo"
                                width={48}
                                height={43}
                                priority
                            />
                            <div className={styles.brandText}>
                                <span>{header.brand.title}</span>
                                <span>{header.brand.subtitle}</span>
                            </div>
                        </Link>

                        <div className={styles.searchBox}>
                            <Search className={styles.searchIcon} />
                            <input
                                type="text"
                                placeholder={header.searchPlaceholder}
                            />
                        </div>
                    </div>

                    {/* Khối Phải: Menu Links + Divider + Log In + SIGN */}
                    <div className={styles.rightGroup}>
                        <nav className={styles.navMenu}>
                            {header.navLinks.map((link) => (
                                <Link
                                    key={link.id}
                                    href={link.href}
                                    className={styles.navLink}
                                    onClick={(e) => handleNavClick(e, link.href)}
                                >
                                    <span>{link.label}</span>
                                    {link.hasDropdown && <ChevronDown size={16} />}
                                </Link>
                            ))}
                        </nav>

                        <div className={styles.divider} />

                        <Link
                            href={header.loginButton.href}
                            className={styles.loginLink}
                            onClick={(e) => handleNavClick(e, header.loginButton.href)}
                        >
                            {header.loginButton.label}
                        </Link>

                        <Link
                            href={header.signButton.href}
                            className={styles.signBtn}
                            onClick={(e) => handleNavClick(e, header.signButton.href)}
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
