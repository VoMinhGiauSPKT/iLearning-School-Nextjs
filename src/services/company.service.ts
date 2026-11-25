import { PartnerItem } from "@/types/landing";
import { apiFetch, getFileUrl } from "@/lib/api-client";

interface ApiCompanyItem {
    id?: string | number;
    name?: string;
    avatar?: string;
}

export async function getCompanyList(): Promise<PartnerItem[]> {
    const data = await apiFetch<{ content: ApiCompanyItem[] }>("/v1/company/public/list");
    const content = data?.content || [];

    return content.map((item) => ({
        id: String(item.id),
        name: item.name || "Đối tác",
        logo: getFileUrl(item.avatar),
        href: "#",
    }));
}
