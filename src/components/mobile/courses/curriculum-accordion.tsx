"use client";

import { useState } from "react";
import Link from "next/link";
import { CurriculumStage } from "@/types/landing";
import styles from "./curriculum-accordion.module.scss";

interface CurriculumAccordionProps {
    curriculum: {
        title: string;
        stages: CurriculumStage[];
        registerButton?: {
            label: string;
            href: string;
        };
    };
    defaultOpenStageId?: string | null;
}

/**
 * Mobile Curriculum Accordion (Group 427321696):
 * - Tách thành component độc lập, tái sử dụng cho từng khoá học
 * - Biểu tượng "+" và "-" 1px Line 45 & Line 46 chuẩn vector Figma
 */
export default function CurriculumAccordion({
    curriculum,
    defaultOpenStageId = "stage-2",
}: CurriculumAccordionProps) {
    const [openStageId, setOpenStageId] = useState<string | null>(defaultOpenStageId);

    if (!curriculum?.stages) return null;

    return (
        <div className={styles.curriculumBox}>
            <h3 className={styles.curriculumTitle}>{curriculum.title || "Giáo trình"}</h3>
            <div className={styles.stageList}>
                {curriculum.stages.map((stage) => {
                    const isStageOpen = openStageId === stage.id;
                    return (
                        <div key={stage.id} className={styles.stageItem}>
                            <button
                                type="button"
                                onClick={() => setOpenStageId(isStageOpen ? null : stage.id)}
                                className={styles.stageHeader}
                                aria-expanded={isStageOpen}
                            >
                                <span className={styles.stageTitle}>{stage.title}</span>
                                <span className={styles.icon}>
                                    <svg width="19" height="19" viewBox="0 0 19 19" fill="none">
                                        {/* Line 46: Nét ngang */}
                                        <line
                                            x1="0"
                                            y1="9.5"
                                            x2="19"
                                            y2="9.5"
                                            stroke="#FFFFFF"
                                            strokeWidth="1"
                                        />
                                        {/* Line 45: Nét dọc (chỉ hiển thị khi đóng) */}
                                        {!isStageOpen && (
                                            <line
                                                x1="9.5"
                                                y1="0"
                                                x2="9.5"
                                                y2="19"
                                                stroke="#FFFFFF"
                                                strokeWidth="1"
                                            />
                                        )}
                                    </svg>
                                </span>
                            </button>

                            {isStageOpen && stage.lessons && (
                                <div className={styles.stageContent}>
                                    {stage.lessons.map((lesson, idx) => (
                                        <p key={idx} className={styles.lessonItem}>
                                            {lesson}
                                        </p>
                                    ))}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            {curriculum.registerButton && (
                <div className={styles.registerWrap}>
                    <Link
                        href={curriculum.registerButton.href || "#dang-ky"}
                        className={styles.registerBtn}
                    >
                        {curriculum.registerButton.label || "Đăng ký ngay"}
                    </Link>
                </div>
            )}
        </div>
    );
}
