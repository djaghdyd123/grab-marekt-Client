export const API_URL =
  process.env.NODE_ENV === "production"
    ? "https://leisureking.herokuapp.com"
    : "http://localhost:8080";
