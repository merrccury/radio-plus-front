import style from "./create-station.module.css";
import React, {useEffect, useState} from 'react';
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import API from '../../utils/API';
import SearchField from "../search-field/search-field";


const CreateStation = ({userSongs, setPlaylistSongs, setModalShow}) => {

    const songApi = API.song;

    const [searchResult, setSearchResult] = useState([]);

    const [boards, setBoards] = useState([
        {
            id: 1, title: 'Search songs',
            items: searchResult
        },
        {
            id: 2, title: 'Playlist songs',
            items: []
        },
        {
            id: 3, title: 'My songs',
            items: [
                {songId: 3, songName: "Prisoner", artistName: 'Miley Cyrus', albumName: 'Plastic Heart'},
                {songId: 4, songName: "Good for you", artistName: 'Selena Gomez', albumName: 'Selena\'s album'}
            ]

        }
    ])

    useEffect(() => {
        setBoards([{items: searchResult, ...boards}, boards[1], boards[2]])
    }, [searchResult])

    const [currentBoard, setCurrentBoard] = useState(null);
    const [currentItem, setCurrentItem] = useState(null);

    function dragOverHandler(e) {
        e.preventDefault();
        if (e.target.className === style.item)
            e.target.style.boxShadow = '0 4px 3px gray'
    }

    function dragLeaveHandler(e) {
        e.target.style.boxShadow = 'none'

    }

    function dragStartHandler(e, board, item) {
        setCurrentBoard(board);
        setCurrentItem(item);
    }

    function dragEndHandler(e) {
        e.target.style.boxShadow = 'none'

    }

    function dropHandler(e, board, item) {
        e.preventDefault();
        const currentIndex = currentBoard.items.indexOf(currentItem);
        currentBoard.items.splice(currentIndex, 1);
        const dropIndex = board.items.indexOf(item);
        board.items.splice(dropIndex + 1, 0, currentItem);
        setBoards(boards.map(b => {
            if (b.id === board.id) {
                return board;
            }
            if (b.id === currentBoard.id) {
                return currentBoard
            }

            return b;
        }))
        e.target.style.boxShadow = 'none';
    }

    function dropBoardHandler(e, board) {
        if (e.target.className !== style.item) {
            board.items.push(currentItem);
            const currentIndex = currentBoard.items.indexOf(currentItem);
            currentBoard.items.splice(currentIndex, 1);
            setBoards(boards.map(b => {
                if (b.id === board.id) {
                    return board;
                }
                if (b.id === currentBoard.id) {
                    return currentBoard
                }
                return b;
            }))
            e.target.style.boxShadow = 'none';
        }
    }

    function play(url) {
        if (window.pljssglobal.length > 0) {
            window.pljssglobal[0].api("play", "https://www.maxradio.ca/UHD/Maxv1/80k/Max.m3u8");
        }
    }

    function pause() {
        if (window.pljssglobal.length > 0) {
            window.pljssglobal[0].api("pause");
        }
    }



    const submitForm = (event) => {
        event.preventDefault()
        const term = event.target.elements.search.value;
        if (term) {
            songApi.searchSongs(term)
                .then(result => {
                    return result.data;
                })
                .then(data => {
                    console.log(data);
                    setSearchResult(data);
                })
                .catch(error => {
                    console.log(error);
                })
        }

    }

    return (
        <>
            <div className={style.searchField}>
                <SearchField handleSubmit={submitForm}/>
            </div>
            <div className={style.stDashboard}>

                {
                    boards.map(board =>
                        <div
                            key={board.id}
                            className={style.board}
                            onDragOver={e => dragOverHandler(e)}
                            onDrop={e => dropBoardHandler(e, board)}
                        >
                            <div className={style.boardTitle}>{board.title}</div>
                            <div className={style.songs}>
                                {
                                    board.items.map(item =>
                                        <div
                                            key={item.id}
                                            onDragOver={(e) => dragOverHandler(e)}
                                            onDragLeave={e => dragLeaveHandler(e)}
                                            onDragStart={e => dragStartHandler(e, board, item)}
                                            onDragEnd={e => dragEndHandler(e)}
                                            onDrop={e => dropHandler(e, board, item)}
                                            draggable={true}
                                            className={style.item}

                                        >
                                            <Play/>
                                            <div>
                                                <p>{item.songName}</p>
                                                <p>{item.artistName}</p>
                                                <p>{item.albumName}</p>
                                            </div>

                                        </div>)
                                }
                            </div>

                        </div>
                    )
                }
            </div>
            <div className={style.buttons}>
                <Button onClick={() => {
                    setPlaylistSongs(boards[1].items);
                    setModalShow(false);
                }} variant="primary">Create</Button>
                <Button onClick={() => setModalShow(false)} variant="dark">Close</Button>

            </div>
        </>

    )
}

export default CreateStation;
