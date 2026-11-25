import { InstructorsSectionData } from "@/types/landing";
import SectionHeader from "@/components/ui/section-header";
import InstructorSlider from "./instructor-slider/index";
import styles from "./index.module.scss";

interface InstructorsSectionProps {
    data: InstructorsSectionData;
}

export default function InstructorsSection({ data }: InstructorsSectionProps) {
    if (!data?.instructors?.length) return null;

    return (
        <section id="blog" className={styles.instructorsSection}>
            <div className={styles.container}>
                <SectionHeader subtitle={data.subtitle} title={data.title} />

                <InstructorSlider instructors={data.instructors} />
            </div>
        </section>
    );
}
