import { fetcher, fetcherPost } from "../fetcher";

export const getDoctors = async () => {
    const responseObject = await fetcher("api/v1/list/doctors");
    return responseObject;
} 

export const addDoctor = async (data) => {
    const responseObject = await fetcherPost("api/v1/add/doctor", data);
    return responseObject;
} 