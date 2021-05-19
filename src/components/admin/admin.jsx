import React, {useEffect, useState} from 'react';
import Modal from "react-bootstrap/Modal";
import {authApi} from "../../utils/API";
import style from './admin.module.css'
import SearchField from 'react-search-field';
import AdminArtist from "../admin-artist/admin-artist";
import {Col, Row, Toast} from "react-bootstrap";
import Button from "react-bootstrap/Button";

const Admin = () => {

    const [searchState, setSearchState] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [artist, setArtist] = useState("");
    const [artistAdmin, setArtistAdmin] = useState({
        artistName: "",
        image: "",
        albums: []
    })

    const [showNotification, setShowNotification] = useState(false);
    const [textNotification, setTextNotification] = useState('');

    useEffect(() => {
        fetch(`https://itunes.apple.com/search?term=${searchState}&country=us&entity=musicArtist&limit=50`)
            .then(res => res.text())
            .then(res => {
                let response = JSON.parse(res).results;
                const artists = [];
                for (let item of response) {
                    artists.push({
                        artistId: item.artistId,
                        artistName: item.artistName
                    })
                }
                setSearchResult(artists);
            })
    }, [searchState]);

    useEffect(async () => {
        let albumsEPs = [];

        const response = await fetch(`https://itunes.apple.com/WebObjects/MZStore.woa/wa/viewArtistSeeAll?ids=${artist}&country=us&section=0`);
        const res = await response.text();
        const songsEntry = JSON.parse(res);
        const artistEntity = songsEntry['storePlatformData']['webexp-product']['results'][artist];
        const url = artistEntity['artwork']['url'].replace('{w}x{h}bb.{f}', '300x300cb.png');
        const name = artistEntity.name;
        let albumsEntry;
        let epsEntry;
        for (let i = 0; i < 6; i++) {
            const responseAlbum = await fetch(`https://itunes.apple.com/WebObjects/MZStore.woa/wa/viewArtistSeeAll?ids=${artist}&country=us&section=${i}`);
            const resAlbum = await responseAlbum.text();
            const albumEntity = JSON.parse(resAlbum);
            const albums = albumEntity.pageData.adamIds;
            const title = albumEntity.pageData.title;
            if (title === 'Albums') {
                albumsEPs = [...albums, ...albumsEPs];
                albumsEntry = albumEntity;
            } else if (title === 'Singles & EPs') {
                albumsEPs = [...albums, ...albumsEPs]
                epsEntry = albumEntity;
            }
        }
        setArtistAdmin({
            artistName: name,
            image: url,
            albums: albumsEPs
        })
        console.log(albumsEPs);
    }, [artist])

    const loadArtist = (event) => {
        const artistId = event.target.value;
        setArtist(artistId);
    }

    const buttons = searchResult.map(item =>
        <button key={item.artistId} onClick={loadArtist} value={item.artistId}
                className="btn btn-light">{item.artistName}</button>
    )

    const artistAdminDiv = <AdminArtist id={artist} artistName={artistAdmin.artistName} albums={artistAdmin.albums}
                                        image={artistAdmin.image} textNotification={textNotification}
                                        showNotification={showNotification} setShowNotification={setShowNotification}
                                        setTextNotification={setTextNotification}/>

    const onEnter = (value, event) => {
        setSearchState(value);
    }


    function InfoWindow({textNotification, showNotification, setShowNotification}) {
        const getTime = () => {
            const timeInMs = Date.now();
            const now = new Date(timeInMs);
            return `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
        }

        return (
            <Row>
                <Col xs={6}>
                    <Toast onClose={() => setShowNotification(false)} show={showNotification} delay={3000} autohide>
                        <Toast.Header>
                            <strong className="mr-auto">Info</strong>
                            <small>
                                {
                                    getTime()
                                }
                            </small>
                        </Toast.Header>
                        <Toast.Body>{textNotification}</Toast.Body>
                    </Toast>
                </Col>
            </Row>
        );
    }

    return (
        <div>
            <div className={style.toast}>
                <InfoWindow setShowNotification={setShowNotification} showNotification={showNotification}
                            textNotification={textNotification}/>
            </div>
            <div className={style.header}>
                <h1>Admin Page</h1>
                <SearchField classNames={style.search}
                             placeholder='Search item'
                             onEnter={onEnter}
                />
            </div>
            <div className={style.dashboard}>
                <div className={style.searchResult}>
                    {buttons}
                </div>
                <div className={style.artist}>
                    {artistAdminDiv}
                </div>
            </div>
        </div>
    )
}

export default Admin;