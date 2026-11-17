import { PartnersSectionData } from "@/types/landing";
import SectionHeader from "@/components/ui/section-header";
import PartnerSlider from "./partner-slider";
import styles from "./index.module.scss";

interface PartnersSectionProps {
    data: PartnersSectionData;
}

/**
 * PartnersSection là SERVER COMPONENT:
 * - Render SectionHeader và cấu trúc bao bọc tại Server
 * - Phần chuyển slide 5 logo tương tác được bọc trong Client Island PartnerSlider
 */
export default function PartnersSection({ data }: PartnersSectionProps) {
    if (!data?.partners?.length) return null;

    return (
        <section id="doi-tac" className={styles.partnersSection}>
            <div className={styles.container}>
                <SectionHeader subtitle={data.subtitle} title={data.title} />

                <PartnerSlider partners={data.partners} />
            </div>
        </section>
    );
}
