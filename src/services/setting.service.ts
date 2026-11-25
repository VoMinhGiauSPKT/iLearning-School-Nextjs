import { BannerData, SliderData, VideoData } from "@/types/landing";
import { apiFetch, getFileUrl, formatYouTubeEmbed } from "@/lib/api-client";

interface ApiSettingItem {
    keyName?: string;
    valueData?: string;
}

interface ParsedPageConfig {
    slider?: Array<{
        title?: string;
        description?: string;
        image?: string;
        url?: string;
    }>;
    video?: string;
    description?: {
        title?: string;
        description?: string;
    };
}

export async function getPublicSetting(): Promise<{
    slider: SliderData;
    video: VideoData;
    banner: BannerData;
} | null> {
    const data = await apiFetch<ApiSettingItem[]>("/v1/setting/public");
    if (!data) return null;

    const pageConfig = data.find((item) => item.keyName === "page_config");
    if (!pageConfig?.valueData) return null;

    const parsed: ParsedPageConfig = JSON.parse(pageConfig.valueData);

    return {
        slider: {
            slides: (parsed.slider || []).map((item, index) => ({
                id: `slide-${index + 1}`,
                title: item.title || "",
                description: item.description || "",
                backgroundImage: getFileUrl(item.image),
                ctaButton: { label: "Đăng ký ngay", href: item.url || "#dang-ky" },
            })),
        },
        video: {
            videoUrl: formatYouTubeEmbed(parsed.video || ""),
        },
        banner: {
            title: parsed.description?.title || "",
            description: parsed.description?.description || "",
        },
    };
}
