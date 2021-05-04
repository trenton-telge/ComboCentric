/* eslint-disable no-async-promise-executor */
import axios from "axios";

const url = "https://api.scryfall.com"

class ScryfallService {
    static getScryfallIDByName(name) {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.get(`${url}/cards/named?exact=${encodeURIComponent(name)}`);
                const data = res.data
                resolve(data.id)
            } catch (e) {
                console.error(e);
                reject(e.message);
            }
        })
    }
    static getPhotoByID(scryfallID) {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.get(`${url}/cards/${scryfallID}`);
                const data = res.data
                resolve(data.image_uris.normal)
            } catch (e) {
                console.error(e);
                reject(e.message);
            }
        })
    }
}

export default ScryfallService;