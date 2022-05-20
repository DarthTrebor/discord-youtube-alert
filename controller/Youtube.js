const axios = require('axios');
const api_key = "AIzaSyCY7MZ9f5qQWA4Ab9C8coxXyqGckMJK038";
const channel_id = 'UCfRCR4mh2P7RZNYuU-t5uvA';
// const channel_id = 'UCIu9yRf7wv4xuLO4facZsDQ';
const url = `https://www.googleapis.com/youtube/v3/search?order=date&part=snippet&channelId=${channel_id}&maxResults=1&key=${api_key}`;

const getLastVideo = async() => {
    const video = await axios.get(url);
    return video.data.items;
}

module.exports = {
    getLastVideo
}