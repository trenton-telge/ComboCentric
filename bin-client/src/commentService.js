/* eslint-disable no-async-promise-executor */
import axios from "axios";

const url = "http://localhost:5000"

class CommentService {
    static postComment(comment) {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.post(`${url}/comment`, {comment});
                const data = res.data
                resolve(data)
            } catch (e) {
                console.error(e);
                reject(e.message);
            }
        })
    }
    static getCommentByID(commentID) {
        return new Promise( async (resolve, reject) => {
            try {
                const res = await axios.get(`${url}/comment/${commentID}`);
                const data = res.data;
                resolve(data)
            }  catch (e) {
                console.error(e);
                reject(e.message);
            }
        })
    }
    static getCommentsByComboID(comboID) {
        return new Promise( async (resolve, reject) => {
            try {
                const res = await axios.get(`${url}/comment/combo/${comboID}`);
                const data = res.data;
                resolve(data)
            }  catch (e) {
                console.error(e);
                reject(e.message);
            }
        })
    }
    static getCommentsByUserID(userID) {
        return new Promise( async (resolve, reject) => {
            try {
                const res = await axios.get(`${url}/comment/user/${userID}`);
                const data = res.data;
                resolve(data)
            }  catch (e) {
                console.error(e);
                reject(e.message);
            }
        })
    }
    static deleteComment(commentID) {
        return new Promise(async  (resolve, reject) => {
            try {
                const res = await axios.delete(`${url}/comment/${commentID}`);
                const data = res.data;
                resolve(data);
            } catch (e) {
                console.error(e);
                reject(e.message)
            }
        })
    }
}

export default CommentService;