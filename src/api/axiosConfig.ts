import axios from 'axios'
const axiosInstance = axios.create({
  baseURL: "https://api.ebsscholarshipboard.org/api/v1",
  withCredentials: true,
})


export const getResult = (url: string) => axiosInstance.get(url);

export const postResult = (url: string, data: any) => axiosInstance.post(url, data);

export const putResult = (url: string, data: any) => axiosInstance.put(url, data);

export const deleteResult = (url: string) => axiosInstance.delete(url);


export default axiosInstance
