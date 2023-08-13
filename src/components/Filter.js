import {Input, InputGroup, InputLeftAddon, Select} from "@chakra-ui/react";
import {debounce} from "lodash";
import axios from "axios";
import consts from "../consts";
import {useState} from "react";

const Filter = ({setUser}) => {
    const [list, setList] = useState([]);
    const inputChange = async (event) => {
        if(event.target.value) {
            const search = await axios(`${consts.baseApi}/search/users?username=${event.target.value}`);

            if(search?.data?.users?.length > 0) {
                setList(search?.data?.users);

                if(search?.data?.users?.length === 1) {
                    setUser(search?.data?.users[0]);
                }
            }
        }
    }

    const changeUser = (e) => {
        setUser(list[e.target.value]);
    }

    return <>
        <InputGroup>
            <InputLeftAddon children='@'/>
            <Input type='tel' placeholder='Twitter Handle' onChange={debounce(inputChange, 500)}/>
        </InputGroup>
        <Select variant='outline' onChange={changeUser}>
            {list?.map?.((user, i) => <option key={i} value={i}>
                {user.twitterName}
            </option>)}
        </Select>
    </>;
}
export default Filter;