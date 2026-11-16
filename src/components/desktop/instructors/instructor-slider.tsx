"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { InstructorItem } from "@/types/landing";
import styles from "./index.module.scss";

interface InstructorSliderProps {
    instructors: InstructorItem[];
}

/**
 * Client Island:
 * Chỉ chịu trách nhiệm quản lý state chuyển đổi giảng viên (currentIndex)
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
        <>
            {/* Thẻ Giảng viên lớn */}
            <div className={styles.instructorCard}>
                {/* Cột trái: Khung ảnh đại diện */}
                <div className={styles.imageCol}>
                    <img
                        src={currentInstructor.avatar}
                        alt={currentInstructor.name}
                        className={styles.avatarImg}
                    />
                </div>

                {/* Cột phải: Thông điệp trích dẫn & Thông tin */}
                <div className={styles.infoCol}>
                    <div className={styles.quoteWrap}>
                        <Quote size={28} className={styles.quoteIcon} />
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

                        {/* Cặp nút điều hướng Prev/Next */}
                        <div className={styles.navButtons}>
                            <button
                                type="button"
                                onClick={handlePrev}
                                className={styles.prevBtn}
                                aria-label="Previous instructor"
                            >
                                <ChevronLeft size={20} />
                            </button>
                            <button
                                type="button"
                                onClick={handleNext}
                                className={styles.nextBtn}
                                aria-label="Next instructor"
                            >
                                <ChevronRight size={20} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Các chấm tròn phân trang dưới đáy */}
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
        </>
    );
}