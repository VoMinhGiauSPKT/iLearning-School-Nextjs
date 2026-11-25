"use client";

import { useRef, ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import styles from "./index.module.scss";

interface ScrollCarouselProps {
    children: ReactNode;
    className?: string;
    trackClassName?: string;
    scrollStep?: number;
    prevAriaLabel?: string;
    nextAriaLabel?: string;
}

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
            <button
                type="button"
                onClick={() => handleScroll("left")}
                className={styles.prevBtn}
                aria-label={prevAriaLabel}
            >
                <ChevronLeft size={20} />
            </button>

            <div
                ref={trackRef}
                className={`${styles.track} ${trackClassName}`.trim()}
            >
                {children}
            </div>

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
