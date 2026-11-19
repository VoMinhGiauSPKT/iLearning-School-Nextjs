let activeAnimationId: number | null = null;

if (typeof window !== "undefined") {
    const cancelOnUserInteraction = () => {
        if (activeAnimationId !== null) {
            cancelAnimationFrame(activeAnimationId);
            activeAnimationId = null;
        }
    };
    window.addEventListener("wheel", cancelOnUserInteraction, { passive: true });
    window.addEventListener("touchmove", cancelOnUserInteraction, { passive: true });
}

/**
 * Cuộn trang mượt mà với gia tốc ease-in-out cho cả chiều cuộn lên và cuộn xuống
 */
export function smoothScrollTo(targetY: number, duration: number = 650, callback?: () => void) {
    if (typeof window === "undefined") return;

    if (activeAnimationId !== null) {
        cancelAnimationFrame(activeAnimationId);
        activeAnimationId = null;
    }

    const startY = window.scrollY || window.pageYOffset || 0;
    const distance = targetY - startY;

    if (Math.abs(distance) < 2) {
        window.scrollTo(0, targetY);
        callback?.();
        return;
    }

    let startTime: number | null = null;

    // Cubic easeInOut: chuyển động êm ái, tăng tốc mượt mà và giảm tốc êm đềm khi đến nơi
    const easeInOutCubic = (t: number): number => {
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    };

    const step = (currentTime: number) => {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        const ease = easeInOutCubic(progress);

        window.scrollTo(0, Math.round(startY + distance * ease));

        if (timeElapsed < duration) {
            activeAnimationId = requestAnimationFrame(step);
        } else {
            activeAnimationId = null;
            window.scrollTo(0, targetY);
            callback?.();
        }
    };

    activeAnimationId = requestAnimationFrame(step);
}

/**
 * Cuộn thẳng đến nội dung tiêu đề/chữ trong section sao cho nằm gần sát mép header (không chừa khoảng trống)
 */
export function scrollToSectionContent(
    sectionEl: HTMLElement,
    headerHeight: number,
    buffer: number = 14,
    duration: number = 650,
    callback?: () => void
) {
    // Tìm phần tử tiêu đề/chữ đầu tiên bên trong section (SectionHeader, p, h2...)
    const titleEl =
        sectionEl.querySelector<HTMLElement>(
            "h2, p, [class*='header'], [class*='subtitle'], [class*='title']"
        ) ||
        sectionEl.querySelector<HTMLElement>(
            "[class*='videoWrapper'], [class*='bannerCard'], [class*='container']"
        ) ||
        sectionEl;

    const titleTop = titleEl.getBoundingClientRect().top + (window.scrollY || window.pageYOffset || 0);
    const targetY = Math.max(0, Math.round(titleTop - headerHeight - buffer));

    smoothScrollTo(targetY, duration, callback);
}
