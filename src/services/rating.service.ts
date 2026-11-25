import { TestimonialItem } from "@/types/landing";
import { apiFetch, getFileUrl } from "@/lib/api-client";

interface ApiRatingItem {
    id?: string | number;
    message?: string;
    student?: {
        account?: {
            fullName?: string;
            avatarPath?: string;
        };
    };
    course?: {
        name?: string;
    };
}

export async function getRatingList(): Promise<TestimonialItem[]> {
    const data = await apiFetch<{ content: ApiRatingItem[] }>("/v1/rating/public/list");
    const content = data?.content || [];

    return content.map((item) => {
        const rawParagraphs = (item.message || "")
            .split("\n")
            .map((s: string) => s.trim())
            .filter(Boolean);

        const uniqueMessage = Array.from(new Set(rawParagraphs)).join("\n\n");

        return {
            id: String(item.id),
            content: uniqueMessage || item.message || "Khóa học có lộ trình rõ ràng, mentor nhiệt tình.",
            author: {
                name: item.student?.account?.fullName || "Học viên",
                location: item.course?.name || "HỌC VIÊN",
                avatar: item.student?.account?.avatarPath ? getFileUrl(item.student.account.avatarPath) : undefined,
            },
        };
    });
}
