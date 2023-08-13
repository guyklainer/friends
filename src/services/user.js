import axios from "axios";
import consts from "../consts";

const getUser = async (address = consts.address) => {
    const res = await axios(`${consts.baseApi}/users/${address}`);
    return res.data;
}

export default getUser;