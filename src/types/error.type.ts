// App Error Codes
export enum AppErrorCode {
  INTERNAL_ERROR = "INTERNAL_ERROR",
  UNEXPECTED_ERROR = "UNEXPECTED_ERROR",
  MISSING_REQUIRED_FIELD = "MISSING_REQUIRED_FIELD",
  ERR_BAD_REQUEST = "ERR_BAD_REQUEST",
}

// Authentication Error Codes
export enum AuthErrorCode {
  NOT_AUTHENTICATED = "NOT_AUTHENTICATED",
  NOT_AUTHORIZED = "NOT_AUTHORIZED",
  EMAIL_NOT_VERIFIED = "EMAIL_NOT_VERIFIED",
  INVALID_CREDENTIALS = "INVALID_CREDENTIALS",
}

// Dish Error Codes
export enum DishErrorCode {
  DISH_NOT_FOUND = "DISH_NOT_FOUND",
  INVALID_DISH_DATA = "INVALID_DISH_DATA",
  RESTAURANT_NOT_FOUND = "RESTAURANT_NOT_FOUND",
  NOT_RESTAURANT_OWNER = "NOT_RESTAURANT_OWNER",
  NAME_ALREADY_EXISTS = "NAME_ALREADY_EXISTS",
  ALREADY_REVIEWED = "ALREADY_REVIEWED",
  REVIEW_NOT_FOUND = "REVIEW_NOT_FOUND",
}

// Promotion Error Codes
export enum PromotionErrorCode {
  PROMOTION_NOT_FOUND = "PROMOTION_NOT_FOUND",
  PROMOTION_DISH_NOT_FOUND = "PROMOTION_DISH_NOT_FOUND",
}

// Restaurant Error Codes
export enum RestaurantErrorCode {
  RESTAURANT_NOT_EXIST = "RESTAURANT_NOT_EXIST",
  RESTAURANT_UPLOAD_PARTIAL = "RESTAURANT_UPLOAD_PARTIAL",
  INCORRECT_COORDINATES = "INCORRECT_COORDINATES",
  IMAGE_NOT_EXIST = "IMAGE_NOT_EXIST",
  DISH_CATEGORY_ALREADY_EXIST = "DISH_CATEGORY_ALREADY_EXIST",
  DISH_CATEGORY_NOT_EXIST = "DISH_CATEGORY_NOT_EXIST",
  NOT_OWNER = "NOT_OWNER",
  DUPLICATE_NAME = "DUPLICATE_NAME",
  UNSUPPORTED_QUERY = "UNSUPPORTED_QUERY",
  ALREADY_REVIEWED = "ALREADY_REVIEWED",
  REVIEW_NOT_EXIST = "REVIEW_NOT_EXIST",
}

// Social Error Codes
export enum SocialErrorCode {
  RESTAURANT_NOT_FOUND = "RESTAURANT_NOT_FOUND",
  SOCIAL_ALREADY_EXISTS = "SOCIAL_ALREADY_EXISTS",
  SOCIAL_NOT_FOUND = "SOCIAL_NOT_FOUND",
}

// Upload Error Codes
export enum UploadErrorCode {
  TYPE_NOT_ALLOWED = "TYPE_NOT_ALLOWED",
  EXCEED_MAX_SIZE = "EXCEED_MAX_SIZE",
}

// User Error Codes
export enum UserErrorCode {
  USER_NOT_FOUND = "USER_NOT_FOUND",
  USERNAME_ALREADY_EXISTS = "USERNAME_ALREADY_EXISTS",
  EMAIL_ALREADY_EXISTS = "EMAIL_ALREADY_EXISTS",
  PASSWORD_MISMATCH = "PASSWORD_MISMATCH",
  PASSWORD_NOT_VALID = "PASSWORD_NOT_VALID",
}

// Verification Error Codes
export enum VerificationErrorCode {
  USER_NOT_FOUND = "USER_NOT_FOUND",
  EMAIL_ALREADY_CONFIRMED = "EMAIL_ALREADY_CONFIRMED",
  EMAIL_TOKEN_INVALID = "EMAIL_TOKEN_INVALID",
}

// Combined Error Codes (if you need all error codes in one place)
export const ErrorCode = {
  ...AppErrorCode,
  ...AuthErrorCode,
  ...DishErrorCode,
  ...PromotionErrorCode,
  ...RestaurantErrorCode,
  ...SocialErrorCode,
  ...UploadErrorCode,
  ...UserErrorCode,
  ...VerificationErrorCode,
} as const;

export type ErrorCodeType = (typeof ErrorCode)[keyof typeof ErrorCode];

export type ErrorType = {
  code: ErrorCodeType;
  message: string;
};
