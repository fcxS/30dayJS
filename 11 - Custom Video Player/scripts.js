// OBTENER TODOS LO QUE ESTA PASANDO EN LA PANTALLA
const player = document.querySelector('.player');
const video = player.querySelector('.viewer'); 
const progress = player.querySelector('.progress'); 
const progressBar = player.querySelector('.progress__filled'); 
const toggle = player.querySelector('.toggle'); 
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider'); 
//const fullScreen = player.querySelector('.player__button');


//hacer las funciones

function togglePlay(){
   const method = video.paused ? 'play' : 'pause';
   video[method]();
}
function updateButton(){
    //console.warn("update button");
    const icon = this.paused ? '►' : '❚ ❚' ;
    toggle.textContent = icon ;
}
function skip(){
    video.currentTime += parseFloat(this.dataset.skip);
}
function handlerangeUpdate(){
    video[this.name] = this.value; 
}
function handleProgress(){
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
}
function scrub(e){
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
    //console.log(e);
}
// function goFullScreen(){
//     console.log("fulling")
// }

//conectar todo

video.addEventListener('click', togglePlay); //EVENTOS del click
video.addEventListener('play', updateButton);       //EVENTOS DEL VIDEO
video.addEventListener('pause', updateButton);      //EVENTOS DEL VIDEO
video.addEventListener('timeupdate', handleProgress); 

toggle.addEventListener('click', togglePlay);   //EVENTOS del click
skipButtons.forEach(button => button.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('change', handlerangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handlerangeUpdate));

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown',() => mouseDown= true);
progress.addEventListener('mouseup',() => mouseDown= false);
//fullScreen.addEventListener('click', goFullScreen);