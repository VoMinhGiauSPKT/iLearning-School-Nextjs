import { BannerData, SliderData, VideoData } from "@/types/landing";
import { apiFetch, getFileUrl, formatYouTubeEmbed } from "@/lib/api-client";

export async function getPublicSetting(): Promise<{
    slider: SliderData;
    video: VideoData;
    banner: BannerData;
} | null> {
    const data = await apiFetch<any[]>("/v1/setting/public");
    if (!data) return null;

    const pageConfig = data.find((item: any) => item.keyName === "page_config");
    if (!pageConfig?.valueData) return null;

    const parsed = JSON.parse(pageConfig.valueData);

    return {
        slider: {
            slides: (parsed.slider || []).map((item: any, index: number) => ({
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