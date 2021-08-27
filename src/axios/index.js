import axios from "axios";

export default axios.create(
    {
        baseURL: 'http://k8s-default-courseen-d51abbee04-941081020.us-west-2.elb.amazonaws.com/',
    }
)