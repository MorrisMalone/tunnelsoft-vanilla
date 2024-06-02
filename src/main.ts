import imageUrls from './static/imageUrls.json';

import './style.scss';
import { fetchImage, clamp } from './utils';

const delay = 3000;

const image = <HTMLImageElement>document.getElementById('image');
const previousButton = <HTMLButtonElement>document.getElementById('previous');
const nextButton = <HTMLButtonElement>document.getElementById('next');
const pagination = <HTMLParagraphElement>document.getElementById('pagination');

previousButton.addEventListener('click', () => handleSlide(-1));
nextButton.addEventListener('click', () => handleSlide(1));

let imageIndex = 0;
let timerId: number | undefined = undefined;

image.src = imageUrls[imageIndex];

function setPagination() {
    pagination.textContent = `${imageIndex + 1} / ${imageUrls.length}`;
}

function handleSlide(step: number) {
    imageIndex = clamp(imageIndex + step, 0, imageUrls.length - 1);
    image.src = imageUrls[imageIndex];
    setPagination();
    startTimeout();
}

function startTimeout() {
    clearTimeout(timerId);
    timerId = setTimeout(
        () => setImage(imageIndex),
        delay
    );
}

function setImage(index: number) {
    fetchImage(imageUrls[index])
        .then((objectUrl) => {
            if (imageIndex !== index) {
                throw new Error('different index!!');
            }
            image.src = objectUrl;
        })
        .then(() => setTimeout(() => setImage(index), delay));
}

setPagination();
startTimeout();