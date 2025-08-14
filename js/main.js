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
//     const res = await fetch("/Songs/");
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





// main code bhaddweeeee





// let currFolder;
// let mp3Files;
// let crsong = new Audio();
// let songs;


// function formatTime(totalSeconds) {
//     if (totalSeconds === null || totalSeconds === undefined || isNaN(totalSeconds) || totalSeconds < 0) {
//         return "00:00";
//     }
//     const minutes = Math.floor(totalSeconds / 60);
//     const seconds = Math.floor(totalSeconds % 60);
//     const paddedMinutes = String(minutes).padStart(2, '0');
//     const paddedSeconds = String(seconds).padStart(2, '0');
//     return `${paddedMinutes}:${paddedSeconds}`;
// }



// async function loadSongs(folder) {
//     currFolder = folder;
//     const res = await fetch(`/${currFolder}/`);
//     const html = await res.text();
//     const parser = new DOMParser();
//     const doc = parser.parseFromString(html, 'text/html');
//     const links = doc.querySelectorAll('a');
//     mp3Files = [];
//     links.forEach(link => {
//         const href = link.getAttribute('href')
//         if (href && href.endsWith('.mp3')) {
//             mp3Files.push(href);
//         }
//     });
//     if (songs.length === 0) {
//         console.error("No songs found. Check the /Songs/ directory and server.");
//         // return;
//     }
//     const firstSongName = songs[0].split(`${currFolder}/`)[1].replaceAll("%20", " ").split(".mp3")[0];
//     playmusic(firstSongName, true);

//     const songul = document.querySelector(".songlist").getElementsByTagName("ul")[0];
//     songul.innerHTML = "";
//     for (const song of songs) {
//         const songName = song.split(`${currFolder}/`)[1].replaceAll("%20", " ").split(".mp3")[0];
//         songul.innerHTML += `
//                         <li class="songitem flex" >
//                             <img class="invert" src="musicsym.svg" alt="music symbol">
//                             <div class="songinfo" >
//                                 <div>${songName}</div>
//                                 <div>Artist Name</div>
//                             </div>
//                             <div class="play-now flex">
//                                 <span>Play Now</span>
//                                 <img class="invert" src="playm.svg" alt="play icon">
//                             </div>
//                         </li>`;
//     }

//     Array.from(document.querySelector(".songlist").getElementsByTagName("li")).forEach(li => {
//         li.addEventListener("click", () => {
//             const songName = li.querySelector(".songinfo").firstElementChild.innerHTML;
//             playmusic(songName);
//         });
//     });
// };

// const playmusic = (track, paused = false) => {
//     // THIS IS THE CORRECTED LINE:
//     // It replaces spaces with %20 to create a valid URL.
//     crsong.src = `${currFolder}/` + track.replaceAll(' ', '%20') + ".mp3";

//     if (!paused) {
//         crsong.play();
//         play1.src = "pause.svg";
//     }
//     document.querySelector(".songinfos").innerHTML = decodeURI(track);
//     document.querySelector(".songdur").innerHTML = "00:00 / 00:00";
// }

// async function main() {
//     await loadSongs("/Songs/ncs");


//     play1.addEventListener("click", () => {
//         if (crsong.paused) {
//             crsong.play();
//             play1.src = "pause.svg";
//         } else {
//             crsong.pause();
//             play1.src = "playm.svg";
//         }
//     });

//     crsong.addEventListener("timeupdate", () => {
//         document.querySelector(".songdur").innerHTML = `${formatTime(crsong.currentTime)} / ${formatTime(crsong.duration)}`;
//         document.querySelector(".circle").style.left = (crsong.currentTime / crsong.duration) * 100 + "%";
//     });

//     document.querySelector(".seekbar").addEventListener("click", (e) => {
//         let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
//         document.querySelector(".circle").style.left = percent + "%";
//         crsong.currentTime = (percent * crsong.duration) / 100;
//     });

//     document.querySelector(".hamburger").addEventListener("click", (e) => {
//         document.querySelector(".right-box").style.left = "0%";
//     });

//     document.querySelector(".cross").addEventListener("click", () => {
//         document.querySelector(".right-box").style.left = "-120%";
//     });

//     prev.addEventListener("click", () => {
//         // --- THIS IS THE FIX ---
//         if (!songs || songs.length === 0) return; // Don't do anything if songs aren't loaded

//         const currentSrcPath = crsong.src.split(`${currFolder}/`)[1];
//         if (!currentSrcPath) return;

//         const decodedSrc = decodeURIComponent(currentSrcPath);
//         let index = songs.findIndex(song => decodeURIComponent(song).includes(decodedSrc));

//         if (index === -1) index = 0;

//         const newIndex = (index - 1 + songs.length) % songs.length;
//         const prevSongName = songs[newIndex].split(`${currFolder}/`)[1].replaceAll("%20", " ").split(".mp3")[0];
//         playmusic(prevSongName);
//     });

//     next.addEventListener("click", () => {
//         // --- THIS IS THE FIX ---
//         if (!songs || songs.length === 0) return; // Don't do anything if songs aren't loaded

//         const currentSrcPath = crsong.src.split(`${currFolder}/`)[1];
//         if (!currentSrcPath) return;

//         const decodedSrc = decodeURIComponent(currentSrcPath);
//         let index = songs.findIndex(song => decodeURIComponent(song).includes(decodedSrc));

//         if (index === -1) index = 0;

//         const newIndex = (index + 1) % songs.length;
//         const nextSongName = songs[newIndex].split(`${currFolder}/`)[1].replaceAll("%20", " ").split(".mp3")[0];
//         playmusic(nextSongName);
//     });

//     crsong.addEventListener('ended', () => {
//         document.getElementById('next').click();
//     });

//     document.querySelector(".range").getElementsByTagName("input")[0].addEventListener("change", (e) => {
//         // console.log(e, e.target, e.target.value) 
//         crsong.volume = parseInt(e.target.value) / 100;
//         // document.getElementById("mysong")

//     })

//     // lib loding on cards clicked
//     Array.from(document.getElementsByClassName("cards")).forEach(e => {
//         // console.log(e);
//         e.addEventListener("click", async item => {
//             console.log(item.target.dataset);
//             songs = await loadSongs(`/Songs/${item.currentTarget.dataset.folder}`);

//         })
//     })


// }

// main();




// ek sur main codebhadwe


// // Global variables for the player's state
// let currFolder;
// let crsong = new Audio();
// let songs = []; // This will hold the current playlist
// const url = "";
// /**
//  * Formats seconds into a MM:SS time format.
//  * @param {number} totalSeconds - The total seconds to format.
//  * @returns {string} The formatted time string (e.g., "03:21").
//  */
// function formatTime(totalSeconds) {
//     if (isNaN(totalSeconds) || totalSeconds < 0) {
//         return "00:00";
//     }
//     const minutes = Math.floor(totalSeconds / 60);
//     const seconds = Math.floor(totalSeconds % 60);
//     const paddedMinutes = String(minutes).padStart(2, '0');
//     const paddedSeconds = String(seconds).padStart(2, '0');
//     return `${paddedMinutes}:${paddedSeconds}`;
// }

// /**
//  * Fetches the list of song file paths from a given folder on the server.
//  * @param {string} folder - The path to the folder (e.g., "/Songs/ncs").
//  * @returns {Promise<string[]>} A list of song file paths.
//  */
// async function getSongs(folder) {
//     currFolder = folder;
//     try {
//         const response = await fetch(`${url}/${folder}/`);
//         if (!response.ok) {
//             throw new Error(`HTTP error! status: ${response.status}`);
//         }

//         const html = await response.text();
//         const parser = new DOMParser();
//         const doc = parser.parseFromString(html, 'text/html');
//         const links = doc.querySelectorAll('a');
//         const songFiles = [];
//         links.forEach(link => {
//             const href = link.getAttribute('href');
//             if (href && href.endsWith('.mp3')) {
//                 songFiles.push(href);
//             }
//         });
//         return songFiles;
//     } catch (error) {
//         console.error("Failed to load songs:", error);
//         return []; // Return an empty array on error
//     }
// }

// /**
//  * Plays a song and updates the player UI.
//  * @param {string} track - The name of the song to play (without extension).
//  * @param {boolean} [paused=false] - If true, load the song but don't play it immediately.
//  */
// const playmusic = (track, paused = false) => {
//     crsong.src = `${currFolder}/` + track.replaceAll(' ', '%20') + ".mp3";
//     if (!paused) {
//         crsong.play().catch(e => console.error("Error playing audio:", e));
//         play1.src = "img/pause.svg";
//     }
//     document.querySelector(".songinfos").innerHTML = track;
//     document.querySelector(".songdur").innerHTML = "00:00 / 00:00";
// };

// /**
//  * Clears and redraws the playlist in the UI based on the provided songs.
//  * @param {string[]} playlist - The list of song paths to display.
//  */
// function refreshPlaylistUI(playlist) {
//     const songul = document.querySelector(".songlist ul");
//     songul.innerHTML = ""; // Clear the existing list

//     for (const songPath of playlist) {
//         // Extract a clean song name from the path
//         const songName = songPath.split(`${currFolder}/`)[1].replaceAll("%20", " ").replace(".mp3", "") || "Unknown Song";
//         songul.innerHTML += `
//             <li class="songitem flex">
//                 <img class="invert" src="img/musicsym.svg" alt="music symbol">
//                 <div class="songinfo">
//                     <div>${songName}</div>
//                     <div>Artist Name</div>
//                 </div>
//                 <div class="play-now flex">
//                     <span>Play Now</span>
//                     <img class="invert" src="img/playm.svg" alt="play icon">
//                 </div>
//             </li>`;
//     }

//     // Re-attach event listeners to the new list items
//     Array.from(songul.getElementsByTagName("li")).forEach(li => {
//         li.addEventListener("click", () => {
//             const songName = li.querySelector(".songinfo").firstElementChild.innerHTML;
//             playmusic(songName);
//         });
//     });
// }


// /**
//  * Main function to initialize the music player.
//  */

// async function display1() {
    // const response = await fetch(`/Songs/`);
    // if (!response.ok) {
    //     throw new Error(`HTTP error! status: ${response.status}`);
    // }
    // const html = await response.text();
    // const parser = new DOMParser();
    // const doc = parser.parseFromString(html, 'text/html');
    // const links = doc.getElementsByTagName("a");
    // 1. Get all the <a> tags and store them in the 'links' variable
    // const links = document.querySelectorAll('a');

    // // 2. Loop through each 'link' in the 'links' list
    // links.forEach(link => {
    //     const href = link.getAttribute('href'); // Get the URL from the link

    //     // 3. Check if the link's URL points to an mp3 file or a folder
    //     if (href && href.endsWith('.mp3')) {
    //         // ...it's a song
    //     }
    //     if (href && href.endsWith('/')) {
    //         // ...it's a folder
    //     }
    // });


//     const response = await fetch(`${url}/Songs/`);
//     if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//     }
//     const html = await response.text();
//     const parser = new DOMParser();
//     const doc = parser.parseFromString(html, 'text/html');
//     const links = doc.getElementsByTagName("a");
//     // console.log(links);
//     // let anchors =



//     let cardsop = document.querySelector(".card-container");
//     let array = Array.from(links);
//     for (let index = 0; index < array.length; index++) {
//         const e = array[index];
//         // console.log(e.href);
//         if (e.href.includes('/Songs')) {
//             if (e.href && e.href.endsWith('.mp3')) {
//                 continue;
//             } else {
//                 if (e.href.endsWith('/Songs')) {
//                     continue;
//                 } else {
//                     let folder = e.href.split('/').slice("-1")[0];
//                     console.log(folder);
//                     const response = await fetch(`${url}/${folder}/info.json`);
//                     const html = await response.json();
//                     console.log(html);
//                     cardsop.innerHTML = cardsop.innerHTML + `<div data-folder=${folder} class=" cards ">
//                     <div class="play">
//                             <svg xmlns=" http://www.w3.org/2000/svg " viewBox=" 0 0 24 24 " width=" 24 " height=" 24 " color=" #000000 " fill=" none ">
//                                 <path
//                                     d=" M18.8906 12.846C18.5371 14.189 16.8667 15.138 13.5257 17.0361C10.296 18.8709 8.6812 19.7884 7.37983 19.4196C6.8418 19.2671 6.35159 18.9776 5.95624 18.5787C5 17.6139 5 15.7426 5 12C5 8.2574 5 6.3861 5.95624
//                                     5.42132C6.35159 5.02245 6.8418 4.73288 7.37983 4.58042C8.6812 4.21165 10.296 5.12907 13.5257 6.96393C16.8667 8.86197 18.5371 9.811 18.8906 11.154C19.0365 11.7084 19.0365 12.2916 18.8906 12.846Z "
//                                     stroke=" #141B34 " stroke-width=" 1.5 " fill=" #000000 " stroke-linejoin=" round " />
//                             </svg>
//                     </div>
//                     <img src= Songs/${folder}/cover.jpg alt=" ">
//                     <h2>${html.title}</h2>
//                     <p>${html.description}</p>
//                     </div>`;

//                 }
//             }

//         }
//     }
//     Array.from(document.getElementsByClassName("cards")).forEach(e => {
//         e.addEventListener("click", async item => {
//             const folder = item.currentTarget.dataset.folder;
//             if (folder) {
//                 songs = await getSongs(`/Songs/${folder}`);
//                 if (songs.length > 0) {
//                     refreshPlaylistUI(songs);
//                     const firstSongName = songs[0].split(`${currFolder}/`)[1].replaceAll("%20", " ").replace(".mp3", "");
//                     // playmusic(firstSongName); // Autoplay first song of new playlist
//                 } else {
//                     console.error(`No songs found in folder: ${folder}`);
//                 }
//             }
//         });
//     });
//     // links.forEach(link => {
//     //     const href = link.getAttribute('href');
//     //     console.log(href);
//     // });
// }


// async function main() {


//     //dynamicall album
//     display1();


//     // --- 1. Initial Setup and Event Listeners ---







//     play1.addEventListener("click", () => {
//         if (crsong.paused) {
//             crsong.play();
//             play1.src = "img/pause.svg";
//         } else {
//             crsong.pause();
//             play1.src = "img/playm.svg";
//         }
//     });

//     crsong.addEventListener("timeupdate", () => {
//         document.querySelector(".songdur").innerHTML = `${formatTime(crsong.currentTime)} / ${formatTime(crsong.duration)}`;
//         document.querySelector(".circle").style.left = (crsong.currentTime / crsong.duration) * 100 + "%";
//     });

//     crsong.addEventListener('ended', () => {
//         // Automatically play the next song
//         document.getElementById('next').click();
//     });

//     document.querySelector(".seekbar").addEventListener("click", (e) => {
//         if (crsong.duration) {
//             const percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
//             document.querySelector(".circle").style.left = percent + "%";
//             crsong.currentTime = (percent * crsong.duration) / 100;
//         }
//     });

//     prev.addEventListener("click", () => {
//         if (!songs.length) return;
//         const currentTrackName = crsong.src.split('/').pop().replaceAll("%20", " ");
//         let index = songs.findIndex(song => song.includes(currentTrackName));
//         if (index === -1) index = 0;
//         const newIndex = (index - 1 + songs.length) % songs.length;
//         const prevSongName = songs[newIndex].split(`${currFolder}/`)[1].replaceAll("%20", " ").replace(".mp3", "");
//         playmusic(prevSongName);
//     });

//     next.addEventListener("click", () => {
//         if (!songs.length) return;
//         const currentTrackName = crsong.src.split('/').pop().replaceAll("%20", " ");
//         let index = songs.findIndex(song => song.includes(currentTrackName));
//         if (index === -1) index = 0;
//         const newIndex = (index + 1) % songs.length;
//         const nextSongName = songs[newIndex].split(`${currFolder}/`)[1].replaceAll("%20", " ").replace(".mp3", "");
//         playmusic(nextSongName);
//     });

//     document.querySelector(".range input").addEventListener("change", (e) => {
//         crsong.volume = parseInt(e.target.value) / 100;
//     });

//     document.querySelector(".hamburger").addEventListener("click", () => {
//         document.querySelector(".right-box").style.left = "0%";
//     });

//     document.querySelector(".cross").addEventListener("click", () => {
//         document.querySelector(".right-box").style.left = "-120%";
//     });

//     // --- 2. Load Initial Playlist ---

//     songs = await getSongs("/Songs/ncs");
//     if (songs.length > 0) {
//         refreshPlaylistUI(songs);
//         const firstSongName = songs[0].split(`${currFolder}/`)[1].replaceAll("%20", " ").replace(".mp3", "");
//         playmusic(firstSongName, true); // Load first song but keep it paused
//     } else {
//         console.error("No songs found on initial load. Check server and folder path.");
//     }

//     document.querySelector(".volume>img").addEventListener("click", (e) => {
//         // document.querySelector(".volume>img").replace("vol.img", "mute.svg");
//         console.log(e.target.src);
//         // e.target.src =/
//         if (e.target.src.includes("img/vol.svg")) {
//             e.target.src = e.target.src.replace("img/vol.svg", "img/mute.svg");
//             document.querySelector(".range input").value = 0;
//             // crsong.volume = parseInt(e.target.value) / 100;
//         } else {
//             e.target.src = e.target.src.replace("img/mute.svg", "img/vol.svg");
//             document.querySelector(".range input").value = 50;
//         }
//     })
// }


// main();
document.addEventListener("DOMContentLoaded", function() {
    // =========================================================================
    // GLOBAL VARIABLES & STATE
    // =========================================================================
    let currFolder = "";
    let crsong = new Audio();
    let songs = []; // This will hold the current playlist of song filenames
    const BASE_URL = ""; // Use relative paths for hosting flexibility

    // =========================================================================
    // DOM ELEMENT SELECTORS
    // =========================================================================
    const playButton = document.getElementById("play");
    const prevButton = document.getElementById("prev");
    const nextButton = document.getElementById("next");
    const songInfoDiv = document.querySelector(".songinfos");
    const songDurationDiv = document.querySelector(".songdur");
    const seekbar = document.querySelector(".seekbar");
    const circle = document.querySelector(".circle");
    const volumeControlImg = document.querySelector(".volume > img");
    const volumeControlRange = document.querySelector(".range input");
    const hamburger = document.querySelector(".hamburger");
    const cross = document.querySelector(".cross");
    const leftBox = document.querySelector(".left-box");
    const cardContainer = document.querySelector(".card-container");
    const songListUL = document.querySelector(".songlist ul");

    // =========================================================================
    // HELPER & UTILITY FUNCTIONS
    // =========================================================================

    /**
     * Formats seconds into a MM:SS time format.
     */
    function formatTime(totalSeconds) {
        if (isNaN(totalSeconds) || totalSeconds < 0) return "00:00";
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = Math.floor(totalSeconds % 60);
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }

    /**
     * Finds the index of the currently playing song in the `songs` array.
     * @returns {number} The index of the current song, or -1 if not found.
     */
    function getCurrentSongIndex() {
        if (!crsong.src) return -1;
        const currentTrackFilename = crsong.src.split('/').pop();
        return songs.findIndex(song => song === currentTrackFilename);
    }

    // =========================================================================
    // CORE MUSIC & UI LOGIC
    // =========================================================================

    /**
     * Fetches the list of song file names from a manifest file.
     */
    async function getSongs(folderPath) {
        currFolder = folderPath;
        try {
            const response = await fetch(`${BASE_URL}${folderPath}/songs.json`);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const data = await response.json();
            return data.songs;
        } catch (error) {
            console.error(`Failed to load songs for ${folderPath}:`, error);
            return [];
        }
    }

    /**
     * Plays a song and updates the player UI.
     */
    const playMusic = (track, paused = false) => {
        crsong.src = `${BASE_URL}${currFolder}/${track}`;
        songInfoDiv.innerHTML = track.replace(".mp3", "").replaceAll("%20", " ");
        if (!paused) {
            crsong.play().catch(e => console.error("Error playing audio:", e));
            playButton.src = "img/pause.svg";
        }
    };

    /**
     * Redraws the playlist in the UI. Event listeners are handled by delegation.
     */
    function refreshPlaylistUI(playlist) {
        songListUL.innerHTML = "";
        for (const songFile of playlist) {
            const songName = songFile.replace(".mp3", "").replaceAll("%20", " ");
            songListUL.innerHTML += `
                <li class="songitem" data-songfile="${songFile}">
                    <img class="invert" src="img/musicsym.svg" alt="music symbol">
                    <div class="songinfo">
                        <div>${songName}</div>
                        <div>Artist Name</div>
                    </div>
                    <div class="play-now">
                        <span>Play Now</span>
                        <img class="invert" src="img/playm.svg" alt="play icon">
                    </div>
                </li>`;
        }
    }

    /**
     * Fetches album data and displays them as cards. Event listeners are handled by delegation.
     */
    async function displayAlbums() {
        try {
            const response = await fetch(`${BASE_URL}/Songs/albums.json`);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const albums = await response.json();

            cardContainer.innerHTML = "";
            for (const album of albums) {
                cardContainer.innerHTML += `
                    <div data-folder="${album.folder}" class="cards">
                        <div class="play">
                             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M18.8906 12.846C18.5371 14.189 16.8667 15.138 13.5257 17.0361C10.296 18.8709 8.6812 19.7884 7.37983 19.4196C6.8418 19.2671 6.35159 18.9776 5.95624 18.5787C5 17.6139 5 15.7426 5 12C5 8.2574 5 6.3861 5.95624 5.42132C6.35159 5.02245 6.8418 4.73288 7.37983 4.58042C8.6812 4.21165 10.296 5.12907 13.5257 6.96393C16.8667 8.86197 18.5371 9.811 18.8906 11.154C19.0365 11.7084 19.0365 12.2916 18.8906 12.846Z" stroke="#141B34" stroke-width="1.5" fill="#000" stroke-linejoin="round"/></svg>
                        </div>
                        <img src="Songs/${album.folder}/cover.jpg" alt="Album Cover">
                        <h2>${album.title}</h2>
                        <p>${album.description}</p>
                    </div>`;
            }
        } catch (error) {
            console.error("Failed to display albums:", error);
        }
    }

    // =========================================================================
    // EVENT LISTENERS SETUP
    // =========================================================================

    function setupEventListeners() {
        // Play/Pause main button
        playButton.addEventListener("click", () => {
            if (crsong.paused) {
                crsong.play();
                playButton.src = "img/pause.svg";
            } else {
                crsong.pause();
                playButton.src = "img/playm.svg";
            }
        });

        // Previous and Next buttons
        prevButton.addEventListener("click", () => {
            if (!songs.length) return;
            let index = getCurrentSongIndex();
            playMusic(songs[(index - 1 + songs.length) % songs.length]);
        });

        nextButton.addEventListener("click", () => {
            if (!songs.length) return;
            let index = getCurrentSongIndex();
            if (index === -1) index = -1; // handles case where no song is loaded
            playMusic(songs[(index + 1) % songs.length]);
        });
        
        // Update seekbar as song plays
        crsong.addEventListener("timeupdate", () => {
            if (!isNaN(crsong.duration)) {
                songDurationDiv.innerHTML = `${formatTime(crsong.currentTime)} / ${formatTime(crsong.duration)}`;
                circle.style.left = (crsong.currentTime / crsong.duration) * 100 + "%";
            }
        });

        // Play next song when current one ends
        crsong.addEventListener('ended', () => nextButton.click());

        // Allow user to click on the seekbar to jump
        seekbar.addEventListener("click", (e) => {
            if (!isNaN(crsong.duration)) {
                const percent = (e.offsetX / e.target.getBoundingClientRect().width);
                crsong.currentTime = percent * crsong.duration;
            }
        });

        // Volume controls
        volumeControlRange.addEventListener("change", (e) => {
            crsong.volume = parseInt(e.target.value) / 100;
            volumeControlImg.src = crsong.volume === 0 ? "img/mute.svg" : "img/vol.svg";
        });

        volumeControlImg.addEventListener("click", () => {
            if (crsong.volume > 0) {
                crsong.volume = 0;
                volumeControlImg.src = "img/mute.svg";
                volumeControlRange.value = 0;
            } else {
                crsong.volume = 0.5;
                volumeControlImg.src = "img/vol.svg";
                volumeControlRange.value = 50;
            }
        });

        // Hamburger menu for mobile view
        hamburger.addEventListener("click", () => { leftBox.style.left = "0%"; });
        cross.addEventListener("click", () => { leftBox.style.left = "-120%"; });
        
        // --- Event Delegation for Dynamic Content ---

        // Handle clicks on album cards
        cardContainer.addEventListener("click", async (e) => {
            const card = e.target.closest(".cards");
            if (card) {
                const folderName = card.dataset.folder;
                songs = await getSongs(`/Songs/${folderName}`);
                if (songs.length > 0) {
                    refreshPlaylistUI(songs);
                    playMusic(songs[0]);
                }
            }
        });
        
        // Handle clicks on songs in the playlist
        songListUL.addEventListener("click", (e) => {
            const songItem = e.target.closest(".songitem");
            if (songItem) {
                playMusic(songItem.dataset.songfile);
            }
        });
    }

    // =========================================================================
    // INITIALIZATION
    // =========================================================================
    async function main() {
        setupEventListeners();
        await displayAlbums();

        // Load a default playlist on startup
        songs = await getSongs("/Songs/ncs");
        if (songs.length > 0) {
            refreshPlaylistUI(songs);
            playMusic(songs[0], true); // Load first song but keep it paused
        }
    }

    main();
});
