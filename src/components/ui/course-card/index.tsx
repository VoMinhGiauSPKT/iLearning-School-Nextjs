"use client";

import { useState } from "react";
import Link from "next/link";
import { CourseItem } from "@/types/landing";
import styles from "./index.module.scss";

interface CourseCardProps {
    course: CourseItem;
    onToggleMore?: () => void; // Hàm xử lý đóng/mở giáo trình
    isExpanded?: boolean;      // Trạng thái đang mở hay đóng
}

export default function CourseCard({ course, onToggleMore, isExpanded }: CourseCardProps) {
    const [isFeaturesExpanded, setIsFeaturesExpanded] = useState(false);
    const hasManyFeatures = (course.features?.length || 0) > 5;
    const displayedFeatures = hasManyFeatures && !isFeaturesExpanded
        ? course.features.slice(0, 5)
        : course.features;

    return (
        <div className={styles.card}>
            <div className={styles.cardContent}>
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
                    <div className={styles.price}>{course.price?.replace(/\./g, ",")}</div>

                    <ul className={styles.featureList}>
                        {displayedFeatures.map((feature, idx) => (
                            <li key={idx} className={styles.featureItem}>
                                <span className={styles.bullet}>
                                    <svg width="14" height="14" viewBox="0 0 18 18" fill="none">
                                        <path
                                            d="M4 5.5A2 2 0 0 1 7 3.8L13 7.3A2 2 0 0 1 13 10.7L7 14.2A2 2 0 0 1 4 12.5Z"
                                            fill="#15CCA3"
                                        />
                                    </svg>
                                </span>
                                <span>{feature}</span>
                            </li>
                        ))}
                    </ul>

                    {/* Nút Xem thêm / Thu gọn danh sách nếu nhiều hơn 5 mục */}
                    {hasManyFeatures && (
                        <button
                            type="button"
                            onClick={() => setIsFeaturesExpanded((prev) => !prev)}
                            className={styles.toggleFeaturesBtn}
                        >
                            <span>{isFeaturesExpanded ? "Thu gọn" : "Xem thêm"}</span>
                        </button>
                    )}

                    {/* Nếu có hàm onToggleMore thì render button để đóng/mở, ngược lại là thẻ Link chuyển trang */}
                    {onToggleMore ? (
                        <button
                            type="button"
                            onClick={onToggleMore}
                            className={styles.moreBtn}
                        >
                            <span className={styles.btnText}>
                                {isExpanded ? "Thu gọn" : "Xem thêm"}
                            </span>
                            <svg
                                className={`${styles.chevron} ${isExpanded ? styles.isExpanded : ""}`}
                                width="15"
                                height="9"
                                viewBox="0 0 15 9"
                                fill="none"
                            >
                                <path
                                    d="M1.5 1.5L7.5 7.5L13.5 1.5"
                                    stroke="#FFFFFF"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </button>
                    ) : (
                        <Link href={course.ctaButton.href} className={styles.moreBtn}>
                            <span className={styles.btnText}>{course.ctaButton.label}</span>
                            <svg
                                className={styles.chevron}
                                width="15"
                                height="9"
                                viewBox="0 0 15 9"
                                fill="none"
                            >
                                <path
                                    d="M1.5 1.5L7.5 7.5L13.5 1.5"
                                    stroke="#FFFFFF"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
}