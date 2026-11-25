"use client";

import { useState } from "react";
import MobileCourseItem from "../course-item/index";
import { CourseItem, CoursesSectionData } from "@/types/landing";
import styles from "./index.module.scss";

interface CourseListProps {
    courses: CourseItem[];
    curriculum: CoursesSectionData["curriculum"];
    allCoursesLabel?: string;
}

export default function CourseList({
    courses,
    curriculum,
    allCoursesLabel = "Tất cả khoá học",
}: CourseListProps) {
    const [showAll, setShowAll] = useState(false);

    if (!courses.length) return null;

    const displayedCourses = showAll ? courses : courses.slice(0, 5);
    const hasMore = courses.length > 5;

    return (
        <>
            <div className={styles.coursesList}>
                {displayedCourses.map((course, index) => (
                    <MobileCourseItem
                        key={course.id}
                        course={course}
                        curriculum={curriculum}
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
                        {allCoursesLabel}
                    </button>
                </div>
            )}
        </>
    );
}
