import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000'; // local host server

const apiService = {
    fetchMAT: async () => {
        try {
          console.log("---------------api.fetchMAT-----------------")
          const response = await axios.get(`${API_BASE_URL}/api/matid`);
          return response;
        } catch (error) {
        //   logError('getPackingListDB', error);
            throw error;
        }
      },
};

export default apiService;