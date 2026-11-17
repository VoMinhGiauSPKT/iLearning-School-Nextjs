"use client";

import { useState } from "react";
import CourseCard from "@/components/ui/course-card";
import CurriculumAccordion from "./curriculum-accordion";
import { CourseItem as CourseItemType, CoursesSectionData } from "@/types/landing";
import styles from "./index.module.scss";

interface CourseItemProps {
    course: CourseItemType;
    curriculum: CoursesSectionData["curriculum"];
    defaultOpen?: boolean; // Cho phép mở sẵn (áp dụng cho khóa đầu tiên)
}

/**
 * Đảo tương tác (Client Island) cho từng khóa học:
 * Mỗi khóa học tự quản lý trạng thái đóng/mở giáo trình của chính nó
 */
export default function CourseItem({
    course,
    curriculum,
    defaultOpen = false,
}: CourseItemProps) {
    const [isOpen, setIsOpen] = useState<boolean>(defaultOpen);

    // Tiêu đề giáo trình "Giáo trình" theo đúng chuẩn thiết kế Figma
    const courseCurriculum = {
        ...curriculum,
        title: "Giáo trình",
    };

    return (
        <div className={styles.courseItemWrap}>
            {/* Thẻ thông tin khóa học */}
            <CourseCard
                course={course}
                onToggleMore={() => setIsOpen((prev) => !prev)}
                isExpanded={isOpen}
            />

            {/* Giáo trình accordion xổ ra ngay dưới thẻ khi bấm Xem thêm */}
            {isOpen && (
                <div className={styles.curriculumWrap}>
                    <CurriculumAccordion data={courseCurriculum} />
                </div>
            )}
        </div>
    );
}