import { mockLandingData } from "@/data/mock-landing";
import { getPublicSetting } from "./setting.service";
import { getClassroomList } from "./course.service";
import { getMentorList } from "./mentor.service";
import { getCompanyList } from "./company.service";
import { getRatingList } from "./rating.service";

export { mockLandingData };

export async function getLandingPageData() {
    const [setting, classrooms, mentors, companies, ratings] = await Promise.all([
        getPublicSetting(),
        getClassroomList(),
        getMentorList(),
        getCompanyList(),
        getRatingList(),
    ]);

    const coursesData = {
        ...mockLandingData.courses,
        ...(classrooms?.length ? {
            featuredCourse: classrooms[0],
            courseList: classrooms.slice(1),
        } : {}),
    };

    const instructorsData = {
        ...mockLandingData.instructors,
        ...(mentors?.length ? { instructors: mentors } : {}),
    };

    const partnersData = {
        ...mockLandingData.partners,
        ...(companies?.length ? { partners: companies } : {}),
    };

    const testimonialsData = {
        ...mockLandingData.testimonials,
        ...(ratings?.length ? { testimonials: ratings } : {}),
    };

    return {
        ...mockLandingData,
        slider: setting?.slider ?? mockLandingData.slider,
        video: setting?.video ?? mockLandingData.video,
        banner: setting?.banner ?? mockLandingData.banner,
        courses: coursesData,
        instructors: instructorsData,
        partners: partnersData,
        testimonials: testimonialsData,
    };
}
