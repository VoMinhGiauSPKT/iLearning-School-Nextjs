"use client";

import { useState } from "react";
import CourseCard from "@/components/ui/course-card";
import CurriculumAccordion from "./curriculum-accordion";
import { CourseItem as CourseItemType, CoursesSectionData } from "@/types/landing";
import styles from "./index.module.scss";

interface CourseItemProps {
    course: CourseItemType;
    curriculum: CoursesSectionData["curriculum"];
    defaultOpen?: boolean;
}

export default function CourseItem({
    course,
    curriculum,
    defaultOpen = false,
}: CourseItemProps) {
    const [isOpen, setIsOpen] = useState<boolean>(defaultOpen);

    const courseCurriculum = {
        ...curriculum,
        title: "Giáo trình",
    };

    return (
        <div className={styles.courseItemWrap}>
            <CourseCard
                course={course}
                onToggleMore={() => setIsOpen((prev) => !prev)}
                isExpanded={isOpen}
            />

            {isOpen && (
                <div className={styles.curriculumWrap}>
                    <CurriculumAccordion data={courseCurriculum} />
                </div>
            )}
        </div>
    );
}
