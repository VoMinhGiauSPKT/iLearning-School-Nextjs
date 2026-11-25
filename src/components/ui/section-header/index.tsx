import styles from "./index.module.scss";

interface SectionHeaderProps {
    subtitle: string;
    title: string;
    className?: string;
}

export default function SectionHeader({ subtitle, title, className = "" }: SectionHeaderProps) {
    return (
        <div className={`${styles.header} ${className}`}>
            <p className={styles.subtitle}>{subtitle}</p>
            <h2 className={styles.title}>{title}</h2>
        </div>
    );
}
