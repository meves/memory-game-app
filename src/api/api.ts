import axios from "axios";
import { UserResultsType } from "../components/types/types";
import { UrlType } from "./types";

const instance = axios.create({
    withCredentials: true,
    baseURL: 'http://localhost:3000/'
});

export const API = {
    getUrls: async () => {
        const response = await instance.get<Array<UrlType>>(`urls`);
        return response;
    },
    getResults: async() => {
        const response = await instance.get<Array<UserResultsType>>(`results`);
        return response;
    },
    postUserResult: async (result: UserResultsType) => {
        const response = await instance.post<{}>(`results`, result);
        return response;
    }
}


/* import Image from '../assets/icons/balloon.png';

const baseUrl = 'http://localhost:3000/';

let data = null;
const getImage = () => {
    fetch(`${baseUrl}/url`).then(response => response.json).then(data => data);
}
 */

/* export const getImagesUrls = async () => {
    const response = await fetch(`${baseUrl}/`);
}

const imageUrl = "https://i.picsum.photos/id/566/200/300.jpg?hmac=gDpaVMLNupk7AufUDLFHttohsJ9-C17P7L-QKsVgUQU";
 */
/* (async () => {
  const response = await fetch(imageUrl)
  const imageBlob = await response.blob()
  const reader = new FileReader();
  reader.readAsDataURL(imageBlob);
  reader.onloadend = () => {
    const base64data = reader.result;
    console.log(base64data);
  }
})() */