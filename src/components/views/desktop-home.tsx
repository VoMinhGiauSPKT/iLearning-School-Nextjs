import Slider from "@/components/desktop/slider";
import VideoSection from "@/components/desktop/video";
import BannerSection from "@/components/desktop/banner";
import CoursesSection from "@/components/desktop/courses";
import TestimonialsSection from "@/components/desktop/testimonials";
import InstructorsSection from "@/components/desktop/instructors";
import PartnersSection from "@/components/desktop/partners";
import { LandingPageData } from "@/types/landing";

interface DesktopHomeProps {
    data: LandingPageData;
}

/**
 * Desktop View:
 * Sử dụng bộ Component riêng cho Desktop
 */
export default function DesktopHome({ data }: DesktopHomeProps) {
    return (
        <main>
            <Slider data={data.slider} />
            <VideoSection video={data.video} />
            <BannerSection banner={data.banner} />
            <CoursesSection data={data.courses} />
            <TestimonialsSection data={data.testimonials} />
            <InstructorsSection data={data.instructors} />
            <PartnersSection data={data.partners} />
        </main>
    );
}
