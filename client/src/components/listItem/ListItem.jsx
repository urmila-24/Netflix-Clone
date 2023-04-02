import { Add, PlayArrow, ThumbDownAltOutlined, ThumbUpAltOutlined } from '@mui/icons-material'
import { useState, useEffect } from 'react'
import './listItem.scss'
import axios from "axios";
import { useNavigate } from 'react-router-dom'

const ListItem = ({ index, item }) => {

    const [isHovered, setIsHovered] = useState(false);
    const [movie, setMovie] = useState([]);
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/watch', { state: { movie } });
    }

    useEffect(() => {
        const getMovie = async () => {
            try {
                const res = await axios.get("movies/find/" + item, {
                    headers: {
                        token: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZTIzODQ0NzJiNjNmYzNhZjIzOGI5MyIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY1OTQzMzgwNywiZXhwIjoxNjU5ODY1ODA3fQ.lkDa7fyBXk2pZXHAiJwJhgLf70AOQYJ-NhZcDqxUQo4"
                    }
                });
                // console.log(res.data.img)
                setMovie(res.data);

            } catch (error) {
                console.log(error);
            }
        }
        getMovie();
    }, [item])

    return (
        <div onClick={handleClick}>
            <div className='listItem' style={{ left: isHovered && index * 225 - 50 + index * 2.5 }} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} >
                <img src={movie.img} alt="" />
                {isHovered && (<>
                    <video src={movie.trailer} autoPlay={true} loop />
                    <div className="itemInfo">
                        <div className="icons">
                            <PlayArrow className='icon' />
                            <Add className='icon' />
                            <ThumbUpAltOutlined className='icon' />
                            <ThumbDownAltOutlined className='icon' />
                        </div>
                        <div className="itemInfoTop">
                            <span>1 hr 25 min</span>
                            <span className='limit'>{movie.limit}</span>
                            <span>{movie.year}</span>
                        </div>
                        <div className="desc">
                            {movie.desc}
                        </div>
                        <div className="genre">{movie.genre}</div>
                    </div>
                </>)}

            </div >
        </div>
    )
}

export default ListItem