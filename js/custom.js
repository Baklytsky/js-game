'use strict';
let cards = document.querySelectorAll('.item-card-one');
let choice = document.querySelector('.choice');
let right = document.querySelector('.right');
let totalPercent = document.querySelector('.total-percent');
let congrats = document.querySelector('.congrats');
let congratsTitle = document.querySelector('.personal-percent');
let selectedCard = false;
let lockCards = false;
let firstCard, secondCard;
let attempts = 0;
let correct = 0;
let percent = 0;

cards.forEach(i => i.addEventListener('click', layerTwo));

function layerTwo() {
    if (lockCards) return;
    if (this === firstCard) return;

    this.classList.add('item-card-two');

    if (!selectedCard) {
        selectedCard = true;
        firstCard = this;
        return;
    }
    secondCard = this;
    lockCards = true;

    checkForMatch();
}

function checkForMatch() {
    let i = firstCard.dataset.values === secondCard.dataset.values;
    i ? leaveLayerTwo() : leaveLayerOne();
    attempts++;
    choice.innerHTML = 'choice of two cards:' + ' ' + attempts;

    total ();
}

function leaveLayerTwo() {
    firstCard.removeEventListener('click', layerTwo);
    secondCard.removeEventListener('click', layerTwo);
    correct++;
    right.innerHTML = 'correct choice:' + ' ' + correct;

    resetBoard ();
    total ();
}

function total () {
    percent = (( correct / attempts) * 100 );
    totalPercent.innerHTML = 'your percent:' + ' ' + percent.toFixed(1) + '%';

    congratulation ();
}

function leaveLayerOne() {
    setTimeout(() => {
        firstCard.classList.remove('item-card-two');
        secondCard.classList.remove('item-card-two');

        resetBoard();
    }, 1500);
}

function resetBoard() {
    [selectedCard, lockCards] = [false, false];
    [firstCard, secondCard] = [null, null];
}

(function random() {
    cards.forEach(i => {
        i.style.order = Math.floor(Math.random() * 36);
    });
})();

function congratulation () {
        if (correct === 18) {
            congrats.style.display = 'block';
            congratsTitle.innerHTML = 'Your personal percent:' + ' ' + percent.toFixed(1) + '%';
        }
}




