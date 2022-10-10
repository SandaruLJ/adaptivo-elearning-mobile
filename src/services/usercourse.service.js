import { getAll, getById, save, update } from "./http.service";

// const url = `${process.env.REACT_APP_BE_URL}api/usercourse`;
const url = `http://192.168.1.102:1035/api/usercourse`;

export const enrollCourse = async (data) => {
  const response = await save(url, data);
  return response;
};
export const getAllCoursesByUserId = async (id) => {
  const response = await getById(url + "/user", id);
  return response;
};
export const getUserCourseById = async (id) => {
  const response = await getById(url, id);
  return response;
};
export const setCurrentUnit = async (data) => {
  const response = await update(url + "/currentunit", data);
  return response;
};
export const markComplete = async (data) => {
  const response = await update(url + "/markcomplete", data);
  return response;
};
export const markDuration = async (data) => {
  const response = await update(url + "/markduration", data);
  return response;
};

export const updateCurriculum = async (id, data) => {
  const response = await update(url + "/update-curriculum/" + id, data);
  return response;
};

export const setQuizScore = async (data) => {
  const response = await update(url + "/quizscore", data);
  return response;
};
