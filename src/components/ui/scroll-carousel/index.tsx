"use client";

import { useRef, ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import styles from "./index.module.scss";

interface ScrollCarouselProps {
    children: ReactNode;         // Nội dung render từ Server Component truyền vào
    className?: string;          // Class tuỳ biến cho khung bọc ngoài
    trackClassName?: string;     // Class tuỳ biến cho dải trượt bên trong
    scrollStep?: number;         // Khoảng cách cuộn cố định (tuỳ chọn)
    prevAriaLabel?: string;
    nextAriaLabel?: string;
}

/**
 * Reusable Client Island:
 * Điều khiển trượt ngang cho mọi danh sách (Logo Đối tác, Đánh giá học viên,...)
 * Nội dung con (children) được Server Component render trước thành HTML!
 */
export default function ScrollCarousel({
    children,
    className = "",
    trackClassName = "",
    scrollStep,
    prevAriaLabel = "Previous",
    nextAriaLabel = "Next",
}: ScrollCarouselProps) {
    const trackRef = useRef<HTMLDivElement>(null);

    const handleScroll = (direction: "left" | "right") => {
        if (!trackRef.current) return;

        // Tự động đo chiều rộng của phần tử con đầu tiên + gap 24px (hoặc dùng scrollStep nếu có)
        let step = scrollStep;
        if (!step) {
            const firstItem = trackRef.current.firstElementChild as HTMLElement;
            step = firstItem ? firstItem.offsetWidth + 24 : 320;
        }

        trackRef.current.scrollBy({
            left: direction === "left" ? -step : step,
            behavior: "smooth",
        });
    };

    return (
        <div className={`${styles.carouselWrapper} ${className}`.trim()}>
            {/* Nút lùi lại bên trái */}
            <button
                type="button"
                onClick={() => handleScroll("left")}
                className={styles.prevBtn}
                aria-label={prevAriaLabel}
            >
                <ChevronLeft size={20} />
            </button>

            {/* Dải nội dung trượt ngang */}
            <div
                ref={trackRef}
                className={`${styles.track} ${trackClassName}`.trim()}
            >
                {children}
            </div>

            {/* Nút tiến tới bên phải */}
            <button
                type="button"
                onClick={() => handleScroll("right")}
                className={styles.nextBtn}
                aria-label={nextAriaLabel}
            >
                <ChevronRight size={20} />
            </button>
        </div>
    );
}