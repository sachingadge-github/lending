import axios from './axiosConfig';

export const getLenders = async () => {
  const response = await axios.get('/users?role=user');
  return response.data.results || [];
};

export const createLender = async (data) => {
  const response = await axios.post('/users', data);
  return response.data;
};
