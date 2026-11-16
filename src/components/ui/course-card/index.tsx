import Link from "next/link";
import { CourseItem } from "@/types/landing";
import styles from "./index.module.scss";

interface CourseCardProps {
    course: CourseItem;
    onToggleMore?: () => void; // Hàm xử lý đóng/mở giáo trình
    isExpanded?: boolean;      // Trạng thái đang mở hay đóng
}

export default function CourseCard({ course, onToggleMore, isExpanded }: CourseCardProps) {
    return (
        <div className={styles.card}>
            {/* Cột trái: Ảnh khóa học */}
            <div className={styles.imageCol}>
                <img
                    src={course.thumbnail}
                    alt={course.title}
                    className={styles.thumbnail}
                />
            </div>

            {/* Cột phải: Thông tin chi tiết */}
            <div className={styles.infoCol}>
                <h3 className={styles.title}>{course.title}</h3>
                <div className={styles.price}>{course.price}</div>

                <ul className={styles.featureList}>
                    {course.features.map((feature, idx) => (
                        <li key={idx} className={styles.featureItem}>
                            <span className={styles.bullet}>▶</span>
                            <span>{feature}</span>
                        </li>
                    ))}
                </ul>

                {/* Nếu có hàm onToggleMore thì render button để đóng/mở, ngược lại là thẻ Link chuyển trang */}
                {onToggleMore ? (
                    <button
                        type="button"
                        onClick={onToggleMore}
                        className={styles.moreBtn}
                    >
                        {isExpanded ? "Thu gọn ▴" : course.ctaButton.label}
                    </button>
                ) : (
                    <Link href={course.ctaButton.href} className={styles.moreBtn}>
                        {course.ctaButton.label}
                    </Link>
                )}
            </div>
        </div>
    );
}