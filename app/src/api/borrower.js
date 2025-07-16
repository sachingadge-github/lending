import axios from './axiosConfig';

export const getBorrowers = async () => {
  const response = await axios.get('/borrowers');
  return response.data.results || [];
};

export const createBorrower = async (data) => {
  const response = await axios.post('/borrowers', data);
  return response.data;
};

export const updateBorrower = async (id, payload) => {
  const res = await axios.patch(`/borrowers/${id}`, payload);
  return res.data;
};

export const deleteBorrower = async (id) => {
  const res = await axios.delete(`/borrowers/${id}`);
  return res.data;
};

