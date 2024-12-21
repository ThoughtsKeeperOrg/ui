import axios from 'axios';

const CrudAdapter = (baseURL) => {
    const client = axios.create({
        baseURL: baseURL
    });

    return {
        get: async (url) => {
            const response = await client.get(url);
            return response.data;
        },

        post: async (url, data) => {
            const response = await client.post(url, data);
            return response.data;
        },

        put: async (url, data) => {
            const response = await client.put(url, data);
            return response.data;
        },

        delete: async (url) => {
            const response = await client.delete(url);
            return response.data;
        }
    };
};

export default CrudAdapter;