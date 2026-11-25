"use client";

import { useState } from "react";
import CurriculumAccordion from "../curriculum-accordion/index";
import { CourseItem, CoursesSectionData } from "@/types/landing";
import styles from "./index.module.scss";

interface MobileCourseItemProps {
    course: CourseItem;
    curriculum: CoursesSectionData["curriculum"];
    defaultOpen?: boolean;
}

export default function MobileCourseItem({
    course,
    curriculum,
    defaultOpen = false,
}: MobileCourseItemProps) {
    const [isOpen, setIsOpen] = useState<boolean>(defaultOpen);
    const [isFeaturesExpanded, setIsFeaturesExpanded] = useState(false);
    const hasManyFeatures = (course.features?.length || 0) > 5;
    const displayedFeatures = hasManyFeatures && !isFeaturesExpanded
        ? course.features.slice(0, 5)
        : course.features;

    return (
        <div className={styles.courseItemWrap}>
            <div className={styles.courseCard}>
                <div className={styles.thumbnailWrap}>
                    <img
                        src={course.thumbnail}
                        alt={course.title}
                        className={styles.thumbnail}
                    />
                </div>
                <div className={styles.info}>
                    <h3 className={styles.courseTitle}>{course.title}</h3>
                    <div className={styles.price}>{course.price?.replace(/\./g, ",")}</div>
                    <ul className={styles.features}>
                        {displayedFeatures.map((item, idx) => (
                            <li key={idx}>
                                <span className={styles.bullet} />
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                    {hasManyFeatures && (
                        <button
                            type="button"
                            onClick={() => setIsFeaturesExpanded((prev) => !prev)}
                            className={styles.toggleFeaturesBtn}
                        >
                            <span>{isFeaturesExpanded ? "Thu gọn" : "Xem thêm"}</span>
                        </button>
                    )}
                    <button
                        type="button"
                        onClick={() => setIsOpen((prev) => !prev)}
                        className={styles.moreBtn}
                    >
                        <span className={styles.btnText}>
                            {isOpen ? "Thu gọn" : "Xem thêm"}
                        </span>
                        <svg
                            className={`${styles.chevron} ${isOpen ? styles.isExpanded : ""}`}
                            width="15"
                            height="9"
                            viewBox="0 0 15 9"
                            fill="none"
                        >
                            <path
                                d="M1.5 1.5L7.5 7.5L13.5 1.5"
                                stroke="#FFFFFF"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </button>
                </div>
            </div>

            {isOpen && curriculum && (
                <CurriculumAccordion
                    curriculum={curriculum}
                    defaultOpenStageId="stage-1"
                />
            )}
        </div>
    );
}
