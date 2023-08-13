import './App.css';
import {useCallback, useEffect, useState} from "react";
import {formatEther} from "ethers";
import consts from "./consts";
import {ChakraProvider} from '@chakra-ui/react';
import Chart from "./components/Chart";
import Filter from "./components/Filter";
import getUser from "./services/user";
import getTrades from "./services/trades";

function App() {
  const [points, setPoints] = useState([]);
  const [user, setUser] = useState(null);

  const get = useCallback(async (currentUser) => {
    setPoints([]);
    setPoints(await getTrades(currentUser?.address));
    setUser(await getUser(currentUser?.address));
  },[]);

  useEffect(() => {
    get();
  }, []);

  return (
    <div className="App">
      <ChakraProvider>
      <Filter setUser={get} />

      { user && points?.length ? <>
        {/* eslint-disable-next-line no-undef */}
        <span>Current price: {formatEther(BigInt(user.displayPrice))} ETH</span>
        <Chart data={points} user={user}/>
      </> : null }
      </ChakraProvider>
    </div>
  );
}

export default App;
