import { CourseItem } from "@/types/landing";
import { apiFetch, getFileUrl } from "@/lib/api-client";

function formatPrice(price?: number | string): string {
    if (price === undefined || price === null || price === "") return "Liên hệ";
    if (typeof price === "string") {
        const num = Number(price.replace(/[^\d]/g, ""));
        if (!isNaN(num) && num > 0) {
            return new Intl.NumberFormat("en-US").format(num) + " đ";
        }
        return price.replace(/\./g, ",");
    }
    if (typeof price !== "number" || isNaN(price)) return "Liên hệ";
    return new Intl.NumberFormat("en-US").format(price) + " đ";
}

interface ApiClassroomItem {
    id?: string | number;
    price?: number | string;
    course?: {
        id?: string | number;
        name?: string;
        price?: number | string;
        avatar?: string;
        shortDescription?: string;
    };
}

export async function getClassroomList(): Promise<CourseItem[]> {
    const data = await apiFetch<{ content: ApiClassroomItem[] }>("/v1/class-room/public/list");
    const content = data?.content || [];

    return content.map((item) => {
        const course = item.course || {};
        const rawFeatures = (course.shortDescription || "")
            .split("\n")
            .map((line: string) => line.trim())
            .filter(Boolean);

        return {
            id: String(item.id || course.id),
            title: course.name || "Khóa học thực chiến",
            price: formatPrice(course.price ?? item.price),
            thumbnail: getFileUrl(course.avatar),
            features: rawFeatures.length > 0 ? rawFeatures : ["Đào tạo dự án thực chiến chuẩn doanh nghiệp"],
            ctaButton: { label: "Xem thêm ▾", href: `#khoa-hoc-${item.id}` },
        };
    });
}
