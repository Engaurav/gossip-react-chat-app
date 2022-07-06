export const getFormBody = (body) => {
    let formBody = [];
    for(let property in body){
        let encodeKey = encodeURIComponent(property); // 'user name' => 'user%20name'
        let encodedValue = encodeURIComponent(body[property]); //aakash 123 => aakash%2020123


        formBody.push(encodeKey+ "=" + encodedValue);
    }
    return formBody.join('&'); // 'username=aakash&password=123213'

}