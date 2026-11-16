import {
    BannerData,
    CoursesSectionData,
    HeaderData,
    InstructorsSectionData,
    PartnersSectionData,
    SliderData,
    TestimonialsSectionData,
    VideoData,
} from "@/types/landing";

export const mockLandingData = {
    header: {
        brand: {
            title: "ilearning",
            subtitle: "School",
        },
        searchPlaceholder: "Tìm kiếm khoá học, bài viết, video...",
        navLinks: [
            { id: "1", label: "Trang chủ", href: "/" },
            { id: "2", label: "Khoá học", href: "#khoahoc", hasDropdown: true },
            { id: "3", label: "Góc học viên", href: "#goc-hoc-vien" },
            { id: "4", label: "Giới thiệu", href: "#gioi-thieu" },
            { id: "5", label: "Blog", href: "#blog" },
        ],
        loginButton: { label: "Log In", href: "#login" },
        signButton: { label: "SIGN", href: "#signup" },
    } as HeaderData,

    slider: {
        slides: [
            {
                id: "slide-1",
                title: "Chương trình học mang lại kiến thức\ntổng quan để đi làm",
                description:
                    "Đào tạo theo nhu cầu doanh nghiệp, học viên tham gia chương trình sẽ có được những giá trị khác biệt: Tiết kiệm thời gian, tiền bạc, công sức và dễ dàng tham gia và định hướng sự nghiệp.",
                ctaButton: { label: "Đăng ký ngay", href: "#dang-ky" },
                backgroundImage:
                    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1920&q=80",
            },
        ],
    } as SliderData,

    video: {
        videoUrl: "https://www.youtube.com/embed/Hy9QEAjkA6c",
    } as VideoData,

    banner: {
        title: "Bạn đã tự tin để trở thành Senior Software Engineer?",
        description:
            "Ngành IT đang ngày càng phát triển và thay đổi nhanh chóng. Từ đó, chất lượng các kỹ sư cũng ngày càng được yêu cầu khắc khe hơn. Chúng tôi thấu hiểu những khó khăn trên con đường trở thành Senior Software Engineer và tự tin giúp bạn có thể thực hiện được điều đó.",
    } as BannerData,

    courses: {
        subtitle: "Trải nghiệm dự án thực tế cùng LỚI",
        title: "Các khoá học sắp khai giảng",
        featuredCourse: {
            id: "featured-1",
            title: "Khoá học ReactJS – Xây dựng chức năng Github với GraphQL",
            price: "7,500,000 đ",
            thumbnail:
                "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=800&q=80",
            features: [
                "Lazy loading – code-splitting – Memoization trong ReactJS",
                "Tìm hiểu GraphQL và so sánh với REST",
                "Sử dụng Apollo-link như Middleware",
            ],
            ctaButton: { label: "Xem thêm ▾", href: "#khoa-hoc-react" },
        },
        curriculum: {
            title: "Giáo trình",
            stages: [
                {
                    id: "stage-1",
                    title: "GIAI ĐOẠN HỌC 1: Chuẩn bị nền tảng",
                    duration: "9 buổi",
                    lessons: [
                        "Môn 1: Nhập môn lập trình tư duy & thuật toán căn bản",
                        "Môn 2: HTML5, CSS3 hiện đại và Responsive Web",
                    ],
                },
                {
                    id: "stage-2",
                    title: "GIAI ĐOẠN HỌC 2: Chuyên môn sâu - Hướng chuyên sâu 1: Lập trình viên java",
                    duration: "5 buổi",
                    lessons: [
                        "- Môn 3: Lập trình hướng đối tượng",
                        "- Môn 4: Cấu trúc dữ liệu và giải thuật",
                        "- Môn 5: Các hệ cơ sở dữ liệu",
                    ],
                },
            ],
            registerButton: { label: "Đăng ký ngay", href: "#dang-ky-khoa-hoc" },
        },
        courseList: [],
        allCoursesButton: { label: "Tất cả khoá học", href: "#tat-ca-khoa-hoc" },
    } as CoursesSectionData,

    testimonials: {
        subtitle: "Cảm nhận của học viên",
        title: "Mọi người nói gì về UI8",
        testimonials: [],
    } as TestimonialsSectionData,

    instructors: {
        subtitle: "Nhân sự nòng cốt",
        title: "Đội ngũ giảng viên",
        instructors: [],
    } as InstructorsSectionData,

    partners: {
        subtitle: "Khách hàng và",
        title: "Đối tác của UI8",
        partners: [],
    } as PartnersSectionData,
};