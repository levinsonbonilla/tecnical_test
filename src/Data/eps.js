import { fetcher } from "../fetcher";

export const getEps = async () => {
    const responseObject = await fetcher("api/v1/list/eps");
    return responseObject;
} 