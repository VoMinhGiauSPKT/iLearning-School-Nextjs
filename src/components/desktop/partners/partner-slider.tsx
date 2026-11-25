"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { PartnerItem } from "@/types/landing";
import styles from "./index.module.scss";

interface PartnerSliderProps {
    partners?: PartnerItem[];
}

export default function PartnerSlider({ partners = [] }: PartnerSliderProps) {
    const pageSize = 5;

    const pages: PartnerItem[][] = [];
    if (partners && partners.length > 0) {
        for (let i = 0; i < partners.length; i += pageSize) {
            pages.push(partners.slice(i, i + pageSize));
        }
    }

    const totalPages = pages.length;
    const [pageIndex, setPageIndex] = useState(0);

    const handlePrev = () => {
        setPageIndex((prev) => (prev === 0 ? totalPages - 1 : prev - 1));
    };

    const handleNext = () => {
        setPageIndex((prev) => (prev + 1) % totalPages);
    };

    useEffect(() => {
        if (totalPages <= 1) return;

        const interval = setInterval(() => {
            setPageIndex((prev) => (prev + 1) % totalPages);
        }, 3500);

        return () => clearInterval(interval);
    }, [totalPages, pageIndex]);

    if (!partners || partners.length === 0) return null;

    const pagePercentOfTrack = 100 / totalPages;
    const showNavigation = totalPages > 1;

    return (
        <div className={styles.partnersBox}>
            {showNavigation ? (
                <button
                    type="button"
                    onClick={handlePrev}
                    className={styles.navBtn}
                    aria-label="Previous partners"
                >
                    <ArrowLeft size={16} strokeWidth={2} />
                </button>
            ) : (
                <div style={{ width: "3.5rem" }} />
            )}

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
                            key={pIdx}
                            className={styles.logosPage}
                            style={{ width: `${pagePercentOfTrack}%` }}
                        >
                            {page.map((partner) => (
                                <a
                                    key={partner.id}
                                    href={partner.href || "#"}
                                    className={styles.partnerItem}
                                    title={partner.name}
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

            {showNavigation ? (
                <button
                    type="button"
                    onClick={handleNext}
                    className={styles.navBtn}
                    aria-label="Next partners"
                >
                    <ArrowRight size={16} strokeWidth={2} />
                </button>
            ) : (
                <div style={{ width: "3.5rem" }} />
            )}
        </div>
    );
}
