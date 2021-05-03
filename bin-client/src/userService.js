import axios from "axios";

const url = "http://localhost:5000"

class UserService {
    static login(user) {
        // eslint-disable-next-line no-async-promise-executor
        return new Promise(async (resolve, reject) => {
          try {
              const res = await axios.post(`${url}/login`, {user})
              const data = res.data
              console.log(data)
              resolve(data)
          }  catch (e) {
              console.error(e);
              reject('Invalid Login.');
          }
        })
    }
    static register(user) {
        // eslint-disable-next-line no-async-promise-executor
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.post(`${url}/register`, {user});
                const data = res.data
                resolve(data)
            } catch (e) {
                console.error(e);
                reject(e.message);
            }
        })
    }
    static updateUser(user) {
        // eslint-disable-next-line no-async-promise-executor
        return new Promise( async (resolve, reject) => {
            try {
                const res = await axios.put(`${url}/user/${user._id}`, {user});
                const data = res.data;
                resolve(data)
            }  catch (e) {
                console.error(e);
                reject(e.message);
            }
        })
    }
    static deleteUser(id) {
        // eslint-disable-next-line no-async-promise-executor
        return new Promise(async  (resolve, reject) => {
            try {
                const res = await axios.delete(`${url}/user/${id}`);
                const data = res.data;
                resolve(data);
            } catch (e) {
                console.error(e);
                reject(e.message)
            }
        })
    }
}

export default UserService;