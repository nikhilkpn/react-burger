import axios from 'axios';

const instance = axios.create({
    baseURL:'https://react-burger-d0953.firebaseio.com/'
});

export default instance;