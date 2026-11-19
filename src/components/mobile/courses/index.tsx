"use client";

import { useState } from "react";
import SectionHeader from "@/components/ui/section-header";
import CurriculumAccordion from "./curriculum-accordion";
import { CoursesSectionData, CourseItem } from "@/types/landing";
import styles from "./index.module.scss";

interface MobileCoursesProps {
    data: CoursesSectionData;
}

interface MobileCourseItemProps {
    course: CourseItem;
    curriculum: CoursesSectionData["curriculum"];
    defaultOpen?: boolean;
}

/**
 * Từng khoá học trên Mobile:
 * Mỗi khoá đều có nút "Xem thêm ▾" / "Thu gọn ▴" để mở/đóng giáo trình riêng
 */
function MobileCourseItem({
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
            {/* Thẻ khoá học */}
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
                            <svg
                                className={`${styles.toggleFeaturesChevron} ${isFeaturesExpanded ? styles.isExpanded : ""}`}
                                width="11"
                                height="7"
                                viewBox="0 0 11 7"
                                fill="none"
                            >
                                <path
                                    d="M1.5 1.5L5.5 5.5L9.5 1.5"
                                    stroke="currentColor"
                                    strokeWidth="1.6"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
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

export default function MobileCourses({ data }: MobileCoursesProps) {
    if (!data) return null;
    const allCourses = [data.featuredCourse, ...(data.courseList || [])].filter(Boolean);
    const [showAll, setShowAll] = useState(false);

    const displayedCourses = showAll ? allCourses : allCourses.slice(0, 5);
    const hasMore = allCourses.length > 5;

    return (
        <section id="khoahoc" className={styles.mobileCoursesSection}>
            <SectionHeader
                subtitle={data.subtitle}
                title={data.title}
                className={styles.sectionHeader}
            />

            <div className={styles.coursesList}>
                {displayedCourses.map((course, index) => (
                    <MobileCourseItem
                        key={course.id}
                        course={course}
                        curriculum={data.curriculum}
                        defaultOpen={index === 0}
                    />
                ))}
            </div>

            {hasMore && !showAll && (
                <div className={styles.allCoursesWrap}>
                    <button
                        type="button"
                        onClick={() => setShowAll(true)}
                        className={styles.allCoursesBtn}
                    >
                        {data.allCoursesButton?.label || "Tất cả khoá học"}
                    </button>
                </div>
            )}
        </section>
    );
}
