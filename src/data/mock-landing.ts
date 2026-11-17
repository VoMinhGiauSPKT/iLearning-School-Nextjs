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
        subtitle: "Trải nghiệm dự án thực tế cùng UI8",
        title: "Các khoá học sắp khai giảng",
        featuredCourse: {
            id: "featured-1",
            title: "Khoá học ReactJS – Xây dựng chức năng Github với GraphQL",
            price: "7,500,000 đ",
            thumbnail:
                "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=800&q=80",
            features: [
                "Lazy loading – code splitting – Memoization trong ReactJS",
                "Tìm hiểu GraphQL và so sánh với REST",
                "Sử dụng ApolloLink như Middleware",
                "So sánh Cách Apollo quản lý cache vs Redux quản lý Cache",
                "Unit test & Integration test",
            ],
            ctaButton: { label: "Xem thêm ▾", href: "#khoa-hoc-react" },
        },
        curriculum: {
            title: "Giáo trình",
            stages: [
                {
                    id: "stage-1",
                    title: "GIAI ĐOẠN HỌC 1: Chuẩn bị nền tảng",
                    duration: "5 buổi",
                    lessons: [
                        "- Môn 1: Nhập môn lập trình tư duy & thuật toán căn bản",
                        "- Môn 2: HTML5, CSS3 hiện đại và Responsive Web",
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
                        "- Môn 6: Phát triển ứng dụng web",
                        "- Môn 7 (không bắt buộc): Lập trình di động",
                    ],
                },
                {
                    id: "stage-3",
                    title: "GIAI ĐOẠN HỌC 2: Chuyên môn sâu - Hướng chuyên sâu 2: Lập trình viên web fullstack",
                    duration: "5 buổi",
                    lessons: [
                        "- Môn 8: NodeJS & Express REST API",
                        "- Môn 9: ReactJS nâng cao & Next.js",
                    ],
                },
                {
                    id: "stage-4",
                    title: "GIAI ĐOẠN HỌC 2: Chuyên môn sâu - Hướng chuyên sâu 2: Lập trình viên web fullstack",
                    duration: "5 buổi",
                    lessons: [
                        "- Môn 10: Kiến trúc vi dịch vụ & Docker",
                        "- Môn 11: Đồ án tốt nghiệp thực chiến",
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
        testimonials: [
            {
                id: "testi-1",
                content:
                    "Khóa học có lộ trình rõ ràng, a Việt và các bạn Mentor rất nhiệt tình , luôn support ngay lập tức trong buổi học cũng như là ngoài buổi để giải quyết vấn đề của học viên. Kiến thức Mentor sâu rộng nên hầu hết đều trả lời được thắc mắc học viên",
                author: {
                    name: "Hiếu Hồ",
                    location: "HO CHI MINH CITY",
                    avatar: "",
                },
            },
            {
                id: "testi-2",
                content:
                    "Khóa học có lộ trình rõ ràng, a Việt và các bạn Mentor rất nhiệt tình , luôn support ngay lập tức trong buổi học cũng như là ngoài buổi để giải quyết vấn đề của học viên. Kiến thức Mentor sâu rộng nên hầu hết đều trả lời được thắc mắc học viên",
                author: {
                    name: "Hiếu Hồ",
                    location: "HO CHI MINH CITY",
                    avatar: "",
                },
            },
            {
                id: "testi-3",
                content:
                    "Khóa học có lộ trình rõ ràng, a Việt và các bạn Mentor rất nhiệt tình , luôn support ngay lập tức trong buổi học cũng như là ngoài buổi để giải quyết vấn đề của học viên. Kiến thức Mentor sâu rộng nên hầu hết đều trả lời được thắc mắc học viên",
                author: {
                    name: "Hiếu Hồ",
                    location: "HO CHI MINH CITY",
                    avatar: "",
                },
            },
        ],
    } as TestimonialsSectionData,

    instructors: {
        subtitle: "Nhân sự nòng cốt",
        title: "Đội ngũ giảng viên",
        instructors: [
            {
                id: "inst-1",
                name: "Tâm Huỳnh",
                role: "Founder & CEO",
                avatar: "",
                bio: [
                    'Mình đến với ngành từ những năm 2007, đến nay có thể tạm cho là hơn 13 năm rồi. Với việc "chạy" dự án, mentor cho rất nhiều nơi, mình tin rằng có thể cung cấp cho các bạn một cách toàn vẹn về bức tranh tổng thể của ngành lập trình. Quan trọng nhất vẫn là xây dựng những chiếc app và hệ thống có hiệu năng cao, tạo được giá trị cho người dùng cũng như doanh nghiệp của bạn.',
                    "Bên cạnh đó, là một Software / Solution Architect, mình tự tin có thể giúp bạn hiểu rõ việc xây dựng kiến trúc cho ứng dụng lớn, mang lại hiệu quả cao cho team.",
                ],
            },
            {
                id: "inst-2",
                name: "Tâm Huỳnh",
                role: "Founder & CEO",
                avatar: "",
                bio: [
                    'Mình đến với ngành từ những năm 2007, đến nay có thể tạm cho là hơn 13 năm rồi. Với việc "chạy" dự án, mentor cho rất nhiều nơi, mình tin rằng có thể cung cấp cho các bạn một cách toàn vẹn về bức tranh tổng thể của ngành lập trình. Quan trọng nhất vẫn là xây dựng những chiếc app và hệ thống có hiệu năng cao, tạo được giá trị cho người dùng cũng như doanh nghiệp của bạn.',
                    "Bên cạnh đó, là một Software / Solution Architect, mình tự tin có thể giúp bạn hiểu rõ việc xây dựng kiến trúc cho ứng dụng lớn, mang lại hiệu quả cao cho team.",
                ],
            },
            {
                id: "inst-3",
                name: "Tâm Huỳnh",
                role: "Founder & CEO",
                avatar: "",
                bio: [
                    'Mình đến với ngành từ những năm 2007, đến nay có thể tạm cho là hơn 13 năm rồi. Với việc "chạy" dự án, mentor cho rất nhiều nơi, mình tin rằng có thể cung cấp cho các bạn một cách toàn vẹn về bức tranh tổng thể của ngành lập trình. Quan trọng nhất vẫn là xây dựng những chiếc app và hệ thống có hiệu năng cao, tạo được giá trị cho người dùng cũng như doanh nghiệp của bạn.',
                    "Bên cạnh đó, là một Software / Solution Architect, mình tự tin có thể giúp bạn hiểu rõ việc xây dựng kiến trúc cho ứng dụng lớn, mang lại hiệu quả cao cho team.",
                ],
            },
        ],
    } as InstructorsSectionData,

    partners: {
        subtitle: "Khách hàng và",
        title: "Đối tác của UI8",
        partners: [],
    } as PartnersSectionData,
};