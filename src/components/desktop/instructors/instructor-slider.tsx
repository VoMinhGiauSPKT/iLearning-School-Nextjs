"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import QuoteIcon from "@/components/ui/quote-icon";
import { InstructorItem } from "@/types/landing";
import styles from "./index.module.scss";

interface InstructorSliderProps {
    instructors: InstructorItem[];
}

/**
 * Client Island:
 * Quản lý state chuyển đổi giảng viên (currentIndex)
 * Chuẩn thiết kế Figma: Thẻ lớn 1479x748, ảnh 500x500, nút điều hướng bo góc, 3 dots phân trang
 */
export default function InstructorSlider({ instructors }: InstructorSliderProps) {
    const [currentIndex, setCurrentIndex] = useState(0);

    if (!instructors || instructors.length === 0) return null;

    const currentInstructor = instructors[currentIndex];

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev === 0 ? instructors.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prev) => (prev === instructors.length - 1 ? 0 : prev + 1));
    };

    return (
        /* Thẻ Giảng viên lớn chuẩn Figma (Rectangle 29) */
        <div className={styles.instructorCard}>
            <div className={styles.contentWrap}>
                {/* Cột trái: Khung ảnh 500x500 (Rectangle 33) */}
                <div className={styles.imageCol}>
                    {currentInstructor.avatar ? (
                        <img
                            src={currentInstructor.avatar}
                            alt={currentInstructor.name}
                            className={styles.avatarImg}
                        />
                    ) : null}
                </div>

                {/* Cột phải: Thông điệp trích dẫn & Thông tin (Group 62) */}
                <div className={styles.infoCol}>
                    {/* Dấu trích dẫn 2 thanh chéo song song chuẩn Figma */}
                    <div className={styles.quoteWrap}>
                        <QuoteIcon className={styles.quoteSvg} />
                    </div>

                    <div className={styles.bioText}>
                        {currentInstructor.bio.map((paragraph, idx) => (
                            <p key={idx}>{paragraph}</p>
                        ))}
                    </div>

                    <div className={styles.authorRow}>
                        <div className={styles.authorDetails}>
                            <h3 className={styles.authorName}>{currentInstructor.name}</h3>
                            <p className={styles.authorRole}>{currentInstructor.role}</p>
                        </div>

                        {/* Cặp nút điều hướng Prev/Next chuẩn Figma (Group 66) */}
                        <div className={styles.navButtons}>
                            <button
                                type="button"
                                onClick={handlePrev}
                                className={styles.prevBtn}
                                aria-label="Previous instructor"
                            >
                                <ChevronLeft size={24} strokeWidth={2.5} />
                            </button>
                            <button
                                type="button"
                                onClick={handleNext}
                                className={styles.nextBtn}
                                aria-label="Next instructor"
                            >
                                <ChevronRight size={24} strokeWidth={2.5} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Các chấm tròn phân trang nằm BÊN TRONG thẻ ở đáy chuẩn Figma (Group 67) */}
            <div className={styles.dots}>
                {instructors.map((_, idx) => (
                    <button
                        key={idx}
                        type="button"
                        onClick={() => setCurrentIndex(idx)}
                        className={`${styles.dot} ${idx === currentIndex ? styles.activeDot : ""}`}
                        aria-label={`Slide ${idx + 1}`}
                    />
                ))}
            </div>
        </div>
    );
}