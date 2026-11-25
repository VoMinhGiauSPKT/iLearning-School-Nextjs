import type { CSSProperties } from "react";
import { PartnerItem } from "@/types/landing";
import styles from "./index.module.scss";

interface PartnerSliderProps {
    partners?: PartnerItem[];
}

export default function PartnerSlider({ partners = [] }: PartnerSliderProps) {
    if (!partners || partners.length === 0) return null;

    const minItemsPerGroup = 8;
    const repeatCount = Math.max(1, Math.ceil(minItemsPerGroup / partners.length));
    const basePartners = Array.from({ length: repeatCount }, () => partners).flat();
    const durationSeconds = 18;

    const renderGroup = (isDuplicate: boolean) => (
        <div className={styles.marqueeGroup} aria-hidden={isDuplicate || undefined}>
            {basePartners.map((partner, idx) => (
                <a
                    key={`${isDuplicate ? "dup" : "main"}-${partner.id}-${idx}`}
                    href={partner.href || "#"}
                    className={styles.partnerItem}
                    title={partner.name}
                    tabIndex={isDuplicate ? -1 : undefined}
                >
                    <img
                        src={partner.logo}
                        alt={isDuplicate ? "" : partner.name}
                        className={styles.logoImg}
                    />
                </a>
            ))}
        </div>
    );

    return (
        <div className={styles.partnersBox}>
            <div className={styles.marqueeViewport}>
                <div
                    className={styles.marqueeTrack}
                    style={{ "--marquee-duration": `${durationSeconds}s` } as CSSProperties}
                >
                    {renderGroup(false)}
                    {renderGroup(true)}
                </div>
            </div>
        </div>
    );
}
