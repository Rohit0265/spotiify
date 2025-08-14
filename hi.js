// // const { element } = require("prop-types");

// // const { next } = require("stylis");

// // const { format } = require("util");
// // const { queryObjects } = require("v8");

// // crsong.src = href[0];

// function formatTime(totalSeconds) {
//     // 1. Handle invalid inputs: If the input is not a number, is negative, 
//     //    or is not a finite number, return a default value.
//     if (totalSeconds === null || totalSeconds === undefined || isNaN(totalSeconds) || totalSeconds < 0) {
//         return "00:00";
//     }

//     // 2. Calculate minutes: Divide the total seconds by 60 and take the integer part.
//     //    Math.floor() rounds down to the nearest whole number.
//     const minutes = Math.floor(totalSeconds / 60);

//     // 3. Calculate remaining seconds: Use the modulo operator (%) to get the remainder
//     //    after dividing by 60.
//     const seconds = Math.floor(totalSeconds % 60);

//     // 4. Pad with leading zeros: The padStart() method ensures that both the minutes 
//     //    and seconds are always two digits long. If a number is only one digit (e.g., 5),
//     //    it adds a '0' to the start, making it '05'.
//     const paddedMinutes = String(minutes).padStart(2, '0');
//     const paddedSeconds = String(seconds).padStart(2, '0');

//     // 5. Combine and return the final formatted string.
//     return `${paddedMinutes}:${paddedSeconds}`;
// }





// let crsong = new Audio();

// async function loadSongs() {
//     const res = await fetch("http://127.0.1:5501/Songs/");
//     const html = await res.text();
//     const parser = new DOMParser();
//     const doc = parser.parseFromString(html, 'text/html');
//     const links = doc.querySelectorAll('a');
//     const mp3Files = [];
//     links.forEach(link => {
//         const href = link.getAttribute('href')
//         if (href && href.endsWith('.mp3')) {
//             mp3Files.push(href);
//         }
//     });
//     return mp3Files;
// };

// const playmusic = (track) => {
//     // var audio = new Audio(href[0]);
//     // let audio = new Audio("/Songs/" + track + ".mp3");
//     crsong.src = "/Songs/" + track + ".mp3"
//     play1.src = "pause.svg "
//     crsong.play();
//     document.querySelector(".songinfos").innerHTML = track;
//     document.querySelector(".songdur").innerHTML = "00:00/00:00";
//     // audio.addEventListener("loadeddata", () => {
//     //     let duration = audio.duration;
//     //     console.log(duration);
//     // })
// }
// async function main() {
//     let href = await loadSongs();
//     console.log(href);
//     const songul = document.querySelector(".songlist").getElementsByTagName("ul")[0];
//     for (const song of href) {
//         const hi = song.split("/Songs/")[1].replaceAll("%20", " ").split(".mp3")[0];
//         songul.innerHTML = songul.innerHTML + ` 
//                         <li class="songitem flex" >
//                             <img class="invert" src="musicsym.svg" alt="music symbol">
//                             <div class="songinfo" >
//                                 <div>${hi}</div>
//                                 <div>Artist Name</div>
//                             </div>
//                             <div class="play-now flex">
//                                 <span>Play Now</span>
//                                 <img class="invert" src="playm.svg" alt="play icon">
//                             </div>
//                         </li>`
//     }

//     // attachingevent listenr
//     Array.from(document.querySelector(".songlist").getElementsByTagName("li")).forEach(li => {
//         li.addEventListener("click", () => {
//             // Find the element with class "songinfo" inside the clicked list item.
//             // Then, get the text of its first child element, which is the song name.
//             const songName = li.querySelector(".songinfo").firstElementChild.innerHTML;

//             // Call the playmusic function with the extracted song name.
//             playmusic(songName);
//         });
//     });

//     // Array.from(document.querySelector(".songlist").getElementsByTagName("li")).forEach((e) => {
//     //     const songContainer = e.querySelector("div");
//     //     e.addEventListener("click", element => {
//     //         const songDetailsDiv = songContainer.querySelector(".mlm");
//     //         const extraInfoDiv = songContainer.querySelector(".songinfo");
//     //         console.log(extraInfoDiv.firstElementChild.innerHTML);
//     //         console.log(e.getElementsByTagName("div")[0]);
//     //         playmusic(extraInfoDiv.firstElementChild.innerHTML);
//     //     })
//     // })
//     play1.addEventListener("click", () => {
//         if (crsong.paused) {
//             crsong.play()
//             play1.src = "pause.svg "
//         } else {

//             crsong.pause();
//             play1.src = "playm.svg "
//         }
//     })


//     crsong.addEventListener("timeupdate", () => {
//         console.log(crsong.currentTime, crsong.duration);
//         document.querySelector(".songdur").innerHTML = ` ${formatTime(crsong.currentTime)} : ${formatTime(crsong.duration)}`
//         document.querySelector(".circle").style.left = (crsong.currentTime / crsong.duration) * 100 + "%";
//     })

//     document.querySelector(".seekbar").addEventListener("click", (e) => {
//         let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
//         document.querySelector(".circle").style.left = percent + "%";
//         crsong.currentTime = (percent * crsong.duration) / 100;
//     })
//     document.querySelector(".hamburger").addEventListener("click", (e) => {
//         document.querySelector(".right-box").style.left = "0%";
//     })
//     document.querySelector(".cross").addEventListener("click", () => {
//             document.querySelector(".right-box").style.left = "-120%";

//         })
//         // var audio = new Audio(href[0]);
//         // // audio.play();
//         // audio.addEventListener("loadeddata", () => {
//         //     let duration = audio.duration;
//         //     console.log(duration);
//         // })
//     prev.addEventListener("click", () => {
//         // --- THIS IS THE FIX ---
//         if (!songs || songs.length === 0) return; // Don't do anything if songs aren't loaded

//         const currentSrcPath = crsong.src.split("/Songs/")[1];
//         if (!currentSrcPath) return;

//         const decodedSrc = decodeURIComponent(currentSrcPath);
//         let index = songs.findIndex(song => decodeURIComponent(song).includes(decodedSrc));

//         if (index === -1) index = 0;

//         const newIndex = (index - 1 + songs.length) % songs.length;
//         const prevSongName = songs[newIndex].split("/Songs/")[1].replaceAll("%20", " ").split(".mp3")[0];
//         playmusic(prevSongName);
//     });

//     next.addEventListener("click", () => {
//         // --- THIS IS THE FIX ---
//         if (href || href.length === 0) return; // Don't do anything ifhref aren't loaded

//         const currentSrcPath = crsong.src.split("href/")[1];
//         if (!currentSrcPath) return;

//         const decodedSrc = decodeURIComponent(currentSrcPath);
//         let index = href.findIndex(song => decodeURIComponent(song).includes(decodedSrc));

//         if (index === -1) index = 0;

//         const newIndex = (index + 1) % href.length;
//         const nextSongName = href[newIndex].split("/Songs/")[1].replaceAll("%20", " ").split(".mp3")[0];
//         playmusic(nextSongName);
//     });

//     crsong.addEventListener('ended', () => {
//         document.getElementById('next').click();
//     });
// }

// main();

function formatTime(totalSeconds) {
    if (totalSeconds === null || totalSeconds === undefined || isNaN(totalSeconds) || totalSeconds < 0) {
        return "00:00";
    }
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = Math.floor(totalSeconds % 60);
    const paddedMinutes = String(minutes).padStart(2, '0');
    const paddedSeconds = String(seconds).padStart(2, '0');
    return `${paddedMinutes}:${paddedSeconds}`;
}

let crsong = new Audio();
let songs;

async function loadSongs(folder) {
    const res = await fetch("http://127.0.1:5501/Songs/");
    const html = await res.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const links = doc.querySelectorAll('a');
    const mp3Files = [];
    links.forEach(link => {
        const href = link.getAttribute('href')
        if (href && href.endsWith('.mp3')) {
            mp3Files.push(href);
        }
    });
    return mp3Files;
};

const playmusic = (track, paused = false) => {
    crsong.src = "/Songs/" + track + ".mp3";
    if (!paused) {
        crsong.play();
        play1.src = "pause.svg";
    }
    document.querySelector(".songinfos").innerHTML = decodeURI(track);
    document.querySelector(".songdur").innerHTML = "00:00 / 00:00";
}

async function main() {
    songs = await loadSongs();
    if (songs.length === 0) {
        console.error("No songs found. Check the /Songs/ directory and server.");
        return;
    }
    const firstSongName = songs[0].split("/Songs/")[1].replaceAll("%20", " ").split(".mp3")[0];
    playmusic(firstSongName, true);

    const songul = document.querySelector(".songlist").getElementsByTagName("ul")[0];
    songul.innerHTML = "";
    for (const song of songs) {
        const songName = song.split("/Songs/")[1].replaceAll("%20", " ").split(".mp3")[0];
        songul.innerHTML += `
                        <li class="songitem flex" >
                            <img class="invert" src="musicsym.svg" alt="music symbol">
                            <div class="songinfo" >
                                <div>${songName}</div>
                                <div>Artist Name</div>
                            </div>
                            <div class="play-now flex">
                                <span>Play Now</span>
                                <img class="invert" src="playm.svg" alt="play icon">
                            </div>
                        </li>`;
    }

    Array.from(document.querySelector(".songlist").getElementsByTagName("li")).forEach(li => {
        li.addEventListener("click", () => {
            const songName = li.querySelector(".songinfo").firstElementChild.innerHTML;
            playmusic(songName);
        });
    });

    play1.addEventListener("click", () => {
        if (crsong.paused) {
            crsong.play();
            play1.src = "pause.svg";
        } else {
            crsong.pause();
            play1.src = "playm.svg";
        }
    });

    crsong.addEventListener("timeupdate", () => {
        document.querySelector(".songdur").innerHTML = `${formatTime(crsong.currentTime)} / ${formatTime(crsong.duration)}`;
        document.querySelector(".circle").style.left = (crsong.currentTime / crsong.duration) * 100 + "%";
    });

    document.querySelector(".seekbar").addEventListener("click", (e) => {
        let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
        document.querySelector(".circle").style.left = percent + "%";
        crsong.currentTime = (percent * crsong.duration) / 100;
    });

    document.querySelector(".hamburger").addEventListener("click", (e) => {
        document.querySelector(".right-box").style.left = "0%";
    });

    document.querySelector(".cross").addEventListener("click", () => {
        document.querySelector(".right-box").style.left = "-120%";
    });

    prev.addEventListener("click", () => {
        // --- THIS IS THE FIX ---
        if (!songs || songs.length === 0) return; // Don't do anything if songs aren't loaded

        const currentSrcPath = crsong.src.split("/Songs/")[1];
        if (!currentSrcPath) return;

        const decodedSrc = decodeURIComponent(currentSrcPath);
        let index = songs.findIndex(song => decodeURIComponent(song).includes(decodedSrc));

        if (index === -1) index = 0;

        const newIndex = (index - 1 + songs.length) % songs.length;
        const prevSongName = songs[newIndex].split("/Songs/")[1].replaceAll("%20", " ").split(".mp3")[0];
        playmusic(prevSongName);
    });

    next.addEventListener("click", () => {
        // --- THIS IS THE FIX ---
        if (!songs || songs.length === 0) return; // Don't do anything if songs aren't loaded

        const currentSrcPath = crsong.src.split("/Songs/")[1];
        if (!currentSrcPath) return;

        const decodedSrc = decodeURIComponent(currentSrcPath);
        let index = songs.findIndex(song => decodeURIComponent(song).includes(decodedSrc));

        if (index === -1) index = 0;

        const newIndex = (index + 1) % songs.length;
        const nextSongName = songs[newIndex].split("/Songs/")[1].replaceAll("%20", " ").split(".mp3")[0];
        playmusic(nextSongName);
    });

    crsong.addEventListener('ended', () => {
        document.getElementById('next').click();
    });

    document.querySelector(".range").getElementsByTagName("input")[0].addEventListener("change", (e) => {
        // console.log(e, e.target, e.target.value) 
        crsong.volume = parseInt(e.target.value) / 100;
        // document.getElementById("mysong")

    })
}

main();