import {
  AppErrorCode,
  ErrorCode,
  ErrorCodeType,
  ErrorType,
} from "@/types/error.type";
import axios, { AxiosInstance, AxiosError } from "axios";

// Base Error class
export class HttpError extends Error {
  constructor(
    public code: ErrorCodeType,
    message: string,
    public status?: number,
  ) {
    super(message);
    this.name = this.constructor.name;
    Object.setPrototypeOf(this, HttpError.prototype);
  }

  public toJSON(): ErrorType {
    return {
      code: this.code,
      message: this.message,
    };
  }
}

export const isErrorCode = (code: string): code is ErrorCodeType => {
  return Object.values(ErrorCode).includes(code as ErrorCodeType);
};

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

    this.instance.interceptors.request.use(
      (config) => {
        return config;
      },
      (error) => {
        return Promise.reject(error);
      },
    );

    this.instance.interceptors.response.use(
      (response) => response,
      (error: AxiosError<ErrorType>) => {
        if (error.response) {
          const { data, status } = error.response;
          throw new HttpError(data.code, data.message, status);
        } else if (error.request) {
          // Network error
          throw new HttpError(
            AppErrorCode.ERR_BAD_REQUEST,
            "A network error occurred",
          );
        } else {
          // Something happened in setting up the request
          throw new HttpError(
            AppErrorCode.UNEXPECTED_ERROR,
            error.message || "An unexpected error occurred",
          );
        }
      },
    );
  }
}

const http = new Http().instance;

export default http;
