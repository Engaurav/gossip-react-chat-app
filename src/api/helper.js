export const getFormBody = (body) => {
    let formBody = [];
    for(let property in body){
        let encodeKey = encodeURIComponent(property); // 'user name' => 'user%20name'
        let encodedValue = encodeURIComponent(body[property]); //aakash 123 => aakash%2020123


        formBody.push(encodeKey+ "=" + encodedValue);
    }
    return formBody.join('&'); // 'username=aakash&password=123213'

}

export const setItemInLocalStorage = (key,value) =>{
    if(!key || !value){
      return console.log("Can't stor in local storage");
    }
    const valueToStore = typeof value !== 'string' ? JSON.stringify(value): value;
    localStorage.setItem(key,valueToStore);
  }
  
  export const getItemFromLocalStorage = (key) =>{
    if(!key ){
      return console.log("Can't find key in local storage");
    }
    return localStorage.getItem(key);
  }
  
  export const removeItemFromLocalStorage = (key) =>{
    if(!key ){
      return console.log("Can't find key in local storage");
    }
    localStorage.removeItem(key);
  }