import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

class AuthService {
  login(name, password) {
    return axios
      .post(API_URL + "login", {
        name,
        password,
      })
      .then((response) => {
        if (response.data.token) {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem(
            "user",
            JSON.stringify({
              name: response.data.username,
              id: response.data.id,
            })
          );
        }
        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }

  register(username, password, email) {
    return axios.post(API_URL + "register", {
      name: username,
      password,
      email,
    });
  }

  isUserAuthenticated = () => {
    return axios.get(API_URL + "isUserAuth", {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    });
  };
}

export default new AuthService();
