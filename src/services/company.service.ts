import { PartnerItem } from "@/types/landing";
import { apiFetch, getFileUrl } from "@/lib/api-client";

export async function getCompanyList(): Promise<PartnerItem[]> {
    const data = await apiFetch<{ content: any[] }>("/v1/company/public/list");
    const content = data?.content || [];

    return content.map((item: any) => ({
        id: String(item.id),
        name: item.name || "Đối tác",
        logo: getFileUrl(item.avatar),
        href: "#",
    }));
}