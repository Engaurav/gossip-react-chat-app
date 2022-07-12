const domain = 'http://localhost:8000'



export const registerApi = `${domain}/api/v1/users/register`;
export const loginApi = `${domain}/api/v1/users/create-session`;
export const searchApi = `${domain}/api/v1/friend/search`;
export const friendListFetchApi = `${domain}/api/v1/friend/fetch/lists`;
export const friendRequestSendApi = `${domain}/api/v1/friend/add/request`;
export const friendRequestAcceptApi = `${domain}/api/v1/friend/accept/request`;
export const friendRequestShowApi = `${domain}/api/v1/friend/fetch/request`;
export const friendRequestDeleteApi = `${domain}/api/v1/friend/delete/request`;
export const friendRequestListsApi = `${domain}/api/v1/friend/show/requests`;

export const friendDetailApi = `${domain}/api/v1/friend/fetch`;

// store chat constant
export const exportChatsApi = `${domain}/api/v1/chats/store`;

export const  LOCALSTORAGE_TOKEN_KEY = 'gossip'
