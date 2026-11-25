import { TestimonialsSectionData } from "@/types/landing";
import SectionHeader from "@/components/ui/section-header";
import QuoteIcon from "@/components/ui/quote-icon";
import styles from "./index.module.scss";

interface TestimonialsSectionProps {
    data: TestimonialsSectionData;
}

export default function TestimonialsSection({ data }: TestimonialsSectionProps) {
    if (!data?.testimonials?.length) return null;

    const displayTestimonials = data.testimonials.slice(0, 3);

    return (
        <section id="goc-hoc-vien" className={styles.testimonialsSection}>
            <div className={styles.container}>
                <SectionHeader subtitle={data.subtitle} title={data.title} />

                <div className={styles.grid}>
                    {displayTestimonials.map((item) => (
                        <div key={item.id} className={styles.card}>
                            <div className={styles.quoteIconWrap}>
                                <QuoteIcon className={styles.quoteSvg} />
                            </div>

                            <p className={styles.content}>{item.content}</p>

                            <div className={styles.authorRow}>
                                <div className={styles.avatar}>
                                    {item.author.avatar ? (
                                        <img src={item.author.avatar} alt={item.author.name} />
                                    ) : null}
                                </div>
                                <div className={styles.authorInfo}>
                                    <h4 className={styles.authorName}>{item.author.name}</h4>
                                    <span className={styles.authorLocation}>
                                        {item.author.location}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
