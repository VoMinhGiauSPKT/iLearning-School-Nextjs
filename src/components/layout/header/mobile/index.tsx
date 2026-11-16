"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Search, ChevronDown } from "lucide-react";
import { HeaderData } from "@/types/landing";
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
        if (href === "/" || href === "#trang-chu") {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
            window.history.pushState(null, "", "/");
        } else if (href.startsWith("#")) {
            e.preventDefault();
            const targetId = href.replace("#", "");
            setTimeout(() => {
                const element = document.getElementById(targetId);
                if (element) {
                    element.scrollIntoView({ behavior: "smooth" });
                    window.history.pushState(null, "", href);
                }
            }, 120);
        }
    };

    return (
        <>
            <header className={styles.mobileHeader}>
                <div className={styles.container}>
                    {/* Logo thương hiệu */}
                    <Link
                        href="/"
                        className={styles.logo}
                        onClick={(e) => handleNavClick(e, "/")}
                    >
                        <Image
                            src="/logo.svg"
                            alt="Logo"
                            width={36}
                            height={32}
                            priority
                        />
                        <div className={styles.brandText}>
                            <span>{header.brand.title}</span>
                            <span>{header.brand.subtitle}</span>
                        </div>
                    </Link>

                    {/* Nhóm nút bên phải: Nút Tư vấn + Nút Menu Hamburger xanh ngọc */}
                    <div className={styles.rightActions}>
                        <Link
                            href="#tu-van"
                            className={styles.consultBtn}
                            onClick={(e) => handleNavClick(e, "#tu-van")}
                        >
                            Liên hệ tư vấn
                        </Link>

                        <button
                            type="button"
                            onClick={toggleMenu}
                            className={styles.menuBtn}
                            aria-label={isMenuOpen ? "Đóng menu điều hướng" : "Mở menu điều hướng"}
                        >
                            {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
                        </button>
                    </div>
                </div>

                {/* Menu Drawer trượt xuống khi bấm nút hamburger */}
                {isMenuOpen && (
                    <div className={styles.menuDrawer}>
                        {/* Ô tìm kiếm nhanh */}
                        <div className={styles.searchBox}>
                            <Search className={styles.searchIcon} size={18} />
                            <input
                                type="text"
                                placeholder={header.searchPlaceholder}
                            />
                        </div>

                        {/* Danh sách Menu điều hướng */}
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

                        {/* Nút Đăng nhập & Đăng ký */}
                        <div className={styles.authGroup}>
                            <Link
                                href={header.loginButton.href}
                                className={styles.loginBtn}
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
                )}
            </header>
            <div className={styles.headerPlaceholder} />
        </>
    );
}
