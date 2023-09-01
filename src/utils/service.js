import axios from "axios";

let service = axios.create({
    // baseURL: 'http://127.0.0.1:5000',
    baseURL: 'http://10.203.153.184:5000',
    timeout: 3000,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      'Access-Control-Allow-Origin': '*'
    },


  });

export default service;
