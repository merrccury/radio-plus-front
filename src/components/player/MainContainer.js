import {React, useEffect} from "react";
import style from './player.module.css'
export default function MainContainer() {
    useScript("https://api.gspp.space/static/js/playerjs_audio.js");
    return (
        <div>
            <div className={style.player} id="player"></div>
        </div>
    );

}

function useScript(url) {
    useEffect(() => {
        const script = document.createElement("script");
        script.src = url;
        script.async = true;
        document.body.appendChild(script);
        return () => {
            document.body.removeChild(script);
        };
    }, [url]);
}

function PlayNewVideo() {
    if (window.pljssglobal.length > 0) {
        window.pljssglobal[0].api("play", "https://www.maxradio.ca/UHD/Maxv1/80k/Max.m3u8");
    }
}