import SectionHeader from "@/components/ui/section-header";
import CourseList from "./course-list/index";
import { CoursesSectionData } from "@/types/landing";
import styles from "./index.module.scss";

interface MobileCoursesProps {
    data: CoursesSectionData;
}

export default function MobileCourses({ data }: MobileCoursesProps) {
    if (!data) return null;

    const allCourses = [data.featuredCourse, ...(data.courseList || [])].filter(Boolean);

    return (
        <section id="khoahoc" className={styles.mobileCoursesSection}>
            <SectionHeader
                subtitle={data.subtitle}
                title={data.title}
                className={styles.sectionHeader}
            />

            <CourseList
                courses={allCourses}
                curriculum={data.curriculum}
                allCoursesLabel={data.allCoursesButton?.label}
            />
        </section>
    );
}
