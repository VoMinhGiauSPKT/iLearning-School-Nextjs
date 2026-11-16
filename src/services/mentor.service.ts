import { InstructorItem } from "@/types/landing";
import { apiFetch, getFileUrl } from "@/lib/api-client";

const DEFAULT_AVATAR = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80";

export async function getMentorList(): Promise<InstructorItem[]> {
    const data = await apiFetch<{ content: any[] }>("/v1/mentor/public/list");
    const content = data?.content || [];

    return content.map((item: any) => {
        const rawBio = (item.description || "")
            .split("\n")
            .map((s: string) => s.trim())
            .filter(Boolean);

        return {
            id: String(item.id),
            name: item.account?.fullName || "Giảng viên",
            role: item.position || "Mentor",
            avatar: item.account?.avatarPath ? getFileUrl(item.account.avatarPath) : DEFAULT_AVATAR,
            bio: rawBio.length > 0 ? Array.from(new Set(rawBio)) as string[] : ["Đồng hành cùng học viên giải quyết tận gốc các bài toán thực tế."],
        };
    });
}