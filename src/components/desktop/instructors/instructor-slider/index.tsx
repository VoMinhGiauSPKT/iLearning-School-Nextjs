"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import QuoteIcon from "@/components/ui/quote-icon";
import { InstructorItem } from "@/types/landing";
import styles from "./index.module.scss";

interface InstructorSliderProps {
    instructors: InstructorItem[];
}

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
        <div className={styles.instructorCard}>
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
                                <div className={styles.imageCol}>
                                    {instructor.avatar ? (
                                        <img
                                            src={instructor.avatar}
                                            alt={instructor.name}
                                            className={styles.avatarImg}
                                        />
                                    ) : null}
                                </div>

                                <div className={styles.infoCol}>
                                    <div className={styles.quoteWrap}>
                                        <QuoteIcon className={styles.quoteSvg} />
                                    </div>

                                    <div className={styles.bioText}>
                                        {instructor.bio.map((paragraph, pIdx) => (
                                            <p key={pIdx}>{paragraph}</p>
                                        ))}
                                    </div>

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
