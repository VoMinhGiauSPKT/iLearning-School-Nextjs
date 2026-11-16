import { CourseItem } from "@/types/landing";
import { apiFetch, getFileUrl } from "@/lib/api-client";

function formatPrice(price?: number): string {
    if (typeof price !== "number" || isNaN(price)) return "Liên hệ";
    return new Intl.NumberFormat("vi-VN").format(price) + " đ";
}

export async function getClassroomList(): Promise<CourseItem[]> {
    const data = await apiFetch<{ content: any[] }>("/v1/class-room/public/list");
    const content = data?.content || [];

    return content.map((item: any) => {
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