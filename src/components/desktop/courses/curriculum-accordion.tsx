"use client";

import { useState } from "react";
import Link from "next/link";
import { CurriculumStage } from "@/types/landing";
import styles from "./index.module.scss";

interface CurriculumAccordionProps {
    data: {
        title: string;
        stages: CurriculumStage[];
        registerButton: {
            label: string;
            href: string;
        };
    };
}

export default function CurriculumAccordion({ data }: CurriculumAccordionProps) {
    const [openStageId, setOpenStageId] = useState<string | null>("stage-2");

    const toggleStage = (id: string) => {
        setOpenStageId((prev) => (prev === id ? null : id));
    };

    return (
        <div className={styles.curriculumBox}>
            <h3 className={styles.curriculumTitle}>{data.title}</h3>

            <div className={styles.stageList}>
                {data.stages.map((stage) => {
                    const isOpen = openStageId === stage.id;

                    return (
                        <div key={stage.id} className={styles.stageItem}>
                            <button
                                type="button"
                                className={styles.stageHeader}
                                onClick={() => toggleStage(stage.id)}
                            >
                                <span className={styles.stageTitle}>{stage.title}</span>

                                <div className={styles.stageMeta}>
                                    <span className={styles.badge}>{stage.duration}</span>
                                    <span
                                        className={`${styles.toggleIcon} ${isOpen ? styles.isOpen : ""}`}
                                        aria-label={isOpen ? "Thu gọn" : "Mở rộng"}
                                    >
                                        <span className={styles.lineH} />
                                        <span className={styles.lineV} />
                                    </span>
                                </div>
                            </button>

                            {isOpen && stage.lessons && (
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

            <div className={styles.btnCenter}>
                <Link href={data.registerButton.href} className={styles.registerBtn}>
                    {data.registerButton.label}
                </Link>
            </div>
        </div>
    );
}
