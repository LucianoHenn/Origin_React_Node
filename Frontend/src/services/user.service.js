import axios from "axios";
import authHeader from "./auth-header";

const API_URL = process.env.REACT_APP_API_URL;

class UserService {
  getPublicContent() {
    return axios.get(API_URL + "all");
  }
  getUserBoard() {
    return axios.get(API_URL + "user", { headers: authHeader() });
  }
  getAllStocks() {
    return axios.get(
      API_URL + "stock/" + JSON.parse(localStorage.getItem("user")).id,
      { headers: authHeader() }
    );
  }
  deleteStock(symbol) {
    return axios.delete(
      API_URL + "stock/" + JSON.parse(localStorage.getItem("user")).id,
      {
        headers: authHeader(),
        data: {
          symbol,
        },
      }
    );
  }
  addStock(stock) {
    return axios.post(
      API_URL + "stock/" + JSON.parse(localStorage.getItem("user")).id,
      {
        ...stock,
      },
      { headers: authHeader() }
    );
  }
}

export default new UserService();
