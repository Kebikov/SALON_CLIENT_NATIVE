import axios from 'axios';

const baseLink = `${process.env.START_URL}${process.env.PORT}`;

console.log(baseLink);

export const httpRegistration = axios.create({
    baseURL: `${baseLink}/api/registration`
})