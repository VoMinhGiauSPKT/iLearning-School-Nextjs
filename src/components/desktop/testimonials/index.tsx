import { Quote } from "lucide-react";
import { TestimonialsSectionData } from "@/types/landing";
import SectionHeader from "@/components/ui/section-header";
import ScrollCarousel from "@/components/ui/scroll-carousel";
import styles from "./index.module.scss";

interface TestimonialsSectionProps {
    data: TestimonialsSectionData;
}

/**
 * TestimonialsSection là SERVER COMPONENT:
 * - Không có "use client"
 * - Toàn bộ nội dung đánh giá và avatar học viên được Server render sẵn thành HTML
 */
export default function TestimonialsSection({ data }: TestimonialsSectionProps) {
    if (!data?.testimonials?.length) return null;

    return (
        <section className={styles.testimonialsSection}>
            <div className={styles.container}>
                <SectionHeader subtitle={data.subtitle} title={data.title} />

                <ScrollCarousel
                    className={styles.carouselWrapper}
                    trackClassName={styles.cardsTrack}
                    prevAriaLabel="Previous testimonials"
                    nextAriaLabel="Next testimonials"
                >
                    {data.testimonials.map((item) => (
                        <div key={item.id} className={styles.card}>
                            {/* Dấu trích dẫn kép */}
                            <div className={styles.quoteIconWrap}>
                                <Quote size={28} className={styles.quoteIcon} />
                            </div>

                            {/* Nội dung đánh giá */}
                            <p className={styles.content}>{item.content}</p>

                            {/* Thông tin học viên */}
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
                </ScrollCarousel>
            </div>
        </section>
    );
}