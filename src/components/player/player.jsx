import React, {useEffect, useState} from "react";
import MainContainer from "./MainContainer";
import PlayerInit from './PlayerInit'
import style from './player.module.css'
import ReactHlsPlayer from 'react-hls-player';
//import ReactHowler from 'react-howler'
import socketIOClient from "socket.io-client";
import API from "../../utils/API";
import {remove} from "immutable";

//todo change hstname
//const ENDPOINT = "http://DESKTOP-V8HU7V3:9090/";
const ENDPOINT = "https://api.gspp.space/";


const Player = ({currentPlaylist, setDisBtn, disBtn}) => {

    function animateMarquee(el, duration) {
        const innerEl = el.querySelector(`.${style.marquee__inner}`);
        const innerWidth = innerEl.offsetWidth;
        const cloneEl = innerEl.cloneNode(true);
        el.appendChild(cloneEl);

        let start = performance.now();
        let progress;
        let translateX;

        requestAnimationFrame(function step(now) {
            progress = (now - start) / duration;

            if (progress > 1) {
                progress %= 1;
                start = now;
            }

            translateX = innerWidth * progress;

            innerEl.style.transform = `translate3d(-${translateX}px, 0 , 0)`;
            cloneEl.style.transform = `translate3d(-${translateX}px, 0 , 0)`;
            requestAnimationFrame(step);
        });
    }

    const [response, setResponse] = useState("");
    const [audio, setAudio] = useState(new Audio(''));

    useEffect(() => {
        console.log('Player currentPlaylist useEffect')
        console.log(currentPlaylist);
        audio.src = currentPlaylist.m3u8;
        //audio.play();
        const marquee2 = document.querySelector('#marquee2');
        animateMarquee(marquee2, 15000);
        const socket = socketIOClient(ENDPOINT, {transport: ['websocket']});
        socket.emit('create', currentPlaylist.station);
        socket.on('current', data => {
            if (data.station.id === -1) {
                setDisBtn(true);
            } else {
                API.song.check(data.song.songId)
                    .then(response => {
                        console.log(response.data);
                        data.add = response.data.status;
                        console.log(data);
                        setBtnAddContext(response.data.status ? 'Remove' : 'Add')
                        setInit(data);
                    })
                    .catch(error => {
                        setBtnAddContext('Add');
                        data.add = false;
                        setInit(data);
                    })
            }
            setInit(data);
        });
    }, [currentPlaylist]);


    const [init, setInit] = useState({
        m3u8: '',
        //todo change hostname
        cover: 'https://api.gspp.space/images/radio.svg',
        station: {
            name: 'Station+',
            id: -1
        },
        song: {
            songName: '•',
            songId: -1,
            artistName: '•'
        },
        add: true,
        play: true
    })

    const [btnAddContext, setBtnAddContext] = useState(init.add ? 'Remove' : 'Add')


    const onAddClick = async (e) => {
        if (!init.add) {
            setBtnAddContext('Remove');
            console.log('add')
            await API.user.addSong(init.song.songId)
        } else {
            setBtnAddContext('Add');
            console.log('remove');
            await API.user.removeSong(init.song.songId)
        }
        init.add = !init.add
        setInit(init);
    }


    const onPlayClick = (e) => {
        if (init.play) {
            e.target.textContent = 'Pause';
            audio.play();
        } else {
            e.target.textContent = 'Play';
            audio.pause();
        }
        init.play = !init.play
        setInit(init);
    }


    return (
        <div className={style.player}>
            <img src={init.cover} className={style.cover} alt=""/>
            <div className={style.info}>
                <p className={'h4 ' + style.stationName}>{init.station.name}</p>
                <div id="marquee2" className={style.marquee}>
                    <div className={style.marquee__inner}>{init.song.artistName} - &nbsp;
                        <strong>{init.song.songName}</strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
                </div>
                <div className={style.controls}>
                    <button className={'btn btn-light'} disabled={disBtn} onClick={onPlayClick}>Play</button>
                    <button className={'btn btn-light'} disabled={disBtn} onClick={onAddClick}>{btnAddContext}</button>
                </div>
            </div>
        </div>
    )
}

export default Player;