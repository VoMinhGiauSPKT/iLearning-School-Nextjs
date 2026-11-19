"use client";

import { useState } from "react";
import SectionHeader from "@/components/ui/section-header";
import CourseItem from "./course-item";
import { CoursesSectionData } from "@/types/landing";
import styles from "./index.module.scss";

interface CoursesSectionProps {
    data: CoursesSectionData;
}

/**
 * CoursesSection Desktop:
 * - Mặc định hiển thị đúng 5 khóa học đầu tiên
 * - Khi click vào nút "Tất cả khoá học", hiển thị full toàn bộ danh sách
 * - Sau khi hiển thị full, ẩn hoàn toàn nút "Tất cả khoá học" đi
 */
export default function CoursesSection({ data }: CoursesSectionProps) {
    if (!data) return null;

    // Gộp khóa học đầu tiên và 18 khóa học tiếp theo thành danh sách 19 khóa học
    const allCourses = [data.featuredCourse, ...(data.courseList || [])].filter(Boolean);
    const [showAll, setShowAll] = useState(false);

    const displayedCourses = showAll ? allCourses : allCourses.slice(0, 5);
    const hasMore = allCourses.length > 5;

    return (
        <section id="khoahoc" className={styles.coursesSection}>
            <div className={styles.container}>
                {/* Tiêu đề render bằng Server Component */}
                <SectionHeader subtitle={data.subtitle} title={data.title} />

                {/* Danh sách khóa học (mặc định 5, click Tất cả khóa học bung full) */}
                <div className={styles.courseList}>
                    {displayedCourses.map((course, index) => (
                        <CourseItem
                            key={course.id}
                            course={course}
                            curriculum={data.curriculum}
                            defaultOpen={index === 0} // Chỉ khóa đầu tiên mở sẵn, 18 khóa sau mặc định đóng
                        />
                    ))}
                </div>

                {/* Nút Xem tất cả khóa học: Ẩn đi khi đã hiển thị full */}
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