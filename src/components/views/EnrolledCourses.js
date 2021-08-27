import React from "react";
import { CourseServices } from "../../service/CourseServices";
import CourseTable from "../CourseTable";
import cookie from "react-cookies";
import { JWT_TOKEN_COOKIE_NAME } from "../../constants";
import CourseActionAlert from "../alerts/CourseActionAlert";

export default class EnrolledCourses extends React.Component{
    //用lifecycle的方法
    constructor(props) {
        super(props);
        this.state = {
            courses: [],
            alertOpen: false,
            alertMessage: "",
            alertSeverity: "",
        };
        this.withdrawCourse = this.withdrawCourse.bind(this);
    }
    componentDidMount() {
        // AJAX
        // 1. xhr to get backend data
        this.getEnrolledCourses();       
    }

    render() {
        const token = cookie.load(JWT_TOKEN_COOKIE_NAME);
        if(token) {
            return (
                <div>
                    <CourseActionAlert
                        open={this.state.alertOpen}
                        onAlertClick={(open)=>this.setState({alertOpen: open})}
                        alertMessage={this.state.alertMessage}
                        alertSeverity={this.state.alertSeverity}
                    />
                    <CourseTable 
                        courses={this.state.courses}
                        actionButtonLabel="Withdraw"
                        onActionButtonClick={this.withdrawCourse}
                    />
    
                </div>
            );
        } else {
            return (
                <h2> You must login first! </h2>
            );
        }       
    }
    withdrawCourse(course) {
        const token = cookie.load(JWT_TOKEN_COOKIE_NAME);
        CourseServices.withdrawCourse(token, course.course_name)
            .then(response=>{
                this.setState({
                    alertOpen: true,
                    alertMessage: "Successfully withdrawn in the course",
                    alertSeverity: "success",
                }); 
                this.getEnrolledCourses();              
            })
            .catch(error=>{
                this.setState({
                    alertOpen: true,
                    alertMessage: "Fail to withdraw the course",
                    alertSeverity: "error",
                });
            })
    }

    getEnrolledCourses() {
        const token = cookie.load(JWT_TOKEN_COOKIE_NAME);
        CourseServices.getEnrolledCourses(token)
            .then(response => {
                // 2. setState() to trigger updating
                this.setState({
                    courses: response.data,
                });
            })
            .catch(error => console.log(error));
    }
}