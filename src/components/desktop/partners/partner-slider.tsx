"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { PartnerItem } from "@/types/landing";
import styles from "./index.module.scss";

interface PartnerSliderProps {
    partners?: PartnerItem[];
}

/**
 * Client Island cho Đối tác (Partners):
 * - Nhận dữ liệu đối tác trực tiếp từ Server Component (call từ API /v1/company/public/list)
 * - Cố định hiển thị 5 logo trên một khung nhìn (Frame 13399)
 * - Mũi tên điều hướng thon gọn, thanh mảnh
 * - Track trượt mượt mà với CSS transform
 */
export default function PartnerSlider({ partners = [] }: PartnerSliderProps) {
    if (!partners || partners.length === 0) return null;

    const pageSize = 5;

    // Chia danh sách đối tác thành các trang, mỗi trang tối đa 5 logo
    const pages: PartnerItem[][] = [];
    for (let i = 0; i < partners.length; i += pageSize) {
        pages.push(partners.slice(i, i + pageSize));
    }

    const totalPages = pages.length;
    const [pageIndex, setPageIndex] = useState(0);

    const handlePrev = () => {
        setPageIndex((prev) => (prev === 0 ? totalPages - 1 : prev - 1));
    };

    const handleNext = () => {
        setPageIndex((prev) => (prev + 1) % totalPages);
    };

    // Chiều rộng mỗi trang tính theo phần trăm của track
    const pagePercentOfTrack = 100 / totalPages;
    const showNavigation = totalPages > 1;

    return (
        <div className={styles.partnersBox}>
            {/* Nút lùi bên trái: thon gọn, icon thanh mảnh */}
            {showNavigation && (
                <button
                    type="button"
                    onClick={handlePrev}
                    className={`${styles.navBtn} ${pageIndex > 0 ? styles.active : ""}`}
                    aria-label="Trang đối tác trước"
                >
                    <ArrowLeft size={18} strokeWidth={1.8} />
                </button>
            )}

            {/* Khung nhìn che phần tràn (Viewport) */}
            <div className={styles.sliderViewport}>
                <div
                    className={styles.sliderTrack}
                    style={{
                        width: `${totalPages * 100}%`,
                        transform: `translateX(-${pageIndex * pagePercentOfTrack}%)`,
                    }}
                >
                    {pages.map((page, pIdx) => (
                        <div
                            key={`page-${pIdx}`}
                            className={styles.logosPage}
                            style={{
                                width: `${pagePercentOfTrack}%`,
                            }}
                        >
                            {page.map((partner, itemIdx) => (
                                <a
                                    key={partner.id || `partner-${pIdx}-${itemIdx}`}
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
                    ))}
                </div>
            </div>

            {/* Nút tiến bên phải: thon gọn, icon thanh mảnh */}
            {showNavigation && (
                <button
                    type="button"
                    onClick={handleNext}
                    className={`${styles.navBtn} ${pageIndex === 0 ? styles.active : ""}`}
                    aria-label="Trang đối tác tiếp theo"
                >
                    <ArrowRight size={18} strokeWidth={1.8} />
                </button>
            )}
        </div>
    );
}
