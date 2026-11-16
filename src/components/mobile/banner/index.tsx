import { BannerData } from "@/types/landing";
import styles from "./index.module.scss";

interface MobileBannerProps {
    banner: BannerData;
}

export default function MobileBanner({ banner }: MobileBannerProps) {
    if (!banner) return null;

    return (
        <section id="tu-van" className={styles.mobileBannerSection}>
            <div className={styles.bannerCard}>
                <h2 className={styles.title}>{banner.title}</h2>
                <p className={styles.description}>{banner.description}</p>
            </div>
        </section>
    );
}
