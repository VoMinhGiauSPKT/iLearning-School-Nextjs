import MobileVideo from "@/components/mobile/video";
import MobileBanner from "@/components/mobile/banner";
import MobileCourses from "@/components/mobile/courses";
import { LandingPageData } from "@/types/landing";

interface MobileHomeProps {
    data: LandingPageData;
}

export default function MobileHome({ data }: MobileHomeProps) {
    return (
        <main>
            <MobileVideo video={data.video} />
            <MobileBanner banner={data.banner} />
            <MobileCourses data={data.courses} />
        </main>
    );
}
