"use client";

import { useState } from "react";
import SectionHeader from "@/components/ui/section-header";
import CourseItem from "./course-item";
import { CoursesSectionData } from "@/types/landing";
import styles from "./index.module.scss";

interface CoursesSectionProps {
    data: CoursesSectionData;
}

export default function CoursesSection({ data }: CoursesSectionProps) {
    const [showAll, setShowAll] = useState(false);

    if (!data) return null;

    const allCourses = [data.featuredCourse, ...(data.courseList || [])].filter(Boolean);
    const displayedCourses = showAll ? allCourses : allCourses.slice(0, 5);
    const hasMore = allCourses.length > 5;

    return (
        <section id="khoahoc" className={styles.coursesSection}>
            <div className={styles.container}>
                <SectionHeader subtitle={data.subtitle} title={data.title} />

                <div className={styles.courseList}>
                    {displayedCourses.map((course, index) => (
                        <CourseItem
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
            </div>
        </section>
    );
}
