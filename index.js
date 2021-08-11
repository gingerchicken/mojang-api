const axios = require('axios');
const API_BASE_URL      = 'https://api.mojang.com';
const SESSION_BASE_URL  = 'https://sessionserver.mojang.com';

class MojangAPI {
    constructor() {
        // TODO Something... maybe make an axios session or something...
    }

    #timestamp(time) {
        let unixTimestamp;

        if (time instanceof Date) {
            unixTimestamp = Math.ceil(time.getTime() / 1000);
        } else if (typeof time === 'number') {
            unixTimestamp = Math.ceil(time);
        } else {
            throw new Error('timestamp was not a Number or Date');
        }

        return unixTimestamp;
    }

    async #parseResp(axiPromise) {
        let resp = await axiPromise;
        let body = resp.data;

        if (body.error) throw new Error(`${body.error}: ${body.errorMessage}`);

        return body;
    }

    async uuidAt(username, time) {
        if (typeof username !== "string") throw new Error('username is not a string');

        let unixTimestamp = this.#timestamp(time);

        return await this.#parseResp(
            axios({
                url: `${API_BASE_URL}/users/profiles/minecraft/${encodeURIComponent(username)}?at=${unixTimestamp}`,
                method: 'get'
            })
        );
    }

    async nameHistory(uuid) {
        if (typeof uuid !== "string") throw new Error('uuid is not a string');

        return await this.#parseResp(
            axios({
                url: `${API_BASE_URL}/user/profiles/${encodeURIComponent(uuid)}/names`,
                method: 'get'
            })
        );
    }

    async nameToUuid(names) {
        let nameArray;
        if (names instanceof Array) nameArray = names;
        else if (typeof names === "string") nameArray = [names];
        else throw new Error('names is not a string or Array');

        return await this.#parseResp(
            axios({
                url: `${API_BASE_URL}/profiles/minecraft`,
                method: 'post',
                data: nameArray
            })
        );
    }

    async profile(uuid) {
        if (typeof uuid !== "string") throw new Error('uuid is not a string');

        return await this.#parseResp(
            axios({
                url: `${SESSION_BASE_URL}/session/minecraft/profile/${encodeURIComponent(uuid)}`,
                method: 'get'
            })
        );
    }
}

module.exports = MojangAPI;