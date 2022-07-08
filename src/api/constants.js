const domain = 'http://localhost:8000'



export const registerApi = `${domain}/api/v1/users/register`;
export const loginApi = `${domain}/api/v1/users/create-session`;
export const searchApi = `${domain}/api/v1/friend/search`;
export const friendRequestSendApi = `${domain}/api/v1/friend/add/request`;
export const friendRequestShowApi = `${domain}/api/v1/friend/fetch/request`;
export const friendRequestDeleteApi = `${domain}/api/v1/friend/delete/request`;


export const  LOCALSTORAGE_TOKEN_KEY = 'gossip'
