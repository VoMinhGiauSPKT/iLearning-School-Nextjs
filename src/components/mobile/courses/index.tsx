"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Minus } from "lucide-react";
import { CoursesSectionData, CourseItem } from "@/types/landing";
import styles from "./index.module.scss";

interface MobileCoursesProps {
    data: CoursesSectionData;
}

interface MobileCourseItemProps {
    course: CourseItem;
    curriculum: CoursesSectionData["curriculum"];
    defaultOpen?: boolean;
}

/**
 * Từng khoá học trên Mobile:
 * Mỗi khoá đều có nút "Xem thêm ▾" / "Thu gọn ▴" để mở/đóng giáo trình riêng
 */
function MobileCourseItem({
    course,
    curriculum,
    defaultOpen = false,
}: MobileCourseItemProps) {
    const [isOpen, setIsOpen] = useState<boolean>(defaultOpen);
    const [openStageId, setOpenStageId] = useState<string | null>("stage-2");

    // Tiêu đề giáo trình mang tên từng khoá học
    const courseCurriculum = {
        ...curriculum,
        title: `Nội dung đào tạo: ${course.title}`,
    };

    return (
        <div className={styles.courseItemWrap}>
            {/* Thẻ khoá học */}
            <div className={styles.courseCard}>
                <div className={styles.thumbnailWrap}>
                    <img
                        src={course.thumbnail}
                        alt={course.title}
                        className={styles.thumbnail}
                    />
                </div>
                <div className={styles.info}>
                    <h3 className={styles.courseTitle}>{course.title}</h3>
                    <div className={styles.price}>{course.price}</div>
                    <ul className={styles.features}>
                        {course.features.map((item, idx) => (
                            <li key={idx}>
                                <span className={styles.bullet}>▶</span>
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                    <button
                        type="button"
                        onClick={() => setIsOpen((prev) => !prev)}
                        className={styles.moreBtn}
                    >
                        {isOpen ? "Thu gọn ▴" : "Xem thêm ▾"}
                    </button>
                </div>
            </div>

            {/* Giáo trình Accordion xổ ra ngay bên dưới thẻ khi bấm Xem thêm */}
            {isOpen && courseCurriculum && (
                <div className={styles.curriculumBox}>
                    <h3 className={styles.curriculumTitle}>{courseCurriculum.title}</h3>
                    <div className={styles.stageList}>
                        {courseCurriculum.stages.map((stage) => {
                            const isStageOpen = openStageId === stage.id;
                            return (
                                <div key={stage.id} className={styles.stageItem}>
                                    <button
                                        type="button"
                                        onClick={() => setOpenStageId(isStageOpen ? null : stage.id)}
                                        className={styles.stageHeader}
                                    >
                                        <span className={styles.stageTitle}>{stage.title}</span>
                                        <div className={styles.stageMeta}>
                                            <span className={styles.badge}>{stage.duration}</span>
                                            <span className={styles.icon}>
                                                {isStageOpen ? <Minus size={18} /> : <Plus size={18} />}
                                            </span>
                                        </div>
                                    </button>
                                    {isStageOpen && stage.lessons && (
                                        <div className={styles.stageContent}>
                                            {stage.lessons.map((lesson, idx) => (
                                                <p key={idx} className={styles.lessonItem}>{lesson}</p>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                    <div className={styles.registerWrap}>
                        <Link
                            href={courseCurriculum.registerButton?.href || "#dang-ky"}
                            className={styles.registerBtn}
                        >
                            {courseCurriculum.registerButton?.label || "Đăng ký ngay"}
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
}

export default function MobileCourses({ data }: MobileCoursesProps) {
    if (!data) return null;

    // Danh sách tất cả 19 khoá học đồng bộ
    const allCourses = [data.featuredCourse, ...(data.courseList || [])].filter(Boolean);

    return (
        <section id="khoahoc" className={styles.mobileCoursesSection}>
            <span id="courses" />
            <span id="course" />
            <span id="khoa-hoc" />
            <span id="goc-hoc-vien" />
            <span id="blog" />
            <span id="giang-vien" />
            {/* Tiêu đề phần khóa học */}
            <div className={styles.header}>
                <p className={styles.subtitle}>{data.subtitle}</p>
                <h2 className={styles.title}>{data.title}</h2>
            </div>

            {/* Danh sách 19 khóa học đồng bộ hành vi đóng/mở */}
            <div className={styles.coursesList}>
                {allCourses.map((course, index) => (
                    <MobileCourseItem
                        key={course.id}
                        course={course}
                        curriculum={data.curriculum}
                        defaultOpen={index === 0} // Chỉ khóa đầu tiên mở sẵn, các khóa sau mặc định đóng
                    />
                ))}
            </div>

            {/* Nút Tất cả khoá học */}
            {data.allCoursesButton && (
                <div className={styles.allCoursesWrap}>
                    <Link href={data.allCoursesButton.href} className={styles.allCoursesBtn}>
                        {data.allCoursesButton.label}
                    </Link>
                </div>
            )}
        </section>
    );
}
