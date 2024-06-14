import axios from 'axios';

const getTradingData = async (ticker) => {
  const response = await axios.get(`/api/trading/${ticker}`);
  return response.data;
};

export default { getTradingData };
