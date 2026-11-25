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

export function scrollToSectionContent(
    sectionEl: HTMLElement,
    headerHeight: number,
    buffer: number = 14,
    duration: number = 650,
    callback?: () => void
) {
    const rootEl = sectionEl.closest("section") || sectionEl;

    const cardEl = rootEl.querySelector<HTMLElement>(
        "[class*='bannerCard'], [class*='videoWrapper']"
    );

    const titleEl =
        cardEl ||
        rootEl.querySelector<HTMLElement>(
            "h2, p, [class*='header'], [class*='subtitle'], [class*='title']"
        ) ||
        rootEl.querySelector<HTMLElement>(
            "[class*='container']"
        ) ||
        rootEl;

    const titleTop = titleEl.getBoundingClientRect().top + (window.scrollY || window.pageYOffset || 0);
    const targetY = Math.max(0, Math.round(titleTop - headerHeight - buffer));

    smoothScrollTo(targetY, duration, callback);
}
