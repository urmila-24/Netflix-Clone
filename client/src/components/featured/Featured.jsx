import './featured.scss'
import { PlayArrow, InfoOutlined } from '@mui/icons-material';
import { useEffect, useState } from 'react'
import axios from 'axios';

const Featured = ({ type }) => {
    const [content, setContent] = useState({});
    // const imgTitle = "https://occ-0-1432-1433.1.nflxso.net/dnm/api/v6/LmEnxtiAuzezXBjYXPuDgfZ4zZQ/AAAABUZdeG1DrMstq-YKHZ-dA-cx2uQN_YbCYx7RABDk0y7F8ZK6nzgCz4bp5qJVgMizPbVpIvXrd4xMBQAuNe0xmuW2WjoeGMDn1cFO.webp?r=df1"

    useEffect(() => {
        const getRandomContent = async () => {
            try {
                const randomMovie = await axios.get(`movies/random${type ? "?type=" + type : ""}`, {
                    headers: {
                        token: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZTIzODQ0NzJiNjNmYzNhZjIzOGI5MyIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY1OTQzMzgwNywiZXhwIjoxNjU5ODY1ODA3fQ.lkDa7fyBXk2pZXHAiJwJhgLf70AOQYJ-NhZcDqxUQo4"
                    }
                });
                setContent(randomMovie.data[0]);
                // console.log(content);

            } catch (error) {
                console.log(error);
            }
        }
        getRandomContent();
    }, [type]);

    return (
        <div className='featured'>
            {type && (
                <div className="category">
                    <span>{type === 'movies' ? "Movies" : "Series"}</span>
                    <select name="genre" id="genre">
                        <option>Genre</option>
                        <option value="adventure">Adventure</option>
                        <option value="comedy">Comedy</option>
                        <option value="crime">Crime</option>
                        <option value="fantasy">Fantasy</option>
                        <option value="historical">Historical</option>
                        <option value="horror">Horror</option>
                        <option value="romance">Romance</option>
                        <option value="sci-fi">Sci-fi</option>
                        <option value="thriller">Thriller</option>
                        <option value="western">Western</option>
                        <option value="animation">Animation</option>
                        <option value="drama">Drama</option>
                        <option value="documentary">Documentary</option>
                    </select>
                </div>
            )}
            <img src={content.img} alt="" />

            <div className="info">
                <img src={content.imgTitle} alt="" />
                <span className="desc">{content.desc}</span>
                <div className="buttons">
                    <button className="play">
                        <PlayArrow />
                        <span>Play</span>
                    </button>
                    <button className="more">
                        <InfoOutlined />
                        <span>More</span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Featured