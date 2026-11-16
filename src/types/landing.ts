export interface NavLinkItem {
    id: string;
    label: string;
    href: string;
    hasDropdown?: boolean;
}

export interface HeaderData {
    brand: {
        title: string;
        subtitle: string;
    };
    searchPlaceholder: string;
    navLinks: NavLinkItem[];
    loginButton: {
        label: string;
        href: string;
    };
    signButton: {
        label: string;
        href: string;
    };
}

export interface SlideItem {
    id: string;
    title: string;
    description: string;
    ctaButton: {
        label: string;
        href: string;
    };
    backgroundImage: string;
}

export interface SliderData {
    slides: SlideItem[];
}

export interface VideoData {
    videoUrl: string;
}

export interface BannerData {
    title: string;
    description: string;
}

export interface CourseItem {
    id: string;
    title: string;
    price: string;
    thumbnail: string;
    features: string[];
    ctaButton: {
        label: string;
        href: string;
    };
}

export interface CurriculumStage {
    id: string;
    title: string;
    duration: string; // "9 buổi", "5 buổi"
    lessons?: string[];
}

export interface CoursesSectionData {
    subtitle: string;
    title: string;
    featuredCourse: CourseItem;
    curriculum: {
        title: string;
        stages: CurriculumStage[];
        registerButton: {
            label: string;
            href: string;
        };
    };
    courseList: CourseItem[];
    allCoursesButton: {
        label: string;
        href: string;
    };
}

export interface TestimonialItem {
    id: string;
    content: string;
    author: {
        name: string;
        location: string;
        avatar?: string;
    };
}

export interface TestimonialsSectionData {
    subtitle: string;
    title: string;
    testimonials: TestimonialItem[];
}

export interface InstructorItem {
    id: string;
    name: string;
    role: string;
    avatar: string;
    bio: string[];
}

export interface InstructorsSectionData {
    subtitle: string;
    title: string;
    instructors: InstructorItem[];
}

export interface PartnerItem {
    id: string;
    name: string;
    logo: string;
    href?: string;
}

export interface PartnersSectionData {
    subtitle: string;
    title: string;
    partners: PartnerItem[];
}

export interface LandingPageData {
    header: HeaderData;
    slider: SliderData;
    video: VideoData;
    banner: BannerData;
    courses: CoursesSectionData;
    testimonials: TestimonialsSectionData;
    instructors: InstructorsSectionData;
    partners: PartnersSectionData;
}
