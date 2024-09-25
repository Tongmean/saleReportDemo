import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000'; // local host server

const apiService = {
    fetchMAT: async () => {
        try {
          console.log("---------------api.fetchMAT-----------------")
          const response = await axios.get(`${API_BASE_URL}/api/matid`);
          console.log("res in api :", response);
          return response;
        } catch (error) {
            throw error;
        }
    },
    fetchCN: async (data) => {
        try {
          console.log("---------------api.fetchCN-----------------");
          console.log("req.data =", data, typeof(data));
          const response = await axios.post(`${API_BASE_URL}/api/creditnote`, { ...{data} });
          console.log("res in api :", response);
          return response;
        } catch (error) {
            throw error;
        }
    },
    fetchSaleOeder: async (data) => {
        try {
          console.log("---------------api.fetchSaleOeder-----------------");
          console.log("req.data =", data, typeof(data));
          const response = await axios.post(`${API_BASE_URL}/api/saleorder`, { ...{data} });
          console.log("res in api :", response);
          return response;
        } catch (error) {
            throw error;
        }
    },
    fetchSetEnd: async (data) => {
        try {
          console.log("---------------api.fetchSetEnd-----------------");
          console.log("req.data =", data, typeof(data));
          const response = await axios.post(`${API_BASE_URL}/api/setend`, { ...{data} });
          console.log("res in api :", response);
          return response;
        } catch (error) {
            throw error;
        }
    },
    verifyPin: async (data) => { //data.pin
        try {
          console.log("---------------api.verifyPin-----------------");
          console.log("req.data =", data, typeof(data));
          const response = await axios.post(`${API_BASE_URL}/api/verifypin`, { ...{data} });
          console.log("res in api :", response);
          return response;
        } catch (error) {
            throw error;
        }
    },
};

export default apiService;