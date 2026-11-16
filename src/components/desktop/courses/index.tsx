import Link from "next/link";
import SectionHeader from "@/components/ui/section-header";
import CourseItem from "./course-item";
import { CoursesSectionData } from "@/types/landing";
import styles from "./index.module.scss";

interface CoursesSectionProps {
    data: CoursesSectionData;
}

/**
 * CoursesSection là SERVER COMPONENT:
 * - Server chịu trách nhiệm gom và phân phát danh sách 19 khóa học
 * - Mỗi khóa học là một hòn đảo tương tác độc lập (CourseItem)
 */
export default function CoursesSection({ data }: CoursesSectionProps) {
    if (!data) return null;

    // Gộp khóa học đầu tiên và 18 khóa học tiếp theo thành danh sách 19 khóa học
    const allCourses = [data.featuredCourse, ...(data.courseList || [])].filter(Boolean);

    return (
        <section id="khoahoc" className={styles.coursesSection}>
            <div className={styles.container}>
                {/* Tiêu đề render bằng Server Component */}
                <SectionHeader subtitle={data.subtitle} title={data.title} />

                {/* Danh sách 19 khóa học đồng bộ */}
                <div className={styles.courseList}>
                    {allCourses.map((course, index) => (
                        <CourseItem
                            key={course.id}
                            course={course}
                            curriculum={data.curriculum}
                            defaultOpen={index === 0} // Chỉ khóa đầu tiên mở sẵn, 18 khóa sau mặc định đóng
                        />
                    ))}
                </div>

                {/* Nút Xem tất cả khóa học tĩnh */}
                <div className={styles.allCoursesWrap}>
                    <Link href={data.allCoursesButton.href} className={styles.allCoursesBtn}>
                        {data.allCoursesButton.label}
                    </Link>
                </div>
            </div>
        </section>
    );
}