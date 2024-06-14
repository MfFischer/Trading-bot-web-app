import axios from 'axios';

const getSentiment = async (ticker) => {
  const response = await axios.get(`/api/sentiment/${ticker}`);
  return response.data;
};

export default { getSentiment };
