const songs=[

{
title:"Agar Tum Saath Ho",
artist:"Arijit Singh",
audio:"songs/song1.mp3",
cover:"images/cover1.png"
},

{
title:"Samjhawan",
artist:"Arijit Singh, Shreya Ghoshal",
audio:"songs/song2.mp3",
cover:"images/cover2.png"
},

{
title:"Hey Minnale",
artist:"Haricharan, Shweta Mohan",
audio:"songs/song3.mp3",
cover:"images/cover3.png"
},

{
title:"Guli Mata",
artist:"Saad Lamjarred, Shreya Ghoshal",
audio:"songs/song4.mp3",
cover:"images/cover4.png"
},

{
title:"Kaun Tujhe",
artist:"Palak Muchhal",
audio:"songs/song5.mp3",
cover:"images/cover5.png"
},

{
title:"Chuttamalle",
artist:"Shilpa Rao",
audio:"songs/song6.mp3",
cover:"images/cover6.png"
},

{
title:"Inthandham",
artist:"SPB Charan",
audio:"songs/song7.mp3",
cover:"images/cover7.png"
},

{
title:"Undiporaadhey",
artist:"Sid Sriram",
audio:"songs/song8.mp3",
cover:"images/cover8.png"
},

{
title:"Kani Penchina Ma Ammake",
artist:"Anup Rubens",
audio:"songs/song9.mp3",
cover:"images/cover9.png"
},

{
title:"Channa Mereya",
artist:"Arijit Singh",
audio:"songs/song10.mp3",
cover:"images/cover10.png"
}

];

let index=0;

const audio=document.getElementById("audio");

function loadSong(){

let song=songs[index];

audio.src=song.audio;

title.innerHTML=song.title;

artist.innerHTML=song.artist;

cover.src=song.cover;

/* FIX */
play.innerHTML="▶";

}

function createPlaylist(){

playlist.innerHTML="";

songs.forEach((song,i)=>{

let div=document.createElement("div");

div.innerHTML=`

<img src="${song.cover}" class="song-cover">

<span>${song.title}</span>

`;

div.onclick=()=>{

index=i;

loadSong();

playlistPage.style.display="none";

playerPage.style.display="block";

audio.play();

/* FIX */
play.innerHTML="⏸";

};

playlist.appendChild(div);

});

}

function playPause(){

if(audio.paused){

audio.play();

play.innerHTML="⏸";

}

else{

audio.pause();

play.innerHTML="▶";

}

}

function next(){

index++;

if(index>=songs.length)
index=0;

loadSong();

audio.play();

/* FIX */
play.innerHTML="⏸";

}

function prev(){

index--;

if(index<0)
index=songs.length-1;

loadSong();

audio.play();

/* FIX */
play.innerHTML="⏸";

}

audio.onended=next;

audio.ontimeupdate=()=>{

progress.value=
(audio.currentTime/audio.duration)*100 || 0;

current.innerHTML=format(audio.currentTime);

duration.innerHTML=format(audio.duration);

};

progress.oninput=()=>{

audio.currentTime=
(progress.value/100)*audio.duration;

};

volume.oninput=()=>{

audio.volume=volume.value;

};

function format(time){

if(isNaN(time))
return "0:00";

return Math.floor(time/60)+":"+
Math.floor(time%60).toString().padStart(2,"0");

}

function closePlayer(){

audio.pause();

/* FIX */
play.innerHTML="▶";

playerPage.style.display="none";

playlistPage.style.display="block";

}

document.addEventListener("keydown",e=>{

if(e.code==="Space"){

e.preventDefault();

playPause();

}

if(e.key==="ArrowRight")
next();

if(e.key==="ArrowLeft")
prev();

});

loadSong();

createPlaylist();