import axios from "../axios";

export const CourseServices = {
    getAllCourses: function() {
        return axios.get("/courses"); //base url + /courses/
    },
    getEnrolledCourses: function(token) {
        return axios.get("/user/courses/", {
            headers:{
                "Authorization": `Bearer ${token}`
            }
        });
    },
    enrollCourse: function(token, courseName) {
        return axios.post(`/user/course/${courseName}/`,{}, {
            headers:{
                "Authorization": `Bearer ${token}`
            }
        });
    },
    withdrawCourse: function(token, courseName) {
        return axios.delete(`/user/course/${courseName}/`, {
            headers:{
                "Authorization": `Bearer ${token}`
            }
        });
    },
}