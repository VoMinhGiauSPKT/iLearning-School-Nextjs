import { PartnersSectionData } from "@/types/landing";
import SectionHeader from "@/components/ui/section-header";
import ScrollCarousel from "@/components/ui/scroll-carousel";
import styles from "./index.module.scss";

interface PartnersSectionProps {
    data: PartnersSectionData;
}

/**
 * PartnersSection là SERVER COMPONENT:
 * - Không có "use client"
 * - Render HTML toàn bộ danh sách logo đối tác tại Server
 */
export default function PartnersSection({ data }: PartnersSectionProps) {
    if (!data?.partners?.length) return null;

    return (
        <section className={styles.partnersSection}>
            <div className={styles.container}>
                <SectionHeader subtitle={data.subtitle} title={data.title} />

                <ScrollCarousel
                    className={styles.partnersBox}
                    trackClassName={styles.logosTrack}
                    prevAriaLabel="Previous partners"
                    nextAriaLabel="Next partners"
                >
                    {data.partners.map((partner) => (
                        <a
                            key={partner.id}
                            href={partner.href || "#"}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.partnerItem}
                        >
                            <img
                                src={partner.logo}
                                alt={partner.name}
                                className={styles.logoImg}
                            />
                        </a>
                    ))}
                </ScrollCarousel>
            </div>
        </section>
    );
}