import React, {useEffect, useState} from 'react';
import style from './statiom-list.module.css';
import API from "../../utils/API";
import socketIOClient from "socket.io-client";
import {Col, Row, Toast} from "react-bootstrap";

const StationList = ({setDisBtn, setCurrentPlaylist}) => {

    const [init, setInit] = useState([]);

    useEffect(async () => {
        const response = await API.station.getStations();
        const stations = response.data;
        setInit(stations);
    }, []);

    useEffect(() => {
        console.log(init);
    }, [init]);

    const play = (url, station)=>{
        setDisBtn(false);
        setCurrentPlaylist({
            m3u8: url,
            station: station
        });
    }

    //todo change hostname
    //const ENDPOINT = '/notofication'
    //const ENDPOINT = "http://DESKTOP-V8HU7V3:9090/";
    const ENDPOINT = "https://api.gspp.space/";


    const socket = socketIOClient(ENDPOINT, {transport: ['websocket']});
    socket.on('notification', data => {
        setTextNotification(data);
        setTimeout(()=>setTextNotification('Stations'), 6000);
        console.log(data);
    })
    const onclickRemind = (id)=>{
        console.log(id);
        socket.emit('notification', id);
    }

    const parseTime = (time) => {
        const date = new Date(time);
        return `${date.getFullYear()}:${date.getMonth() + 1}:${date.getDay()} ${date.getHours()}:${date.getMinutes()}`;
    }

    const refresh = async () =>{
        const response = await API.station.getStations();
        const stations = response.data;
        setInit(stations);
    }

    const [showNotification, setShowNotification] = useState(true);
    const [textNotification, setTextNotification] = useState('Stations');

    return (
        <div>
            <div className={style.blockHeader}>
                <p className={style.header + ' display-1'}>{textNotification}</p>
                <button className={'btn btn-danger'} onClick={()=>{refresh()}} >Refresh</button>
            </div>
            <div className={style.listOfStations}>
                {init.map(item => (
                    <div key={item.ID} className={style.station}>
                        <h1>{item.TITLE}</h1>
                        <p>Release date: {parseTime(item.DATE_OF_AVAILABILITY)}</p>
                        <p>Date of creation: {parseTime(item.DATE_OF_CREATURE)}</p>
                        {
                            new Date(item.DATE_OF_AVAILABILITY) > new Date()
                                ?
                                <button className={'btn btn-info'} onClick={()=>onclickRemind(item.ID)}>Remind</button>
                                :
                                <button onClick={()=> play(item.URL, item.ID)} className={'btn btn-success'}>Listen</button>
                        }
                    </div>
                ))}
            </div>
            {/*<div style={{position:'absolute'}}>
                <Row>
                    <Col xs={6}>
                        <Toast onClose={() => setShowNotification(false)} show={showNotification} delay={3000} autohide>
                            <Toast.Header>
                                <strong className="mr-auto">Info</strong>
                                <small>
                                    Notification
                                </small>
                            </Toast.Header>
                            <Toast.Body>{textNotification}</Toast.Body>
                        </Toast>
                    </Col>
                </Row>
            </div>*/}
        </div>
    )
}

export default StationList