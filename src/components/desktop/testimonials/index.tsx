import { TestimonialsSectionData } from "@/types/landing";
import SectionHeader from "@/components/ui/section-header";
import QuoteIcon from "@/components/ui/quote-icon";
import styles from "./index.module.scss";

interface TestimonialsSectionProps {
    data: TestimonialsSectionData;
}

/**
 * TestimonialsSection Desktop:
 * Hiển thị chính xác 3 thẻ đánh giá theo chuẩn thiết kế Figma (không còn mũi tên trượt 2 bên)
 */
export default function TestimonialsSection({ data }: TestimonialsSectionProps) {
    if (!data?.testimonials?.length) return null;

    // Chỉ hiển thị tối đa 3 đánh giá theo yêu cầu Figma
    const displayTestimonials = data.testimonials.slice(0, 3);

    return (
        <section id="goc-hoc-vien" className={styles.testimonialsSection}>
            <div className={styles.container}>
                <SectionHeader subtitle={data.subtitle} title={data.title} />

                <div className={styles.grid}>
                    {displayTestimonials.map((item) => (
                        <div key={item.id} className={styles.card}>
                            {/* Biểu tượng dấu trích dẫn chuẩn Figma (hai thanh chéo song song #AEAEAE) */}
                            <div className={styles.quoteIconWrap}>
                                <QuoteIcon className={styles.quoteSvg} />
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
                </div>
            </div>
        </section>
    );
}
