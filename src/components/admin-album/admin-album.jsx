import React, {useEffect, useState} from 'react';
import Modal from "react-bootstrap/Modal";
import style from './admin-album.module.css'
import Button from "react-bootstrap/Button";
import ReactAudioPlayer from 'react-audio-player';
import API from '../../utils/API'

function MyVerticallyCenteredModal({setShowNotification, setTextNotification, ...props}) {

    const [albums, setAlbums] = useState({
        album: {
            name: 'Album',
            copyright: 'copyright'
        },
        songs: []
    });
    const [songs, setSongs] = useState(props.songs)
    const [id, setId] = useState(props.ids);
    const [songItem, setSongItem] = useState([]);
    const [audioSource, setAudioSource] = useState('');

    useEffect(() => {
    }, [songs])

    useEffect(() => {
        API.song.parse(id)
            .then(res => res.data)
            .then(res => {
                const [album, ...songs] = res.results;
                const songEntities = songs.map(item => {
                    return {
                        trackName: item.trackName,
                        previewUrl: item.previewUrl,
                        trackId: item.trackId
                    }
                })
                setAlbums({
                    album: {
                        name: album.collectionName,
                        copyright: album.copyright
                    },
                    songs: songEntities
                })
            })
    }, [id]);

    const addAlbum = () => {
        API.album.addAlbum(id)
            .then(response => response.data)
            .then(response => {
                if (response.type !== undefined) {
                    setTextNotification(response.message);
                    setShowNotification(true);
                } else {
                    setTextNotification('Album successfully added');
                    setShowNotification(true);
                }
            }).catch(error => {
            setTextNotification('Album already exist');
            setShowNotification(true);
        })
        console.log('add', id);
    }

    const removeAlbum = () => {
        console.log('remove', id);
    }

    const addSong = (id) => {
        API.song.addSong(id)
            .then(response => response.data)
            .then(response => {
                if (response.type !== undefined) {
                    setTextNotification(response.message);
                    setShowNotification(true);
                } else {
                    console.log(response);
                    setTextNotification('Song successfully added');
                    setShowNotification(true);
                }
            }).catch(error => {
            setTextNotification('Song already exist');
            setShowNotification(true);
            console.log(error);
        })
    }

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    <div className={style.itemSong}>
                        {albums.album.name}
                        <Button className={style.addSongButton}
                                onClick={() => addAlbum()}
                                variant="light">
                            Add
                        </Button>
                        <Button className={style.removeSongButton}
                                onClick={() => removeAlbum()}
                                variant="light">
                            Remove
                        </Button>
                    </div>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {
                    <div className={style.songsList}>
                        {
                            albums.songs.map(item => {
                                return (
                                    <div key={item.trackName} className={style.itemSong}>
                                        <Button className={style.songButton}
                                                onClick={() => setAudioSource(item.previewUrl)}
                                                variant="light">
                                            {item.trackName}
                                        </Button>
                                        <Button className={style.addSongButton}
                                                onClick={() => addSong(item.trackId)}
                                                variant="light">
                                            Add
                                        </Button>
                                        <Button className={style.removeSongButton}
                                                onClick={() => setAudioSource(item.previewUrl)}
                                                variant="light">
                                            Remove
                                        </Button>
                                    </div>
                                )
                            })
                        }
                        <ReactAudioPlayer
                            className={style.audio}
                            src={audioSource}
                            autoPlay
                            controls
                        />
                    </div>
                }
            </Modal.Body>
            <Modal.Footer>
                <h6>{albums.album.copyright}</h6>
            </Modal.Footer>
        </Modal>
    );
}

function AdminAlbum({ids, setTextNotification, setShowNotification}) {
    const [modalShow, setModalShow] = React.useState(false);
    const [id, setId] = useState(ids);
    const [album, setAlbum] = useState({
        albumId: id,
        cover: '',
        name: ''
    })
    const [albumSongs, setAlbumSongs] = useState([]);
    useEffect(() => {
        fetch(`https://itunes.apple.com/lookup?id=${id}&entity=album&country=us`)
            .then(res => res.text())
            .then(res => {
                const items = JSON.parse(res).results;
                const entity = items[0];
                setAlbum({
                    albumId: id,
                    cover: entity.artworkUrl100.replace('100x100', '100x100'),
                    name: entity.collectionName
                })
                //setAlbumSongs(songs);
            })
    }, [id]);

    const card = (
        <Button variant="light" onClick={() => setModalShow(true)}>
            <img src={album.cover} alt={album.name}/>
            {album.name}
        </Button>
    );

    return (
        <div className={style.btn}>
            {card}
            <MyVerticallyCenteredModal
                setTextNotification={setTextNotification}
                setShowNotification={setShowNotification}
                ids={id}
                songs={albumSongs}
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </div>
    );
}

export default AdminAlbum;