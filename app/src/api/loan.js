import axios from './axiosConfig';

export const getLoans = async () => {
  const res = await axios.get('/loan');
  return res.data.results || [];
};

export const createLoan = async (payload) => {
  const res = await axios.post('/loan', payload);
  return res.data;
};

export const updateLoan = async (id, payload) => {
  const res = await axios.patch(`/loan/${id}`, payload);
  return res.data;
};

export const deleteLoan = async (id) => {
  const res = await axios.delete(`/loan/${id}`);
  return res.data;
};

