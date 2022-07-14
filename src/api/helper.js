
// function to covert body in url encoded format
export const getFormBody = (body) => {
    let formBody = [];
    for(let property in body){
        let encodeKey = encodeURIComponent(property); // 'user name' => 'user%20name'
        let encodedValue = encodeURIComponent(body[property]); //aakash 123 => aakash%2020123


        formBody.push(encodeKey+ "=" + encodedValue);
    }
    return formBody.join('&'); // 'username=aakash&password=123213'

}



// function to setup current user to browser
export const setItemInLocalStorage = (key,value) =>{
    if(!key || !value){
      return console.log("Can't stor in local storage");
    }
    const valueToStore = typeof value !== 'string' ? JSON.stringify(value): value;
    localStorage.setItem(key,valueToStore);
  }
  

  // function for getting current user from browser
  export const getItemFromLocalStorage = (key) =>{
    if(!key ){
      return console.log("Can't find key in local storage");
    }
    return localStorage.getItem(key);
  }
  
  // helper to logout deleted current user detail stored in browser
  export const removeItemFromLocalStorage = (key) =>{
    if(!key ){
      return console.log("Can't find key in local storage");
    }
    localStorage.removeItem(key);
  }