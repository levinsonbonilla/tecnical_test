const BASE_URL = "";

export const fetcher = async (url) => {
    let responseObject = { errorMessage: null, data: [] };
    try {
        const response = await fetch(`${BASE_URL}/${url}`);
        if (!response.ok) {
            throw new Error(`HTTP Error ${response.status}`);
        }
        const responseData = await response.json();
        responseObject.data = responseData;           
    } catch (error) {
        responseObject.errorMessage = error.message;
    }

    return responseObject
}

export const fetcherPost = async (url, data = {}) => {
    let responseObject = { errorMessage: null, data: [] };
    try {
        const response = await fetch(`${BASE_URL}/${url}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        if (!response.ok) {
            throw new Error(`HTTP Error ${response.status}`);
        }
        const responseData = await response.json();
        responseObject.data = responseData;
    } catch (error) {
        responseObject.errorMessage = error.message;
    }

    return responseObject;
};