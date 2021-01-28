// DECLARO CONST Y LET
const wrapBg = document.querySelector('.wrapper-bg');
const bg = document.querySelector('.bg-img');

const btnPrev = document.getElementById('prevBtn');
const btnNext = document.getElementById('nextBtn');
const items = document.querySelectorAll('.js-go-to');
const wrapText = document.querySelector('.wrapper-text');
const text = document.querySelectorAll('.js-title');
let currentPosition = -1;

let counter = wrapBg.dataset.pos;

// FUNCION NEXT AND PREV

function clean() {
    wrapBg.classList.remove('pos-0', 'pos-1', 'pos-2', 'pos-3', 'pos-4', 'pos-5', 'pos-6', 'pos-7', 'pos-8', 'pos-9');
}

function cleanText(){
    wrapText.classList.remove('parag-0','parag-1', 'parag-2', 'parag-3', 'parag-4', 'parag-5', 'parag-6', 'parag-7', 'parag-8', 'parag-9');
}

function cleanIndocators (){
    items.forEach(item => {
        item.classList.remove('active');
    });
}

function nextImg() {
    clean();
    currentPosition = updateCounter(); // update counter before go
    currentPosition++;
    if(currentPosition >= items.length){
        currentPosition = 0;
    }
    wrapBg.classList.add('pos-' + currentPosition);
    paragraph(currentPosition);
    indicatorsActive(currentPosition);
}

function prevImg() {
    clean();
    currentPosition = updateCounter(); // update counter before go
    currentPosition--;

    wrapBg.classList.add('pos-' + currentPosition);
    paragraph(currentPosition);
    indicatorsActive(currentPosition);
}

function goToNewPosition(el) {
    clean();
    cleanIndocators ();
    wrapBg.classList.add('pos-' + el.dataset.pos);
    el.classList.add('active');
    paragraph(el.dataset.pos);
}

function paragraph(current) {
    cleanText();
    text.forEach(i => {
        let textPos = i.dataset.tit;
        text[textPos].style.display = 'none';
        if (textPos = current) {
            wrapText.classList.add('parag-' + textPos);
            text[textPos].style.display = 'block';
        } else {
            wrapText.classList.add('parag-0');
            text[textPos].style.display = 'block';
        }
    })
}

function indicatorsActive(current){
    cleanIndocators ();
    items.forEach(i => {
        let item = i.dataset.pos;
        if (item = current) {
            items[item].classList.add('active');
        } else {
            items[0].classList.add('active');
        }
    })
}


// EVENTOS BOTONES NEXT AND PREV
btnNext.addEventListener('click', nextImg);

btnPrev.addEventListener('click', prevImg);

items.forEach(item => {
    item.addEventListener('click', event => {
        goToNewPosition(event.target)
    })
})

// keep counter updated
function updateCounter(){
    items.forEach(item => {
        if(item.classList.contains('active')){
            currentPosition = item.dataset.pos;
        }
    });
    return currentPosition;
}


// LOADING
function onReady(callback) {
    var intervalId = window.setInterval(function () {
        if (document.getElementsByTagName('body')[0] !== undefined) {
            window.clearInterval(intervalId);
            callback.call(this);
        }
    }, 1000);
}

function setVisible(selector, visible) {
    document.querySelector(selector).style.display = visible ? 'block' : 'none';
}

onReady(function () {
    setVisible('.page', true);
    setVisible('#loading', false);
});