import axios from "axios";
import {getCookie} from "./cookie";


let instance = axios.create({
    //todo change hostname
    //baseURL: "http://DESKTOP-V8HU7V3:9090/api",
    baseURL: "https://api.gspp.space/api",
    responseType: "json"
});

/*instance.interceptors.request.use(request => {

});
instance.interceptors.response.use(response => {

})*/

const AuthAPI = {
    login({email, password}) {
        return instance.post('/auth/login', {
            email: email,
            password: password
        });
    },
    logout() {

    },
    restore({email}) {

    },
    signup({firstName, lastName, email, password}) {
        return instance.post('/auth/signup', {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password
        });
    },
    searchSongs({term}) {
        return instance.get(`/song/search?term=${term}`,
            {
                params: {
                    term: term
                }
            })
    }
}

const SongAPI = {
    searchSongs: term => instance.get(`/song/search?term=${term}`, {
        headers: {
            'Access-Token': getCookie('accessToken'),
            'Refresh-Token': getCookie('refreshToken'),
        }
    }),
    parse: id => instance.get(`/song/parse/${id}`, {
        headers: {
            'Access-Token': getCookie('accessToken'),
            'Refresh-Token': getCookie('refreshToken'),
        }
    }),
    addSong: id => instance.post(`/song/${id}`, {}, {
        headers: {
            'Access-Token': getCookie('accessToken'),
            'Refresh-Token': getCookie('refreshToken'),
        }
    }),
    check: id => instance.get(`/song/check/${id}`, {
        headers: {
            'Access-Token': getCookie('accessToken'),
            'Refresh-Token': getCookie('refreshToken'),
        }
    })
}

const UserAPI = {
    whoAmI: () => instance.get('/user/who', {
        headers: {
            'Access-Token': getCookie('accessToken'),
            'Refresh-Token': getCookie('refreshToken'),
        }
    }),
    favourites: () => instance.get('/user/favourites', {
        headers: {
            'Access-Token': getCookie('accessToken'),
            'Refresh-Token': getCookie('refreshToken'),
        }
    }),

    addSong: (songId) => instance.post(`/user/song/${songId}`, {}, {
        headers: {
            'Access-Token': getCookie('accessToken'),
            'Refresh-Token': getCookie('refreshToken'),
        }
    }),
    removeSong: (songId) => instance.delete(`/user/song/${songId}`, {
        headers: {
            'Access-Token': getCookie('accessToken'),
            'Refresh-Token': getCookie('refreshToken'),
        }
    }),
}

const ArtistAPI = {
    addArtist: id => instance.post(`/artist/${id}`, {}, {
        headers: {
            'Access-Token': getCookie('accessToken'),
            'Refresh-Token': getCookie('refreshToken'),
        }
    })
}

const AlbumAPI = {
    addAlbum: id => instance.post(`/album/${id}`, {}, {
        headers: {
            'Access-Token': getCookie('accessToken'),
            'Refresh-Token': getCookie('refreshToken'),
        }
    })
}

const StationAPI = {
    addStation: (songs, title, date) => instance.post(`/station`, {
        songs: songs,
        title: title,
        date: date,
    }, {
        headers: {
            'Access-Token': getCookie('accessToken'),
            'Refresh-Token': getCookie('refreshToken'),
        }
    }),
    getStations: () => instance.get('/station', {
        headers: {
            'Access-Token': getCookie('accessToken'),
            'Refresh-Token': getCookie('refreshToken'),
        }
    })
}


const API = {
    auth: AuthAPI,
    song: SongAPI,
    user: UserAPI,
    artist: ArtistAPI,
    album: AlbumAPI,
    station: StationAPI
}


export default API;