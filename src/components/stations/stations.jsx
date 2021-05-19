import React, {useEffect, useState} from 'react';
import style from './stations.module.css'
import Player from '../player/player';
import SearchField from "react-search-field";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import CreateStation from '../create-station/create-station-v2'
import API from '../../utils/API'
import StationList from "../stations-list/station-list";
import {NavLink} from "react-bootstrap";


const Stations = () => {

    const [userInfo, setUserInfo] = useState({
        firstName: '',
        lastName: '',
    });

    useEffect(async () => {
        const user = await API.user.whoAmI();
        setUserInfo({
            firstName: user.data.firstName,
            lastName: user.data.lastName
        });
    }, [])


    const [modalShow, setModalShow] = useState(false);
    const [searchState, setSearchState] = useState('');

    function CreateModal(props) {
        return (
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        <p className={"display-4 " + style.titleHeader}>Create new station</p>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <CreateStation setCurrentPlaylist={props.setCurrentPlaylist} setModalShow={setModalShow}/>
                </Modal.Body>
            </Modal>
        );
    }

    const onEnter = (value, event) => {
        setSearchState(value);
    }

    const [currentPlaylist, setCurrentPlaylist] = useState({
        m3u8: "",
        station: -1
    });
    const [disBtn, setDisBtn] = useState(true);

    return (
        <div className={style.mainBoard}>
            <div className={style.header}>
                <div className={style.logo}>
                    <p className={'display-1 ' + style.logoRadio}>Radio+</p>
                    <p className={'display-4' + style.logoName}>Welcome,<br/> {userInfo.firstName} {userInfo.lastName}
                        <NavLink to="/logout" activeClassName="selected">
                            Logout
                        </NavLink>
                    </p>
                </div>
                <div className={style.searchCreateDiv}>
                    <Button className={style.searchBtm} variant="light" onClick={() => setModalShow(true)}>
                        Create New Station
                    </Button>
                    <CreateModal setCurrentPlaylist={setCurrentPlaylist} show={modalShow}
                                 onHide={() => setModalShow(false)}/>
                </div>
            </div>
            <StationList setDisBtn={setDisBtn} setCurrentPlaylist={setCurrentPlaylist}/>
            <Player currentPlaylist={currentPlaylist} disBtn={disBtn} setDisBtn={setDisBtn}/>
        </div>
    )
}

export default Stations;