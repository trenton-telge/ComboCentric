/* eslint-disable no-async-promise-executor */
import axios from "axios";

const url = "http://localhost:5000"

class ComboService {
    static postCombo(combo) {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.post(`${url}/combo`, {combo});
                const data = res.data
                resolve(data)
            } catch (e) {
                console.error(e);
                reject(e.message);
            }
        })
    }
    static getComboByID(comboID) {
        return new Promise( async (resolve, reject) => {
            try {
                const res = await axios.get(`${url}/combo/${comboID}`);
                const data = res.data;
                resolve(data)
            }  catch (e) {
                console.error(e);
                reject(e.message);
            }
        })
    }
    static getRandomCombos(num) {
        return new Promise( async (resolve, reject) => {
            try {
                const res = await axios.get(`${url}/combo/random/${num}`);
                const data = res.data;
                resolve(data)
            }  catch (e) {
                console.error(e);
                reject(e.message);
            }
        })
    }
    static getCombosByUserID(userID) {
        return new Promise( async (resolve, reject) => {
            try {
                const res = await axios.get(`${url}/combo/user/${userID}`);
                const data = res.data;
                resolve(data)
            }  catch (e) {
                console.error(e);
                reject(e.message);
            }
        })
    }
    static deleteCombo(comboID) {
        return new Promise(async  (resolve, reject) => {
            try {
                const res = await axios.delete(`${url}/combo/${comboID}`);
                const data = res.data;
                resolve(data);
            } catch (e) {
                console.error(e);
                reject(e.message)
            }
        })
    }
}

export default ComboService;