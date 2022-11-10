import { getAll, getById, save, update } from "./http.service";

// const url = `${process.env.REACT_APP_BE_URL}api/usercourse`;
const url = `http://192.168.1.102:1035/api/users`;

export const getUserByEmail = async (email) => {
  const response = await getById(url + "/email", email);
  return response;
};
