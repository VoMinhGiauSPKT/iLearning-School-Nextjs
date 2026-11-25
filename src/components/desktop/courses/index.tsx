import SectionHeader from "@/components/ui/section-header";
import CourseList from "./course-list";
import { CoursesSectionData } from "@/types/landing";
import styles from "./index.module.scss";

interface CoursesSectionProps {
    data: CoursesSectionData;
}

export default function CoursesSection({ data }: CoursesSectionProps) {
    if (!data) return null;

    const allCourses = [data.featuredCourse, ...(data.courseList || [])].filter(Boolean);

    return (
        <section id="khoahoc" className={styles.coursesSection}>
            <div className={styles.container}>
                <SectionHeader subtitle={data.subtitle} title={data.title} />

                <CourseList
                    courses={allCourses}
                    curriculum={data.curriculum}
                    allCoursesLabel={data.allCoursesButton?.label}
                />
            </div>
        </section>
    );
}
