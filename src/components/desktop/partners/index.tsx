import { PartnersSectionData } from "@/types/landing";
import SectionHeader from "@/components/ui/section-header";
import PartnerSlider from "./partner-slider";
import styles from "./index.module.scss";

interface PartnersSectionProps {
    data: PartnersSectionData;
}

export default function PartnersSection({ data }: PartnersSectionProps) {
    return (
        <section id="doi-tac" className={styles.partnersSection}>
            <div className={styles.container}>
                <SectionHeader
                    subtitle={data?.subtitle || "Khách hàng và"}
                    title={data?.title || "Đối tác của UI8"}
                />

                <PartnerSlider partners={data?.partners || []} />
            </div>
        </section>
    );
}
