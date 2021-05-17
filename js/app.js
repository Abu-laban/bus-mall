'use strict';

let attempts = 0;
let maxAttempts = 25;
let attemptsElement = document.getElementById('attempts');
let allProducts = [];
let allImageName = [];
let allTotalClicks = [];
let allTotalViews = [];

let ProductsImages = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg', 'chair.jpg', 'cthulhu.jpg', 'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg', 'scissors.jpg', 'shark.jpg', 'sweep.png', 'tauntaun.jpg', 'unicorn.jpg', 'water-can.jpg', 'wine-glass.jpg'];

let lImgEl = document.getElementById('leftImg');
let mImgEl = document.getElementById('middleImg');
let rImgEl = document.getElementById('rightImg');

let leftImgIndex;
let middleImgIndex;
let rightImgIndex;

let lastImages = [];

function ProductImages(imageName) {

    this.imageName = imageName.split('.')[0];
    this.imageSrc = 'img/' + imageName;
    this.totalClicks = 0;
    this.totalViews = 0;
    allProducts.push(this);
    allImageName.push(this.imageName);
    
}

for (let i = 0; i < ProductsImages.length; i++) {
    new ProductImages(ProductsImages[i]);
}

function randomImage() {
    return Math.floor(Math.random() * allProducts.length);
}


function renderImg() {
    leftImgIndex = randomImage();
    middleImgIndex = randomImage();
    rightImgIndex = randomImage();

   

    while (leftImgIndex === middleImgIndex || leftImgIndex === rightImgIndex || middleImgIndex === rightImgIndex || lastImages.includes(leftImgIndex) || lastImages.includes(middleImgIndex) || lastImages.includes(rightImgIndex) ) {
        leftImgIndex = randomImage();
        middleImgIndex = randomImage();
        rightImgIndex = randomImage();

    }

    lImgEl.setAttribute('src', allProducts[leftImgIndex].imageSrc);
    lImgEl.setAttribute('title', allProducts[leftImgIndex].imageName);
    allProducts[leftImgIndex].totalViews++;

    mImgEl.setAttribute('src', allProducts[middleImgIndex].imageSrc);
    mImgEl.setAttribute('title', allProducts[middleImgIndex].imageName);
    allProducts[middleImgIndex].totalViews++;

    rImgEl.setAttribute('src', allProducts[rightImgIndex].imageSrc);
    rImgEl.setAttribute('title', allProducts[rightImgIndex].imageName);
    allProducts[rightImgIndex].totalViews++;
    attemptsElement.textContent = attempts;

    lastImages[0]=leftImgIndex;
    lastImages[1]=middleImgIndex;
    lastImages[2]=rightImgIndex;


}
renderImg();

lImgEl.addEventListener('click', handelClicks);
mImgEl.addEventListener('click', handelClicks);
rImgEl.addEventListener('click', handelClicks);

function handelClicks(event) {
    attempts++;
    if (attempts <= maxAttempts) {
        if (event.target.id === 'leftImg') {
            allProducts[leftImgIndex].totalClicks++;
        }
        else if (event.target.id === 'middleImg') {
            allProducts[middleImgIndex].totalClicks++;
        }
        else (event.target.id === 'rightImg')
        {
            allProducts[rightImgIndex].totalClicks++;
        }
        renderImg();
    } else {
        lImgEl.removeEventListener('click', handelClicks);
        mImgEl.removeEventListener('click', handelClicks);
        rImgEl.removeEventListener('click', handelClicks);

        let result = document.getElementById('results-container')
        let btn = document.createElement('button')
        result.appendChild(btn);
        btn.textContent='View Results';
        
        btn.addEventListener('click', resultClick);

        function resultClick(event) {
            let ulElement = document.getElementById('results');
            let liElement;
            for (let i = 0; i < allProducts.length; i++) {
                liElement = document.createElement('li');
                ulElement.appendChild(liElement);
                liElement.textContent = `${allProducts[i].imageName} had ${allProducts[i].totalClicks} votes, and was seen ${allProducts[i].totalViews} times.`
                
                allTotalClicks.push(allProducts[i].totalClicks);
                allTotalViews.push(allProducts[i].totalViews);
            
            }
            btn.removeEventListener('click', resultClick);
            chartRender();
        }

    }
}

function chartRender(){
var ctx = document.getElementById('myChart').getContext('2d');

Chart.defaults.font.size = 16;
Chart.defaults.borderColor='red';
Chart.defaults.backgroundColor='white';
Chart.defaults.color='gold';


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
        },{
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
});}