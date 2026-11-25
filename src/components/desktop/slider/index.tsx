"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { SliderData } from "@/types/landing";
import styles from "./index.module.scss";

interface SliderProps {
    data: SliderData;
}

export default function Slider({ data }: SliderProps) {
    const slides = data?.slides || [];
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (!data?.slides?.length) return;
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % data.slides.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [data?.slides]);

    if (!slides || slides.length === 0) return null;

    const totalSlides = slides.length;
    const slidePercent = 100 / totalSlides;

    return (
        <section id="trang-chu" className={styles.sliderWrapper}>
            <div className={styles.sliderContainer}>
                <div
                    className={styles.slidesTrack}
                    style={{
                        width: `${totalSlides * 100}%`,
                        transform: `translateX(-${currentIndex * slidePercent}%)`,
                    }}
                >
                    {slides.map((slide, index) => (
                        <div
                            key={index}
                            className={styles.slideItem}
                            style={{
                                width: `${slidePercent}%`,
                                backgroundImage: `url(${slide.backgroundImage})`,
                            }}
                        >
                            <div className={styles.overlay} />

                            <div className={styles.content}>
                                <h1 className={styles.title}>{slide.title}</h1>
                                <p className={styles.description}>{slide.description}</p>
                                <Link href={slide.ctaButton.href} className={styles.ctaBtn}>
                                    {slide.ctaButton.label}
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

                <div className={styles.sliderTrack}>
                    <div
                        className={styles.activeThumb}
                        style={{
                            width: `${100 / totalSlides}%`,
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
