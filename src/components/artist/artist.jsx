import * as React from "react";
import {
    List,
    arrayMove,
    arrayRemove
} from "baseui/dnd-list";
import style from './artist.module.css'
import {useState} from "react";
import ReactList from 'react-list';

const Artist = () => {

    const [state, setState] = useState({
        info: {
            name: "Billie Eilish",
            photo: "https://is2-ssl.mzstatic.com/image/thumb/Music125/v4/b1/17/8b/b1178bd4-d8b8-8735-aeeb-e2e20e7ff462/pr_source.png/400x400cb.png",
            artistBio: "When singer-songwriter Billie Eilish feels something new, the first thing she does is take out her phone and write it down. “You can write anything,” she told Apple Music in an interview for the Up Next series. “You can say the truth, and you can not <i>tell</i> anyone that it’s the truth—you can just write it, and it’ll be yours.” Raised and homeschooled in Los Angeles by actor/musician parents, Eilish (born Billie Eilish Pirate Baird O'Connell in 2001) started writing songs when she was around 11, exploring a strain of melancholy, minimal, and slightly surrealistic pop influenced as much by Lana Del Rey as the radical honesty of rappers like Tyler, the Creator and Earl Sweatshirt. Writing and recording with her brother—and producer—FINNEAS at their parents’ house, Eilish released <i>dont smile at me</i> in 2017, followed by an ever-evolving series of singles—a prime example of the fact that, in the streaming era, artists are now free to move directly from their bedrooms into the spotlight. Hardly two years later, she’d released the Grammys-slaying <i>WHEN WE ALL FALL ASLEEP WHERE DO WE GO?</i>, an experimental-pop opus that explored mental health and all manner of sleep phenomena, totally upending the notions of what constitutes pop music in 2020. (She also won the inaugural Apple Music Award for Global Artist of the Year.) Despite the attention, Eilish is doing her best to stake out a space of freedom and fluidity, expanding her range of collaborators (Vince Staples, Khalid) and dodging easy definition. “If people think I have a sound, if people are like, ‘Oh yeah, her sound is this,’ if someone asks you what my sound is and you have an answer for them—you’re wrong,” she said. “Instead of trying to find a sound, when I want to make something and when I have an idea of what I want to make, I’m just going to make that.”",
        },
        songs: [
            {
                url: "http://fakeimg.pl/200/?text=img1",
                name: "img1"
            },
            {
                url: "http://fakeimg.pl/200/?text=img2",
                name: "img2"
            },
            {
                url: "http://fakeimg.pl/200/?text=img3",
                name: "img3"
            },
            {
                url: "http://fakeimg.pl/200/?text=img4",
                name: "img4"
            },
            {
                url: "http://fakeimg.pl/200/?text=img5",
                name: "img5"
            }
        ]
    })

    const renderItem = (index, key) => {
        return <div key={key}>{state.songs[index].name}</div>;
    }

    return (
        <div className={style.artist}>
            <div className={style.left}>
                <img src={state.info.photo}/>
                <h1>{state.info.name}</h1>
                <p>{state.info.artistBio}</p>
            </div>
            <div className={style.right}>
                <h1>Top Songs</h1>
                <div style={{overflow: 'auto', maxHeight: 400}}>
                    <ReactList
                        itemRenderer={renderItem}
                        length={state.songs.length}
                        type='uniform'
                    />
                </div>
                <h1>Albums</h1>
            </div>
        </div>


    );
}
export default Artist;