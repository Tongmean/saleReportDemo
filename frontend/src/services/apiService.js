import axios from 'axios';

const API_BASE_URL = 'http://192.168.4.192:8000'; // local host server
// const API_BASE_URL = 'http://127.0.0.1:8000'; // local host server

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
    fetchCN: async (startDate, endDate) => {
        try {
          console.log("---------------api.fetchCN-----------------");
          console.log("req.startDate =", startDate, typeof(startDate), "\n", "req.endDate =", endDate, typeof(endDate));
          const response = await axios.post(`${API_BASE_URL}/api/creditnote`, { startDate , endDate } );
          console.log("res in api :", response);
          return response;
        } catch (error) {
            throw error;
        }
    },
    fetchSaleOrder: async (startDate, endDate) => {
        try {
          console.log("---------------api.fetchSaleOeder-----------------");
          console.log("req.startDate =", startDate, typeof(startDate), "\n", "req.endDate =", endDate, typeof(endDate));
          const response = await axios.post(`${API_BASE_URL}/api/saleorder`, { startDate , endDate } );
          console.log("res in api :", response);
          return response;
        } catch (error) {
            throw error;
        }
    },
    fetchSetEnd: async (startDate, endDate) => {
        try {
          console.log("---------------api.fetchSetEnd-----------------");
          console.log("req.startDate =", startDate, typeof(startDate), "\n", "req.endDate =", endDate, typeof(endDate));
          const response = await axios.post(`${API_BASE_URL}/api/setend`, { startDate , endDate } );
          console.log("res in api :", response);
          return response;
        } catch (error) {
            throw error;
        }
    },
    fetchDateConfirm: async (startDate, endDate) => {
        try {
          console.log("---------------api.dateConfirm-----------------");
          console.log("req.startDate =", startDate, typeof(startDate), "\n", "req.endDate =", endDate, typeof(endDate));
          const response = await axios.post(`${API_BASE_URL}/api/dateConfirm`, { startDate , endDate } );
          console.log("res in api :", response);
          return response;
        } catch (error) {
            throw error;
        }
    },
    verifyPin: async (pin) => { //data.pin
        try {
          console.log("---------------api.verifyPin-----------------");
          console.log("req.data =", pin, typeof(pin));
          const response = await axios.post(`${API_BASE_URL}/api/verifypin`, { ...{pin} });
          console.log("res in api :", response);
          return response;
        } catch (error) {
            console.log("log error in API :", error);
            throw error;
        }
    },
    fetchLastDateSaleOrder: async () => {
        try {
          console.log("---------------api.fetchLastDateSaleOrder-----------------");
          const response = await axios.get(`${API_BASE_URL}/api/lastDateSaleOrder`);
          console.log("res in api :", response);
          return response;
        } catch (error) {
            console.log("log error in API :", error);
            throw error;
        }
    },

};

export default apiService;