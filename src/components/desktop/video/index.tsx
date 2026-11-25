import { VideoData } from "@/types/landing";
import styles from "./index.module.scss";

interface VideoSectionProps {
    video: VideoData;
}

export default function VideoSection({ video }: VideoSectionProps) {
    if (!video?.videoUrl) return null;

    return (
        <section id="gioi-thieu" className={styles.videoSection}>
            <div className={styles.container}>
                <div className={styles.videoWrapper}>
                    <iframe
                        src={video.videoUrl}
                        title="Video giới thiệu ilearning School"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                        className={styles.player}
                    />
                </div>
            </div>
        </section>
    );
}
