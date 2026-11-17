"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { PartnerItem } from "@/types/landing";
import styles from "./index.module.scss";

interface PartnerSliderProps {
    partners: PartnerItem[];
}

/**
 * Client Island cho Partners:
 * - Cố định hiển thị đúng 5 logo cho một lần xem
 * - Cặp nút điều hướng hình tròn với mũi tên ngang ← và → chuẩn Figma
 */
export default function PartnerSlider({ partners }: PartnerSliderProps) {
    const [pageIndex, setPageIndex] = useState(0);

    const pageSize = 5;
    const totalPages = Math.ceil(partners.length / pageSize) || 1;

    const handlePrev = () => {
        setPageIndex((prev) => (prev === 0 ? totalPages - 1 : prev - 1));
    };

    const handleNext = () => {
        setPageIndex((prev) => (prev === totalPages - 1 ? 0 : prev + 1));
    };

    // Lấy đúng 5 logo cho trang hiện tại
    const currentPartners = partners.slice(
        pageIndex * pageSize,
        pageIndex * pageSize + pageSize
    );

    // Đảm bảo đủ 5 logo nếu có từ 5 logo trở lên
    const displayPartners =
        currentPartners.length < pageSize && partners.length >= pageSize
            ? [...currentPartners, ...partners.slice(0, pageSize - currentPartners.length)]
            : currentPartners;

    return (
        <div className={styles.partnersBox}>
            {/* Nút lùi bên trái: Surface #202428, Icon mũi tên ← chuẩn Figma */}
            <button
                type="button"
                onClick={handlePrev}
                className={styles.prevBtn}
                aria-label="Previous partners"
            >
                <ArrowLeft size={24} strokeWidth={2.5} />
            </button>

            {/* Dải 5 logo cố định (Frame 13399) */}
            <div className={styles.logosTrack}>
                {displayPartners.map((partner, index) => (
                    <a
                        key={`${partner.id}-${index}`}
                        href={partner.href || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.partnerItem}
                    >
                        <img
                            src={partner.logo}
                            alt={partner.name}
                            className={styles.logoImg}
                        />
                    </a>
                ))}
            </div>

            {/* Nút tiến bên phải: Surface #15CCA3, Icon mũi tên → chuẩn Figma */}
            <button
                type="button"
                onClick={handleNext}
                className={styles.nextBtn}
                aria-label="Next partners"
            >
                <ArrowRight size={24} strokeWidth={2.5} />
            </button>
        </div>
    );
}
