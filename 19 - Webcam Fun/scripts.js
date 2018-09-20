
// TEST COMPLETADO SIN CAMARA.

const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

function getVideo() {
    navigator.mediaDevices.getUserMedia({
            video: true,
            audio: false
        })
        .then(localMediaStream => {
            console.log(localMediaStream);
            video.src = window.URL.createObjectURL(localMediaStream);
            video.play();
        })
        .catch(err => {
            console.error(`GET OFF!`, err);
        });
}

function paintToCanvas() {
    const width = video.videoWidth;
    const height = video.videoHeight;
    canvas.width = width;
    canvas.height = height;

    return setInterval(() => {
        ctx.drawImage(video, 0, 0, width, height);
        let pixels = ctx.getImageData(0, 0, width, height); // agarrar los pixels
        // pixels = redEffect(pixels);
        pixels = rgbSplit(pixels); //hang
        ctx.globalAlpha = 0.1;
        ctx.putImageData(pixels, 0, 0); //devolverlos con efectos
    }, 16);
}

function takePhoto() {
    snap.currentTime = 0;
    snap.play();

    //agarrar la info de la foto sacada
    const data = canvas.toDataURL('image/jpeg');
    const link = document.createElement('a');
    link.href = data;
    link.setAttribute('download', 'handsome');
    link.innerHTML = `<ing src="${data}" alt="handsome man" />`;
    strip.insertBefore(link,strip.firstChild);
    console.log("wohoo");
}
function redEffect(pixels){
    for(let i = 0;i <pixels.data.length;i=+ 4){
        pixels.data[i + 0] = pixels.data[i + 0] + 200; // RED
        pixels.data[i + 1] = pixels.data[i + 1] - 50; // GREEN
        pixels.data[i + 2] = pixels.data[i + 2] * 0.5; // Blue
    }
    return pixels;
}
function rgbSplit(pixels){
    for(let i = 0;i <pixels.data.length;i=+ 4){
        pixels.data[i +- 150] = pixels.data[i + 0] + 200; // RED
        pixels.data[i + 100] = pixels.data[i + 1] - 50; // GREEN
        pixels.data[i - 120] = pixels.data[i + 2] * 0.5; // Blue
    }
}
function greenScreen(pixels) {
    const levels = {};
  
    document.querySelectorAll('.rgb input').forEach((input) => {
      levels[input.name] = input.value;
    });
  
    for (i = 0; i < pixels.data.length; i = i + 4) {
      red = pixels.data[i + 0];
      green = pixels.data[i + 1];
      blue = pixels.data[i + 2];
      alpha = pixels.data[i + 3];
  
      if (red >= levels.rmin
        && green >= levels.gmin
        && blue >= levels.bmin
        && red <= levels.rmax
        && green <= levels.gmax
        && blue <= levels.bmax) {
        // take it out!
        pixels.data[i + 3] = 0;
      }
    }
  
    return pixels;
}
getVideo();


video.addEventListener('camplay', paintToCanvas);