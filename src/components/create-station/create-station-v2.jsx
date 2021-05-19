import React, {useEffect, useState} from "react";
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import uuid from "uuid/v4";
import SearchField from "../search-field/search-field";
import API from '../../utils/API';
import style from './create-station.module.css'
import Button from "react-bootstrap/Button";
import socketIOClient from "socket.io-client";

function CreateStation({setModalShow, setCurrentPlaylist}) {

    const [searchColumnId, setSearchColumnId] = useState(uuid())
    const [playlistColumnId, setPlaylistColumnId] = useState(uuid())
    const [userSongsColumnId, setUserSongsColumnId] = useState(uuid())



    useEffect(async () => {
        const response = await API.user.favourites();
        const songs = response.data;
        setFavourites(songs.map(item => {
            return {
                id: uuid(),
                songId: item.id,
                albumId: item.albumId,
                songName: item.songName,
                artistName: item.artistName,
                albumName: item.albumName,
                cover: item.cover,
                m3u8: item.m3u8,
                isAdded: item.isAdded
            }
        }))
    }, [])


    const onDragEnd = (result, columns, setColumns) => {
        if (!result.destination) return;
        const {source, destination} = result;

        if (source.droppableId !== destination.droppableId) {
            const sourceColumn = columns[source.droppableId];
            const destColumn = columns[destination.droppableId];
            const sourceItems = [...sourceColumn.items];
            const destItems = [...destColumn.items];
            const [removed] = sourceItems.splice(source.index, 1);
            destItems.splice(destination.index, 0, removed);
            setColumns({
                ...columns,
                [source.droppableId]: {
                    ...sourceColumn,
                    items: sourceItems
                },
                [destination.droppableId]: {
                    ...destColumn,
                    items: destItems
                }
            });
        } else {
            const column = columns[source.droppableId];
            const copiedItems = [...column.items];
            const [removed] = copiedItems.splice(source.index, 1);
            copiedItems.splice(destination.index, 0, removed);
            setColumns({
                ...columns,
                [source.droppableId]: {
                    ...column,
                    items: copiedItems
                }
            });
        }
    };

    const submitForm = (event) => {
        event.preventDefault()
        const term = event.target.elements.search.value;
        if (term) {
            songApi.searchSongs(term)
                .then(result => {
                    return result.data;
                })
                .then(data => {
                    setSearchResult(data.map(item => {
                        return {
                            id: uuid(),
                            songId: item.id,
                            albumId: item.albumId,
                            songName: item.songName,
                            artistName: item.artistName,
                            albumName: item.albumName,
                            cover: item.cover,
                            m3u8: item.m3u8,
                            isAdded: item.isAdded
                        }
                    }))
                    //setSearchResult(data);
                })
                .catch(error => {
                    console.log(error);
                })
        }

    }

    const songApi = API.song;

    const [searchResult, setSearchResult] = useState([]);
    const [favourites, setFavourites] = useState([]);

    useEffect(() => {
        columns[searchColumnId].items = searchResult;
        setColumns(columns);
    }, [searchResult]);

    useEffect(() => {
        columns[userSongsColumnId].items = favourites;
        setColumns(columns);
    }, [favourites]);


    const [columns, setColumns] = useState({
        [searchColumnId]: {
            name: "Search Result",
            items: searchResult
        },
        [playlistColumnId]: {
            name: "Playlist Songs",
            items: []
        },
        [userSongsColumnId]: {
            name: "My Favourites",
            items: favourites
        }
    })

    const [audio, setAudio] = useState(new Audio(''));

    function play(url) {
        audio.src = url;
        audio.play();
    }

    function pause() {
        audio.pause();
    }

    const playClick = (e, item) => {
        console.log(item);
        if (e.target.textContent === 'Stop') {
            e.target.textContent = "Play";
            pause()
        } else {
            e.target.textContent = "Stop";
            play(item.m3u8)
        }
    }

    const clickSong = (event, songId, is) => {
        if (is === -1) {
            //add
            API.user.addSong(songId)
                .then(result => result.data)
                .then(result => {
                    console.log(result);
                })
                .catch(error => {
                    console.log(error);
                })
            //todo change hostname
            event.target.style.backgroundImage = "url(\"https://api.gspp.space/images/remove.svg\")"
        } else {
            //remove
            API.user.removeSong(songId)
                .then(result => result.data)
                .then(result => {
                    console.log(result);
                })
                .catch(error => {
                    console.log(error);
                })
            //todo change hostname
            event.target.style.backgroundImage = "url(\"https://api.gspp.space/images/add.svg\")"
        }
    }

    const createStation = (event) => {
        event.preventDefault();
        audio.pause();
        setModalShow(false);
        const name = event.target.elements.name.value;
        const time = event.target.elements.time.value.split(':');
        const date = event.target.elements.date.value.split('-');
        const dateOfAvailability = new Date(date[0], parseInt(date[1]) - 1, date[2], time[0], time[1]);
        const songs = columns[playlistColumnId].items.map(item => item.songId);
        API.station.addStation(songs, name, dateOfAvailability)
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            })
    }

    const getMinDate = () => {
        const date = new Date();
        let dd = String(date.getDate()).padStart(2, '0');
        //debugger;
        return `${date.getFullYear()}-${date.getMonth() + 1}-${dd}`;
    }

    return (
        <>
            <div>
                <SearchField handleSubmit={submitForm}/>
            </div>
            <div className={style.board}>
                <DragDropContext
                    onDragEnd={result => onDragEnd(result, columns, setColumns)}
                >
                    {Object.entries(columns).map(([columnId, column], index) => {
                        return (
                            <div
                                key={columnId}
                            >
                                <h2>{column.name}</h2>
                                <div style={{margin: 8}} className={style.column}>
                                    <Droppable droppableId={columnId} key={columnId}>
                                        {(provided, snapshot) => {
                                            return (
                                                <div className={style.columnItems}
                                                     {...provided.droppableProps}
                                                     ref={provided.innerRef}
                                                     style={{
                                                         background: snapshot.isDraggingOver
                                                             ? '#e9e9e9'
                                                             : "#ffffff"
                                                     }}
                                                >
                                                    {column.items.map((item, index) => {
                                                        return (
                                                            <Draggable
                                                                key={item.id}
                                                                draggableId={item.id}
                                                                index={index}
                                                            >
                                                                {(provided, snapshot) => {
                                                                    return (
                                                                        <div className={style.item}
                                                                             ref={provided.innerRef}
                                                                             {...provided.draggableProps}
                                                                             {...provided.dragHandleProps}
                                                                             style={{
                                                                                 userSelect: "none",
                                                                                 minHeight: "50px",
                                                                                 // backgroundColor: snapshot.isDragging
                                                                                 //     ? "#b8d0e2"
                                                                                 //     : "#456C86",
                                                                                 backgroundImage: `url(${item.cover})`,
                                                                                 backgroundColor: '#ffffff',
                                                                                 backgroundPosition: 'center',
                                                                                 color: "white",
                                                                                 ...provided.draggableProps.style
                                                                             }}
                                                                        >
                                                                            <div className={style.text}>
                                                                                <p>{item.songName}</p>
                                                                                <h6>{item.artistName}</h6>
                                                                            </div>

                                                                            <div className={style.buttons}>
                                                                                <button className={style.play}
                                                                                        onClick={(e) => playClick(e, item)}>Play
                                                                                </button>
                                                                                {
                                                                                    <button className={style.add}
                                                                                            style={{
                                                                                                backgroundColor: 'rgba(0, 0, 0, .4)',
                                                                                                //todo change hostname
                                                                                                backgroundImage: item.isAdded === -1 ?
                                                                                                    `url("https://api.gspp.space/images/add.svg")`
                                                                                                    : `url("https://api.gspp.space/images/remove.svg")`,
                                                                                                height: 30,
                                                                                                width: 30,
                                                                                                borderRadius: 20
                                                                                            }}
                                                                                            onClick={(e) => {
                                                                                                clickSong(e, item.songId, item.isAdded)
                                                                                                item.isAdded = item.isAdded === -1 ? 1 : -1;
                                                                                            }}/>

                                                                                }

                                                                            </div>

                                                                        </div>
                                                                    );
                                                                }}
                                                            </Draggable>
                                                        );
                                                    })}
                                                    {provided.placeholder}
                                                </div>
                                            );
                                        }}
                                    </Droppable>
                                </div>
                            </div>
                        )
                            ;
                    })}
                </DragDropContext>
            </div>
            <form onSubmit={createStation}>
                <div className="form-group">
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text">Name</span>
                        </div>
                        <input className="form-control" required name="name" type="text"
                               placeholder="Enter name of station"/>
                    </div>
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text">Start streaming</span>
                        </div>
                        <input min={getMinDate()} className="form-control" required name="date" type="date"/>
                        <input className="form-control" required name="time" type="time"/>
                    </div>
                </div>
                <div className={style.buttonsDown}>
                    <Button type={"submit"} variant="primary">Create</Button>
                    <Button onClick={() => {
                        setModalShow(false);
                        audio.pause();
                    }} variant="dark">Close</Button>
                </div>
            </form>

        </>
    );
}

export default CreateStation;
