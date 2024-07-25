import { fetcher, fetcherPost } from "../fetcher";

export const getAppoinments = async () => {
    const responseObject = await fetcher("api/v1/list/appointments");
    return responseObject;
} 

export const addAppointmen = async (data) => {
    const responseObject = await fetcherPost("api/v1/reserve/appointment", data);
    return responseObject;
} 

export const getAppoinmentData = async (appointmentId) => {
    const responseObject = await fetcher(`api/v1/data/appointment?appointmentId=${appointmentId}`);
    return responseObject;
}