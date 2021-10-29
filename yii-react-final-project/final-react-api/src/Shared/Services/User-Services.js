import http from "./http-common";
export const getUserData = () => {
  return http.get("users/read");
};
export const deleteUser = (id) => {
  return http.put(`users/update?id=${id}`, { is_deleted: 1 });
};
export const addUser = (
  firstName,
  lastName,
  gender,
  userEmail,
  userProfile
) => {
  return http.post("users/create", {
    firstname: firstName,
    lastname: lastName,
    gender: gender,
    email_id: userEmail,
    pro_pic: userProfile,
  });
};
export const userSearch = (searchFirstName) => {
  return http.get(`users?filter[firstname][like]=${searchFirstName}`);
};
export const editUser = (
  id,
  firstName,
  lastName,
  gender,
  userEmail,
  userProfile
) => {
  return http.put(`users/update?id=${id}`, {
    firstname: firstName,
    lastname: lastName,
    gender: gender,
    email_id: userEmail,
    pro_pic: userProfile,
  });
};
export const sort = (sortBy) => {
  return http.get(`users?sort=${sortBy}`);
};
