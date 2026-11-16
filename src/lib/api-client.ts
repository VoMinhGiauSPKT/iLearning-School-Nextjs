export const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_URL || "https://ai-project-api.moviehub.io.vn";

/**
 * Helper: Tạo đường link tải file ảnh / video đầy đủ từ API
 */
export function getFileUrl(path?: string): string {
    if (!path) return "";
    if (path.startsWith("http://") || path.startsWith("https://")) return path;
    const cleanPath = path.startsWith("/") ? path : `/${path}`;
    return `${API_BASE_URL}/v1/file/download${cleanPath}`;
}

/**
 * Helper: Chuyển đổi link YouTube bất kỳ sang link Embed cho iframe
 */
export function formatYouTubeEmbed(url?: string): string {
    if (!url) return "";
    if (url.includes("embed/")) return url;
    const match = url.match(
        /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/
    );
    return match ? `https://www.youtube.com/embed/${match[1]}` : url;
}

/**
 * HTTP Client bọc ngoài hàm fetch chuẩn của Next.js:
 * Tự động gắn Base URL, bắt lỗi mạng và parse dữ liệu JSON
 */
export async function apiFetch<T>(
    endpoint: string,
    options?: RequestInit
): Promise<T | null> {
    try {
        const url = endpoint.startsWith("http")
            ? endpoint
            : `${API_BASE_URL}${endpoint}`;

        const res = await fetch(url, {
            ...options,
            next: { revalidate: 60, ...options?.next }, // Cache 60s trên server
        });

        if (!res.ok) {
            console.error(`[API Error] ${endpoint} Status: ${res.status}`);
            return null;
        }

        const json = await res.json();
        return (json?.data as T) ?? null;
    } catch (error) {
        console.error(`[API Fetch Failed] ${endpoint}:`, error);
        return null;
    }
}