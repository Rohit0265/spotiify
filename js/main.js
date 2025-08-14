let currFolder;
let crsong = new Audio();
let songs = []; // This will hold the current playlist
const url = "";

/**
 * Formats seconds into a MM:SS time format.
 * @param {number} totalSeconds - The total seconds to format.
 * @returns {string} The formatted time string (e.g., "03:21").
 */
function formatTime(totalSeconds) {
    if (isNaN(totalSeconds) || totalSeconds < 0) {
        return "00:00";
    }
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = Math.floor(totalSeconds % 60);
    const paddedMinutes = String(minutes).padStart(2, '0');
    const paddedSeconds = String(seconds).padStart(2, '0');
    return `${paddedMinutes}:${paddedSeconds}`;
}

/**
 * Fetches the list of song file paths from a given folder on the server.
 * @param {string} folder - The path to the folder (e.g., "/Songs/ncs").
 * @returns {Promise<string[]>} A list of song file paths.
 */
async function getSongs(folder) {
    currFolder = folder;
    try {
        const response = await fetch(`${url}${folder}/`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const html = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const links = doc.querySelectorAll('a');
        const songFiles = [];
        links.forEach(link => {
            const href = link.getAttribute('href');
            if (href && href.endsWith('.mp3')) {
                songFiles.push(href);
            }
        });
        return songFiles;
    } catch (error) {
        console.error("Failed to load songs:", error);
        return [];
    }
}

/**
 * Plays a song and updates the player UI.
 * @param {string} track - The name of the song to play (without extension).
 * @param {boolean} [paused=false] - If true, load the song but don't play it immediately.
 */
const playmusic = (track, paused = false) => {
    crsong.src = `${currFolder}/` + track.replaceAll(' ', '%20') + ".mp3";
    if (!paused) {
        crsong.play().catch(e => console.error("Error playing audio:", e));
        play1.src = "img/pause.svg";
    }
    document.querySelector(".songinfos").innerHTML = track;
    document.querySelector(".songdur").innerHTML = "00:00 / 00:00";
};

/**
 * Clears and redraws the playlist in the UI based on the provided songs.
 * @param {string[]} playlist - The list of song paths to display.
 */
function refreshPlaylistUI(playlist) {
    const songul = document.querySelector(".songlist ul");
    songul.innerHTML = "";

    for (const songPath of playlist) {
        const songName = songPath.split(`${currFolder}/`)[1].replaceAll("%20", " ").replace(".mp3", "") || "Unknown Song";
        songul.innerHTML += `
            <li class="songitem flex">
                <img class="invert" src="img/musicsym.svg" alt="music symbol">
                <div class="songinfo">
                    <div>${songName}</div>
                    <div>Artist Name</div>
                </div>
                <div class="play-now flex">
                    <span>Play Now</span>
                    <img class="invert" src="img/playm.svg" alt="play icon">
                </div>
            </li>`;
    }

    Array.from(songul.getElementsByTagName("li")).forEach(li => {
        li.addEventListener("click", () => {
            const songName = li.querySelector(".songinfo").firstElementChild.innerHTML;
            playmusic(songName);
        });
    });
}

/**
 * Load albums dynamically
 */
async function display1() {
    const response = await fetch(`${url}Songs/`);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const html = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const links = doc.getElementsByTagName("a");

    let cardsop = document.querySelector(".card-container");
    let array = Array.from(links);

    for (let index = 0; index < array.length; index++) {
        const e = array[index];
        if (e.href.includes('/Songs')) {
            if (e.href && e.href.endsWith('.mp3')) {
                continue;
            } else {
                if (e.href.endsWith('/Songs')) {
                    continue;
                } else {
                    let folder = e.href.split('/').slice(-1)[0];
                    console.log(folder);

                    const response = await fetch(`${url}Songs/${folder}/info.json`);
                    const html = await response.json();
                    console.log(html);

                    cardsop.innerHTML = cardsop.innerHTML + `<div data-folder=${folder} class=" cards ">
                        <div class="play">
                                <svg xmlns=" http://www.w3.org/2000/svg " viewBox=" 0 0 24 24 " width=" 24 " height=" 24 " color=" #000000 " fill=" none ">
                                    <path
                                        d=" M18.8906 12.846C18.5371 14.189 16.8667 15.138 13.5257 17.0361C10.296 18.8709 8.6812 19.7884 7.37983 19.4196C6.8418 19.2671 6.35159 18.9776 5.95624 18.5787C5 17.6139 5 15.7426 5 12C5 8.2574 5 6.3861 5.95624
                                        5.42132C6.35159 5.02245 6.8418 4.73288 7.37983 4.58042C8.6812 4.21165 10.296 5.12907 13.5257 6.96393C16.8667 8.86197 18.5371 9.811 18.8906 11.154C19.0365 11.7084 19.0365 12.2916 18.8906 12.846Z "
                                        stroke=" #141B34 " stroke-width=" 1.5 " fill=" #000000 " stroke-linejoin=" round " />
                                </svg>
                        </div>
                        <img src= Songs/${folder}/cover.jpg alt=" ">
                        <h2>${html.title}</h2>
                        <p>${html.description}</p>
                    </div>`;
                }
            }
        }
    }

    Array.from(document.getElementsByClassName("cards")).forEach(e => {
        e.addEventListener("click", async item => {
            const folder = item.currentTarget.dataset.folder;
            if (folder) {
                songs = await getSongs(`/Songs/${folder}`);
                if (songs.length > 0) {
                    refreshPlaylistUI(songs);
                    const firstSongName = songs[0].split(`${currFolder}/`)[1].replaceAll("%20", " ").replace(".mp3", "");
                } else {
                    console.error(`No songs found in folder: ${folder}`);
                }
            }
        });
    });
}

/**
 * Main function to initialize the music player.
 */
async function main() {
    const play1 = document.getElementById("play1");
    const prev = document.getElementById("prev");
    const next = document.getElementById("next");

    display1();

    play1.addEventListener("click", () => {
        if (crsong.paused) {
            crsong.play();
            play1.src = "img/pause.svg";
        } else {
            crsong.pause();
            play1.src = "img/playm.svg";
        }
    });

    crsong.addEventListener("timeupdate", () => {
        if (!isNaN(crsong.duration) && crsong.duration > 0) {
            document.querySelector(".songdur").innerHTML =
                `${formatTime(crsong.currentTime)} / ${formatTime(crsong.duration)}`;
            document.querySelector(".circle").style.left =
                (crsong.currentTime / crsong.duration) * 100 + "%";
        }
    });

    crsong.addEventListener('ended', () => {
        document.getElementById('next').click();
    });

    document.querySelector(".seekbar").addEventListener("click", (e) => {
        if (crsong.duration) {
            const percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
            document.querySelector(".circle").style.left = percent + "%";
            crsong.currentTime = (percent * crsong.duration) / 100;
        }
    });

    prev.addEventListener("click", () => {
        if (!songs.length) return;
        const currentTrackName = crsong.src.split('/').pop().replaceAll("%20", " ");
        let index = songs.findIndex(song => song.includes(currentTrackName));
        if (index === -1) index = 0;
        const newIndex = (index - 1 + songs.length) % songs.length;
        const prevSongName = songs[newIndex].split(`${currFolder}/`)[1].replaceAll("%20", " ").replace(".mp3", "");
        playmusic(prevSongName);
    });

    next.addEventListener("click", () => {
        if (!songs.length) return;
        const currentTrackName = crsong.src.split('/').pop().replaceAll("%20", " ");
        let index = songs.findIndex(song => song.includes(currentTrackName));
        if (index === -1) index = 0;
        const newIndex = (index + 1) % songs.length;
        const nextSongName = songs[newIndex].split(`${currFolder}/`)[1].replaceAll("%20", " ").replace(".mp3", "");
        playmusic(nextSongName);
    });

    document.querySelector(".range input").addEventListener("change", (e) => {
        crsong.volume = parseInt(e.target.value) / 100;
    });

    document.querySelector(".hamburger").addEventListener("click", () => {
        document.querySelector(".right-box").style.left = "0%";
    });

    document.querySelector(".cross").addEventListener("click", () => {
        document.querySelector(".right-box").style.left = "-120%";
    });

    songs = await getSongs("/Songs/ncs");
    if (songs.length > 0) {
        refreshPlaylistUI(songs);
        const firstSongName = songs[0].split(`${currFolder}/`)[1].replaceAll("%20", " ").replace(".mp3", "");
        playmusic(firstSongName, true);
    } else {
        console.error("No songs found on initial load. Check server and folder path.");
    }

    document.querySelector(".volume>img").addEventListener("click", (e) => {
        const volumeInput = document.querySelector(".range input");
        if (e.target.src.includes("img/vol.svg")) {
            e.target.src = e.target.src.replace("img/vol.svg", "img/mute.svg");
            volumeInput.value = 0;
            crsong.volume = 0;
        } else {
            e.target.src = e.target.src.replace("img/mute.svg", "img/vol.svg");
            volumeInput.value = 50;
            crsong.volume = 0.5;
        }
    });
}

main();




