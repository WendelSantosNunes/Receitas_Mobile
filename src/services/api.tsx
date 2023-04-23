import axios from "axios";

/*
  // Rodar com IPV4: json-server --watch -d 180 --host xxxx db.json
*/

// Configuramos o axios 
const api = axios.create({
  baseURL: 'http://192.168.1.20:3000/'
})

// Agora podemos acessar isso em qualquer lugar 
export default api;