import { BannerData } from "@/types/landing";
import styles from "./index.module.scss";

interface BannerSectionProps {
    banner: BannerData;
}

export default function BannerSection({ banner }: BannerSectionProps) {
    if (!banner) return null;

    return (
        <section id="tu-van" className={styles.bannerSection}>
            <div className={styles.container}>
                <div className={styles.bannerCard}>
                    <h2 className={styles.title}>{banner.title}</h2>
                    <p className={styles.description}>{banner.description}</p>
                </div>
            </div>
        </section>
    );
}