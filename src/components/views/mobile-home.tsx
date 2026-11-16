import MobileVideo from "@/components/mobile/video";
import MobileBanner from "@/components/mobile/banner";
import MobileCourses from "@/components/mobile/courses";
import { LandingPageData } from "@/types/landing";

interface MobileHomeProps {
    data: LandingPageData;
}

/**
 * Mobile View:
 * Sử dụng bộ Component riêng cho Mobile, nhưng chia sẻ chung 100% dữ liệu API
 */
export default function MobileHome({ data }: MobileHomeProps) {
    return (
        <main>
            {/* 1. Video riêng cho Mobile */}
            <MobileVideo video={data.video} />

            {/* 2. Banner riêng cho Mobile */}
            <MobileBanner banner={data.banner} />

            {/* 3. Khóa học & Giáo trình riêng cho Mobile */}
            <MobileCourses data={data.courses} />
        </main>
    );
}
