import { getAll, getById, save } from "./http.service";

// const url = `${process.env.REACT_APP_BE_URL}api/courses`;
const url = `http://192.168.1.102:1035/api/courses`;

export const addCourse = async (data) => {
  const savedCourse = await save(url, data);
  return savedCourse;
};
export const getAllCourses = async () => {
  const courses = await getAll(url);
  return courses;
};
export const getCourseById = async (id) => {
  console.log("In get course by id");
  const course = await getById(url, id);
  return course;
};
