const {formatEther} = require("ethers");
const axios = require("axios");

const main = async (address) => {
    const price = await axios(`https://prod-api.kosetto.com/users/0x0f3245b0a3020ff661aa9ca80ad0487749d2446c`);
    let res2 = await axios(`https://prod-api.kosetto.com/users/0x0f3245b0a3020ff661aa9ca80ad0487749d2446c/token/trade-activity`);
    const trades = [...res2.data.users?.map(user => {
        // eslint-disable-next-line no-undef
        return formatEther(BigInt(user.ethAmount))
    })];
    // eslint-disable-next-line no-undef
    console.log(formatEther(BigInt(price.data.displayPrice)));
    while(res2.data?.users?.length > 0) {
        console.log("calling with "+res2.data.nextPageStart);
        res2 = await axios(`https://prod-api.kosetto.com/users/0x0f3245b0a3020ff661aa9ca80ad0487749d2446c/token/trade-activity?pageStart=${res2.data.nextPageStart}`);

        trades.push(...res2.data.users?.map(user => {
            // eslint-disable-next-line no-undef
            return formatEther(BigInt(user.ethAmount))
        }));
    }

    console.log(trades);
}

exports = main();