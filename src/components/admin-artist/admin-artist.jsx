import React, {useEffect, useState} from 'react';
import Modal from "react-bootstrap/Modal";
import style from './admin-artist.module.css'
import AdminAlbum from "../admin-album/admin-album";
import {Alert} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import API from '../../utils/API'


const AdminArtist = ({
                         setTextNotification,
                         textNotification,
                         showNotification,
                         setShowNotification,
                         artistName,
                         image,
                         albums,
                         id
                     }) => {

    const [idAlbums, setIdAlbums] = useState([]);

    const albumsItems = albums.map(item => <AdminAlbum key={item} setTextNotification={setTextNotification}
                                                       setShowNotification={setShowNotification} ids={item}/>)

    const addArtist = () => {
        API.artist.addArtist(id)
            .then(response => response.data)
            .then(response => {
                if(response.type !== undefined){
                    setTextNotification(response.message);
                    setShowNotification(true);
                }
                else{
                    setTextNotification('Artist successfully added');
                    setShowNotification(true);
                }
            }).catch(error => {
            console.log(error);
        })
    }

    return (
        <div>
            <div className={style.header}>
                <img src={image} alt={artistName}/>
                <div className={style.name}>
                    <div className={style.controlBlock}>
                        <h1 className="display-1">{artistName}</h1>
                        <Button onClick={() => addArtist()}
                                variant="light">
                            Add
                        </Button>
                        <Button //onClick={() => setAudioSource(item.previewUrl)}
                            variant="light">
                            Remove
                        </Button>
                    </div>
                </div>
            </div>
            <div className={style.content}>
                {albumsItems}
            </div>
        </div>
    )
}

export default AdminArtist;