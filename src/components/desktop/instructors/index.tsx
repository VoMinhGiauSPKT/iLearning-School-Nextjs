import { InstructorsSectionData } from "@/types/landing";
import SectionHeader from "@/components/ui/section-header";
import InstructorSlider from "./instructor-slider";
import styles from "./index.module.scss";

interface InstructorsSectionProps {
    data: InstructorsSectionData;
}

/**
 * InstructorsSection bây giờ là SERVER COMPONENT:
 * - Không có "use client"
 * - SectionHeader và khung bao bọc được render ở Server
 * - Phần slider động được bọc trong Client Island InstructorSlider
 */
export default function InstructorsSection({ data }: InstructorsSectionProps) {
    if (!data?.instructors?.length) return null;

    return (
        <section id="giang-vien" className={styles.instructorsSection}>
            <span id="blog" />
            <div className={styles.container}>
                <SectionHeader subtitle={data.subtitle} title={data.title} />

                <InstructorSlider instructors={data.instructors} />
            </div>
        </section>
    );
}