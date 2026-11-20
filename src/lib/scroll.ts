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
    // Nếu target là thẻ con bên trong (như span id="tu-van"), tìm đến section cha
    const rootEl = sectionEl.closest("section") || sectionEl;

    // Đối với các section có khung thẻ đặc thù (như Banner Card, Video Player),
    // cuộn thẳng đến đỉnh của khung Card để đỉnh thẻ và các góc bo tròn không bị header che
    const cardEl = rootEl.querySelector<HTMLElement>(
        "[class*='bannerCard'], [class*='videoWrapper']"
    );

    // Đối với các section thông thường, tìm phần tử tiêu đề/chữ đầu tiên (SectionHeader, p, h2...)
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
