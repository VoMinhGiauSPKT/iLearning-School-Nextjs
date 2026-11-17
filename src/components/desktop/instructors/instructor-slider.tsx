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
 * Client Island cho Giảng viên (Instructors):
 * - Cặp nút điều hướng Prev/Next được CỐ ĐỊNH vị trí tại thẻ, không bị trượt theo nội dung
 * - Dải track trượt ngang mượt mà (smooth sliding track) với overflow: hidden chuẩn xác
 * - Không bị lộ viền ảnh tiếp theo ở mép phải
 */
export default function InstructorSlider({ instructors }: InstructorSliderProps) {
    const [currentIndex, setCurrentIndex] = useState(0);

    if (!instructors || instructors.length === 0) return null;

    const totalInstructors = instructors.length;
    const slidePercent = 100 / totalInstructors;

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev === 0 ? totalInstructors - 1 : prev - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prev) => (prev === totalInstructors - 1 ? 0 : prev + 1));
    };

    return (
        /* Thẻ Giảng viên lớn chuẩn Figma (Rectangle 29) */
        <div className={styles.instructorCard}>
            {/* Viewport che phần tràn chỉ chứa nội dung trượt của giảng viên */}
            <div className={styles.sliderViewport}>
                <div
                    className={styles.sliderTrack}
                    style={{
                        width: `${totalInstructors * 100}%`,
                        transform: `translateX(-${currentIndex * slidePercent}%)`,
                    }}
                >
                    {instructors.map((instructor, idx) => (
                        <div
                            key={instructor.id || idx}
                            className={styles.instructorSlide}
                            style={{
                                width: `${slidePercent}%`,
                                flex: `0 0 ${slidePercent}%`,
                                maxWidth: `${slidePercent}%`,
                            }}
                        >
                            <div className={styles.contentWrap}>
                                {/* Cột trái: Khung ảnh 500x500 (Rectangle 33) */}
                                <div className={styles.imageCol}>
                                    {instructor.avatar ? (
                                        <img
                                            src={instructor.avatar}
                                            alt={instructor.name}
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
                                        {instructor.bio.map((paragraph, pIdx) => (
                                            <p key={pIdx}>{paragraph}</p>
                                        ))}
                                    </div>

                                    {/* Hàng tác giả (phần bên phải chừa chỗ cho cặp nút cố định) */}
                                    <div className={styles.authorRow}>
                                        <div className={styles.authorDetails}>
                                            <h3 className={styles.authorName}>{instructor.name}</h3>
                                            <p className={styles.authorRole}>{instructor.role}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Cặp nút điều hướng Prev/Next CỐ ĐỊNH ở góc dưới bên phải, nhỏ gọn thanh mảnh */}
            <div className={styles.fixedNavButtons}>
                <button
                    type="button"
                    onClick={handlePrev}
                    className={styles.prevBtn}
                    aria-label="Previous instructor"
                >
                    <ChevronLeft size={18} strokeWidth={2} />
                </button>
                <button
                    type="button"
                    onClick={handleNext}
                    className={styles.nextBtn}
                    aria-label="Next instructor"
                >
                    <ChevronRight size={18} strokeWidth={2} />
                </button>
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
