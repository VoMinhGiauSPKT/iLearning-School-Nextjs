"use client";

import { useState } from "react";
import CurriculumAccordion from "../curriculum-accordion/index";
import { CourseItem as CourseItemType, CoursesSectionData } from "@/types/landing";
import styles from "./index.module.scss";

interface CourseItemProps {
    course: CourseItemType;
    curriculum: CoursesSectionData["curriculum"];
    defaultOpen?: boolean;
}

export default function CourseItem({
    course,
    curriculum,
    defaultOpen = false,
}: CourseItemProps) {
    const [isOpen, setIsOpen] = useState<boolean>(defaultOpen);
    const [isFeaturesExpanded, setIsFeaturesExpanded] = useState(false);

    const hasManyFeatures = (course.features?.length || 0) > 5;
    const displayedFeatures = hasManyFeatures && !isFeaturesExpanded
        ? course.features.slice(0, 5)
        : course.features;

    const courseCurriculum = {
        ...curriculum,
        title: "Giáo trình",
    };

    return (
        <div className={styles.courseItemWrap}>
            <div className={styles.card}>
                <div className={styles.cardContent}>
                    <div className={styles.imageCol}>
                        <img
                            src={course.thumbnail}
                            alt={course.title}
                            className={styles.thumbnail}
                        />
                    </div>

                    <div className={styles.infoCol}>
                        <h3 className={styles.title}>{course.title}</h3>
                        <div className={styles.price}>{course.price?.replace(/\./g, ",")}</div>

                        <ul className={styles.featureList}>
                            {displayedFeatures.map((feature, idx) => (
                                <li key={idx} className={styles.featureItem}>
                                    <span className={styles.bullet}>
                                        <svg width="14" height="14" viewBox="0 0 18 18" fill="none">
                                            <path
                                                d="M4 5.5A2 2 0 0 1 7 3.8L13 7.3A2 2 0 0 1 13 10.7L7 14.2A2 2 0 0 1 4 12.5Z"
                                                fill="#15CCA3"
                                            />
                                        </svg>
                                    </span>
                                    <span>{feature}</span>
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
            </div>

            {isOpen && (
                <div className={styles.curriculumWrap}>
                    <CurriculumAccordion data={courseCurriculum} />
                </div>
            )}
        </div>
    );
}
