import axios from "axios";

export default {
  // Authenticates users
  authenticateUsers: function (user: { email: any; password: any }) {
    return axios.post("http://localhost:9042/users", {
      email: user.email,
      password: user.password,
    });
  },
};
