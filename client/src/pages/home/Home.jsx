import { useEffect, useState } from 'react';
import Featured from '../../components/featured/Featured'
import List from '../../components/list/List'
import Navbar from '../../components/navbar/Navbar'
import './home.scss'
import axios from "axios";

const Home = ({ type }) => {
    const [lists, setLists] = useState([]);
    const [genre, setGenre] = useState(null);

    useEffect(() => {
        const getRandomLists = async () => {
            try {
                const res = await axios.get(`lists${type ? "?type=" + type : ""}${genre ? "&genre=" + genre : ""}`, {
                    headers: {
                        token: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZTIzODQ0NzJiNjNmYzNhZjIzOGI5MyIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY1OTQzMzgwNywiZXhwIjoxNjU5ODY1ODA3fQ.lkDa7fyBXk2pZXHAiJwJhgLf70AOQYJ-NhZcDqxUQo4"
                    }
                })
                // console.log(res.data)
                setLists(res.data)
                // console.log(lists)

            } catch (error) {
                console.log(error);
            }
        };
        getRandomLists();
    }, [type, genre]);

    return (
        <div className='home'>
            <Navbar />
            <Featured type={type} />
            {lists.map(list => (
                <List list={list} key={list._id} />
            ))}

        </div>
    )
}

export default Home;