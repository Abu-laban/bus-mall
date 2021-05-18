'use strict';

let attempts = 0;
let maxAttempts = 25;
let attemptsElement = document.getElementById('attempts');
let allProducts = [];
let allImageName = [];
let allTotalClicks = [];
let allTotalViews = [];

function ProductImages(imageName) {
    this.imageName = imageName.split('.')[0];
    this.imageSrc = 'img/' + imageName,
        this.totalClicks = 0,
        this.totalViews = 0,
        allProducts.push(this);
    allImageName.push(this.imageName);
}

let ProductsImages = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg', 'chair.jpg', 'cthulhu.jpg', 'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg', 'scissors.jpg', 'shark.jpg', 'sweep.png', 'tauntaun.jpg', 'unicorn.jpg', 'water-can.jpg', 'wine-glass.jpg'];

for (let i = 0; i < ProductsImages.length; i++) {
    new ProductImages(ProductsImages[i]);
}

function randomNumber() {
    return Math.floor(Math.random() * allProducts.length);
}

let leftImgEl = document.getElementById('leftImg');
let middleImgEl = document.getElementById('middleImg');
let rightImgEl = document.getElementById('rightImg');

let leftImgIndex;
let middleImgIndex;
let rightImgIndex;

let lastImages = [];

function renderImg() {
    leftImgIndex = randomNumber();
    middleImgIndex = randomNumber();
    rightImgIndex = randomNumber();
    while (leftImgIndex === rightImgIndex || middleImgIndex === rightImgIndex || middleImgIndex === leftImgIndex ||
        lastImages.includes(leftImgIndex) || lastImages.includes(rightImgIndex) || lastImages.includes(middleImgIndex)) {
        leftImgIndex = randomNumber();
        middleImgIndex = randomNumber();
        rightImgIndex = randomNumber();
    }
    leftImgEl.setAttribute('src', allProducts[leftImgIndex].imageSrc);
    leftImgEl.setAttribute('title', allProducts[leftImgIndex].imageSrc);
    allProducts[leftImgIndex].totalViews++;
    middleImgEl.setAttribute('src', allProducts[middleImgIndex].imageSrc);
    middleImgEl.setAttribute('title', allProducts[middleImgIndex].imageSrc);
    allProducts[middleImgIndex].totalViews++;
    rightImgEl.setAttribute('src', allProducts[rightImgIndex].imageSrc);
    rightImgEl.setAttribute('title', allProducts[rightImgIndex].imageSrc);
    allProducts[rightImgIndex].totalViews++;
    attemptsElement.textContent = attempts;
    lastImages[0] = leftImgIndex;
    lastImages[1] = middleImgIndex;
    lastImages[2] = rightImgIndex;
}

renderImg();
leftImgEl.addEventListener('click', handelClicks);
middleImgEl.addEventListener('click', handelClicks);
rightImgEl.addEventListener('click', handelClicks);
function handelClicks(event) {
    attempts++;
    if (attempts <= maxAttempts) {
        if (event.target.id === 'leftImg') {
            allProducts[leftImgIndex].totalClicks++;
        }
        else if (event.target.id === 'middleImg') {
            allProducts[middleImgIndex].totalClicks++;
        }
        else if (event.target.id === 'rightImg') {
            allProducts[rightImgIndex].totalClicks++;
        }
        renderImg();
    } else {
        leftImgEl.removeEventListener('click', handelClicks);
        middleImgEl.removeEventListener('click', handelClicks);
        rightImgEl.removeEventListener('click', handelClicks);
        storageProduct();
        let viewEl = document.getElementById('results-container');
        let buttonEl = document.createElement('button');
        viewEl.appendChild(buttonEl);
        buttonEl.textContent = 'View Results';
        buttonEl.addEventListener('click', viewResults);
        function viewResults() {
            let ulEl = document.getElementById('results');
            let liEl;
            for (let i = 0; i < allProducts.length; i++) {
                liEl = document.createElement('li');
                ulEl.appendChild(liEl);
                liEl.textContent = `${allProducts[i].imageName} had ${allProducts[i].totalClicks} votes, and was seen ${allProducts[i].totalViews} times.`
                allTotalClicks.push(allProducts[i].totalClicks);
                allTotalViews.push(allProducts[i].totalViews);
            }
            buttonEl.removeEventListener('click', viewResults);
            chartRender();
        }
    }
}

function chartRender() {
    var ctx = document.getElementById('myChart').getContext('2d');

    Chart.defaults.font.size = 16;
    Chart.defaults.borderColor = 'red';
    Chart.defaults.backgroundColor = 'white';
    Chart.defaults.color = 'gold';


    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: allImageName,
            datasets: [{
                label: '# of Votes',
                data: allTotalClicks,
                backgroundColor: [
                    'rgba(255, 32, 255, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 32, 255, 1)',
                ],
                borderWidth: 2
            }, {
                label: '# of Views',
                data: allTotalViews,
                backgroundColor: [
                    'rgba(153, 102, 255, 0.2)',
                ],
                borderColor: [
                    'rgba(153, 102, 255, 1)',
                ],
                borderWidth: 2
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                },
            }
        }
    });
}

function storageProduct() {
    let data = JSON.stringify(allProducts);
    localStorage.setItem('bus-mall', data);
}
function gettingStorageProduct() {
    let stringObj = localStorage.getItem('bus-mall');
    let normalObj = JSON.parse(stringObj);
    if (normalObj !== null) {
        allProducts = normalObj;
    }
}
gettingStorageProduct();