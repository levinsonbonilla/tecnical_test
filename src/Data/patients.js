import { fetcher, fetcherPost } from "../fetcher";

export const getPatients = async () => {
    const responseObject = await fetcher("api/v1/list/patients");
    return responseObject;
} 

export const addPatient = async (data) => {
    const responseObject = await fetcherPost("api/v1/add/patient", data);
    return responseObject;
} 