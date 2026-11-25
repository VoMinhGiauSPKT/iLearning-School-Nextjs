"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import SearchIcon from "@/components/ui/search-icon";
import { HeaderData } from "@/types/landing";
import { smoothScrollTo, scrollToSectionContent } from "@/lib/scroll";
import styles from "./index.module.scss";

interface MobileHeaderProps {
    header: HeaderData;
}

export default function MobileHeader({ header }: MobileHeaderProps) {
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

    const toggleMenu = () => {
        setIsMenuOpen((prev) => !prev);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        closeMenu();
        e.preventDefault();
        e.stopPropagation();

        if (href === "/" || href === "#trang-chu") {
            smoothScrollTo(0, 650, () => {
                window.history.pushState(null, "", "/");
            });
        } else if (href.startsWith("#")) {
            const targetId = href.replace("#", "");
            setTimeout(() => {
                const element = document.getElementById(targetId);
                if (element) {
                    const containerEl = document.querySelector(`.${styles.container}`);
                    const headerHeight = containerEl ? containerEl.getBoundingClientRect().height : 60;
                    scrollToSectionContent(element, headerHeight, 14, 650, () => {
                        window.history.pushState(null, "", href);
                    });
                }
            }, 50);
        }
    };

    const mobileAllowedLabels = ["Trang chủ", "Khoá học", "Giới thiệu"];
    const mobileNavLinks = header.navLinks.filter((link) =>
        mobileAllowedLabels.includes(link.label)
    );

    return (
        <>
            <header className={styles.mobileHeader}>
                <div className={styles.container}>
                    <Link
                        href="/"
                        className={styles.logo}
                        onClick={(e) => handleNavClick(e, "/")}
                        scroll={false}
                    >
                        <Image
                            src="/logo.svg"
                            alt="Logo"
                            width={48}
                            height={42}
                            className={styles.logoImg}
                            priority
                        />
                        <div className={styles.brandText}>
                            <span>{header.brand.title}</span>
                            <span>{header.brand.subtitle}</span>
                        </div>
                    </Link>

                    <div className={styles.rightActions}>
                        <Link
                            href="#tu-van"
                            className={styles.consultBtn}
                            onClick={(e) => handleNavClick(e, "#tu-van")}
                            scroll={false}
                        >
                            Liên hệ tư vấn
                        </Link>

                        <button
                            type="button"
                            onClick={toggleMenu}
                            className={styles.menuBtn}
                            aria-label={isMenuOpen ? "Đóng menu điều hướng" : "Mở menu điều hướng"}
                        >
                            {isMenuOpen ? (
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path
                                        d="M4 4L16 16"
                                        stroke="#FFFFFF"
                                        strokeWidth="2.4"
                                        strokeLinecap="round"
                                    />
                                    <path
                                        d="M16 4L4 16"
                                        stroke="#FFFFFF"
                                        strokeWidth="2.4"
                                        strokeLinecap="round"
                                    />
                                </svg>
                            ) : (
                                <svg width="23" height="23" viewBox="0 0 23 23" fill="none">
                                    <path
                                        d="M2.5 5H20.5"
                                        stroke="#FFFFFF"
                                        strokeWidth="2.4"
                                        strokeLinecap="round"
                                    />
                                    <path
                                        d="M2.5 11.5H20.5"
                                        stroke="#FFFFFF"
                                        strokeWidth="2.4"
                                        strokeLinecap="round"
                                    />
                                    <path
                                        d="M2.5 18H20.5"
                                        stroke="#FFFFFF"
                                        strokeWidth="2.4"
                                        strokeLinecap="round"
                                    />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>

                {isMenuOpen && (
                    <div className={styles.menuDrawer}>
                        <div className={styles.searchBox}>
                            <SearchIcon className={styles.searchIcon} size={18} strokeWidth={1.5} />
                            <input
                                type="text"
                                placeholder={header.searchPlaceholder}
                            />
                        </div>

                        <nav className={styles.navMenu}>
                            {mobileNavLinks.map((link) => (
                                <Link
                                    key={link.id}
                                    href={link.href}
                                    className={styles.navLink}
                                    onClick={(e) => handleNavClick(e, link.href)}
                                    scroll={false}
                                >
                                    <span>{link.label}</span>
                                    {link.hasDropdown && <ChevronDown size={18} />}
                                </Link>
                            ))}
                        </nav>
                    </div>
                )}
            </header>
            <div className={styles.headerPlaceholder} />
        </>
    );
}
