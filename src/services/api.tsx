// ******** Base Url **********
export const baseUrl = "http://upskilling-egypt.com:3000/api/v0";

// ******** Login ********
export const loginUrl = `${baseUrl}/admin/users/login`;
// ******** Register ********
export const regisrterUrl = `${baseUrl}/admin/users`;
// ******** Reset-Password ********
export const resetPassUrl = `${baseUrl}/admin/users/reset-password`;
// ******** Reset-Password ********
export const forgetPassUrl = `${baseUrl}/admin/users/forgot-password`;
// ******** Change-Password ********
export const changePassUrl = `${baseUrl}/admin/users/change-password`;
// export const forgetPassUrl = `${baseUrl}/admin/users/forgot-password`;
// ******* Get All Rooms *********
export const roomsUrl = `${baseUrl}/admin/rooms`
// ******* Create Rooms *********
export const addroomsUrl = `${baseUrl}/admin/rooms`
// ******* Rooms Details *********
export const roomsDetailsUrl = `${baseUrl}/admin/rooms/` //with id
// ******* Update Rooms *********
export const updateRoomsUrl = `${baseUrl}/admin/rooms/` //with id
// ******* Delete Rooms *********
export const deleteRoomsUrl = `${baseUrl}/admin/rooms/` //with id
// ******* Get All Rooms Facility*********
export const faciRoomsUrl = `${baseUrl}/admin/room-facilities`;