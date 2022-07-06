// import { loginApi } from "./constants"

import { LOCALSTORAGE_TOKEN_KEY, loginApi } from "./constants";
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
    console.log("Body",body)
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
  




export const login =  (email,password) => {
 
    return customFetch(loginApi,{
        method : 'POST',
        body : {
             email,password
        }
    })
}



