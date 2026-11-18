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
                        {course.features.map((item, idx) => (
                            <li key={idx}>
                                <span className={styles.bullet} />
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
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
                            width="11"
                            height="7"
                            viewBox="0 0 11 7"
                            fill="none"
                        >
                            <path
                                d="M1.5 1.5L5.5 5.5L9.5 1.5"
                                stroke="#FFFFFF"
                                strokeWidth="1.8"
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

    return (
        <section id="khoahoc" className={styles.mobileCoursesSection}>
            <SectionHeader subtitle={data.subtitle} title={data.title} />

            <div className={styles.coursesList}>
                {allCourses.map((course, index) => (
                    <MobileCourseItem
                        key={course.id}
                        course={course}
                        curriculum={data.curriculum}
                        defaultOpen={index === 0}
                    />
                ))}
            </div>
        </section>
    );
}
