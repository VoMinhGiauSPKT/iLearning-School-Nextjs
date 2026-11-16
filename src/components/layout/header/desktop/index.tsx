import Link from "next/link";
import Image from "next/image";
import { Search, ChevronDown } from "lucide-react";
import { HeaderData } from "@/types/landing";
import styles from "./index.module.scss";

interface DesktopHeaderProps {
    header: HeaderData;
}

export default function DesktopHeader({ header }: DesktopHeaderProps) {
    return (
        <header className={styles.header}>
            <div className={styles.container}>
                {/* Khối Trái: Logo & Search */}
                <div className={styles.leftGroup}>
                    <Link href="/" className={styles.logo}>
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
                            <Link key={link.id} href={link.href} className={styles.navLink}>
                                <span>{link.label}</span>
                                {link.hasDropdown && <ChevronDown size={16} />}
                            </Link>
                        ))}
                    </nav>

                    <div className={styles.divider} />

                    <Link href={header.loginButton.href} className={styles.loginLink}>
                        {header.loginButton.label}
                    </Link>

                    <Link href={header.signButton.href} className={styles.signBtn}>
                        {header.signButton.label}
                    </Link>
                </div>
            </div>
        </header>
    );
}
