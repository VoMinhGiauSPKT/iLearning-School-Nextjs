import { VideoData } from "@/types/landing";
import styles from "./index.module.scss";

interface MobileVideoProps {
    video: VideoData;
}

export default function MobileVideo({ video }: MobileVideoProps) {
    if (!video?.videoUrl) return null;

    return (
        <section id="gioi-thieu" className={styles.mobileVideoSection}>
            <span id="trang-chu" />
            <div className={styles.videoWrapper}>
                <iframe
                    src={video.videoUrl}
                    title="Video giới thiệu"
                    allowFullScreen
                    className={styles.player}
                />
            </div>
        </section>
    );
}
