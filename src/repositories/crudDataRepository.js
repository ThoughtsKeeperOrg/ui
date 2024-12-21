const CrudDataRepository = (apiAdapter, collection) => ({
    getAllItems: async () => {
        return await apiAdapter.get(collection);
    },

    getItemById: async (id) => {
        return await apiAdapter.get(`/${collection}/${id}`);
    },

    createItem: async (data) => {
        return await apiAdapter.post(collection, data);
    },

    updateItem: async (id, data) => {
        return await apiAdapter.put(`/${collection}/${id}`, data);
    },

    deleteItem: async (id) => {
        return await apiAdapter.delete(`/${collection}/${id}`);
    }
});

export default CrudDataRepository;