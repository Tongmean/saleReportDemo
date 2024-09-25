import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:3001'; // local host server

const apiService = {
    fetchMAT: async () => {
        try {
          console.log("---------------api.fetchMAT-----------------")
          const response = await axios.get(`${API_BASE_URL}/`);
          return response.data;
        } catch (error) {
          logError('getPackingListDB', error);
        }
      },
};

export default apiService;