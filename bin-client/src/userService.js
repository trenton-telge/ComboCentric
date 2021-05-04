/* eslint-disable no-async-promise-executor */
import axios from "axios";

const url = "http://localhost:5000"

class UserService {
    static login(user) {
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
    static getUser(id) {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.get(`${url}/user/${id}`);
                const data = res.data;
                resolve(data);
            } catch (e) {
                console.error(e);
                reject(e.message);
            }
        })
    }
}

export default UserService;