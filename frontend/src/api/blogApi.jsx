import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_HOST;

const api = axios.create({
  baseURL: apiUrl
});


export async function getData(endpoint, params) {
  try {
    const response = await api.get(endpoint, { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

export async function postData(endpoint, data, options = {}) {
  try {
    const response = await api.post(endpoint, data, options);
    return response.data;
  } catch (error) {
    console.error('Error posting data:', error);
    throw error;
  }
}

export async function putData(endpoint, data, options = {}) {
  try {
    const response = await api.put(endpoint, data, options);
    return response.data;
  } catch (error) {
    console.error('Error putting data:', error);
    throw error;
  }
}

export async function deleteData(endpoint) {
  try {
    const response = await api.delete(endpoint);
    return response;
  } catch (error) {
    console.error('Error deleting data:', error);
    throw error;
  }
}

export default { getData, postData, putData, deleteData }