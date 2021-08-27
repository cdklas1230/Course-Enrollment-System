import { useEffect, useState } from "react";
import { CourseServices } from "../../service/CourseServices";
import CourseTable from "../CourseTable";
import cookie from "react-cookies";
import { JWT_TOKEN_COOKIE_NAME } from "../../constants";
import CourseActionAlert from "../alerts/CourseActionAlert";

export default function AllCourses() {
    // 用hooks
    const [courses, setCourses] = useState([]);
    // 定义button相关的state
    const [alertOpen, setAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [alertSeverity, setAlertSeverity] = useState("");

    //拿到token
    const token = cookie.load(JWT_TOKEN_COOKIE_NAME);

    useEffect(()=>{
        // AJAX
        // 1. xhr to get backend data
        CourseServices.getAllCourses()
            .then(response=>{
                // 2. setState() to trigger updating
                setCourses(response.data);
            })
            .catch(error => console.log(error));        
    },[]); // 空括号记录dependencies
    return (
        <div>
            {/* 通过props传递给子组件 */}
            <CourseActionAlert open={alertOpen} onAlertClick={setAlertOpen} alertMessage={alertMessage} alertSeverity={alertSeverity}/>
            <CourseTable courses={courses} actionButtonLabel={token ? "Enroll" : null} onActionButtonClick={enrollCourse}/> 
        </div>
    );

    function enrollCourse(course) {
        // send xhr to server and get response
        CourseServices.enrollCourse(token, course.course_name)
            .then(response=>{
                setAlertOpen(true);
                setAlertMessage("Successfully enrolled in the course");
                setAlertSeverity("success");
            })
            .catch(error=>{
                setAlertOpen(true);
                setAlertMessage("fail to enroll the course");
                setAlertSeverity("error");
            })
    }
}