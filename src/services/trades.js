import axios from "axios";
import consts from "../consts";
import {formatEther} from "ethers";


const addData = (trades, users = []) => {
    trades.push(...users.map(user => {
        // eslint-disable-next-line no-undef
        return formatEther(BigInt(user.ethAmount))
    }));
}
const getTrades = async (address = consts.address) => {
    const url = `${consts.baseApi}/users/${address}/token/trade-activity`;
    const trades = [];
    let res = await axios(url);
    addData(trades, res?.data?.users);

    while(res.data?.users?.length > 0) {
        console.log("calling with " + res.data.nextPageStart);

        res = await axios(`${url}?pageStart=${res.data.nextPageStart}`);
        addData(trades, res?.data?.users);
    }

    trades.reverse();

    return trades;
}

export default getTrades;