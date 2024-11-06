import axios, { AxiosInstance } from "axios";

class Http {
  instance: AxiosInstance;
  constructor() {
    this.instance = axios.create({
      baseURL: "https://api.foodie.town",
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
  }
}

const http = new Http().instance;

export default http;
