"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { SliderData } from "@/types/landing";
import styles from "./index.module.scss";

interface SliderProps {
    data: SliderData;
}

export default function Slider({ data }: SliderProps) {
    const slides = data.slides;
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (!slides || slides.length === 0) return;
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [slides.length]);

    if (!slides || slides.length === 0) return null;

    const currentSlide = slides[currentIndex];

    return (
        <section className={styles.sliderWrapper}>
            <div
                className={styles.sliderContainer}
                style={{ backgroundImage: `url(${currentSlide.backgroundImage})` }}
            >
                <div className={styles.overlay} />

                <div className={styles.content}>
                    <h1 className={styles.title}>{currentSlide.title}</h1>
                    <p className={styles.description}>{currentSlide.description}</p>
                    <Link href={currentSlide.ctaButton.href} className={styles.ctaBtn}>
                        {currentSlide.ctaButton.label}
                    </Link>
                </div>

                <div className={styles.sliderTrack}>

                    <div
                        className={styles.activeThumb}
                        style={{
                            width: `${100 / slides.length}%`,
                            transform: `translateX(${currentIndex * 100}%)`,
                        }}
                    />

                    {slides.map((_, index) => (
                        <button
                            key={index}
                            type="button"
                            className={styles.trackStep}
                            onClick={() => setCurrentIndex(index)}
                            aria-label={`Chuyển đến slide ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}