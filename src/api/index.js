// import { loginApi } from "./constants"

import { LOCALSTORAGE_TOKEN_KEY, loginApi, registerApi } from "./constants";
import { getFormBody } from "./helper";


const customFetch = async (url, { body, ...customConfig }) => {
    const token = window.localStorage.getItem(LOCALSTORAGE_TOKEN_KEY);
  
    const headers = {
      'content-type': 'application/x-www-form-urlencoded',
    };
  
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
  
    const config = {
      ...customConfig,
      headers: {
        ...headers,
        ...customConfig.headers,
      },
    };
    if (body) {
      config.body =getFormBody(body);
    }
    // console.log("getform ",getFormBody(body))
  
    try {
      const response = await fetch(url,config);
      return await response.json();
         
  
    } catch (error) {
      console.error('error');
      return {
          data : error.message,
          success: false
      }
    }
  };
  




export const userLogin =  (email,password) => {
 
    return customFetch(loginApi,{
        method : 'POST',
        body : {
             email,password
        }
    })
}

export const userRegister = (body) => {
  return customFetch(registerApi,{
    method : 'POST',
    body
  })
}



