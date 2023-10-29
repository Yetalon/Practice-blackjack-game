let dealerscardsEL = document.getElementById("dealercards-el");
let dealerssumEL = document.getElementById("dealersum-el");

let dealerscards = [];

let cards = [];

let sums = {
    sum: 0,
    dealers_sum: 0,
};

function start (){
    let { playersum, dealers_sum } = startingcards();
    game(playersum, dealers_sum);
};

function startingcards(){
    let firstCard = getRandomCard();
    let secondCard = getRandomCard();
    let dealersfirstcard = getRandomCard();
    let dealersecondcard = getRandomCard();
    cards.push(firstCard, secondCard);
    dealerscards.push(dealersfirstcard, dealersecondcard);
    let dealers_sum = dealersfirstcard;
    let sum = firstCard + secondCard;
    return {playersum: sum, dealers_sum: dealers_sum};    
}

function getRandomCard(){
    return Math.floor(Math.random() * (13 - 1)); 
}

let hasBlackJack = false;
let isAlive = true;
let message;
let messageEL = document.getElementById("message-el");
let sumEl = document.getElementById("sum-el");
let CardsEl = document.getElementById("cards-el");

function game(sum, dealers_sum) {
    CardsEl.textContent = "Cards: " + cards[0] + " , " +  cards[1];
    for(let i=0; i<cards.length; i++){
        if(cards[i] !== undefined && cards[i] != cards[0] && cards[i] != cards[1]){
            CardsEl.textContent += " , " + cards[i];
        }
    }
    dealerscardsEL.textContent = "Dealer Cards: " + dealerscards[0];
    dealerssumEL.textContent = "Dealer Sum: " + dealers_sum;
    sumEl.textContent = "Sum: " + sum;
    if (sum <= 20) {
        message = "Do you want to draw?";
    } else if (sum === 21) {
        message = "Blackjack!";
        hasBlackJack = true;
    } else {
        message = "Bust!";
        isAlive = false;
    }
    messageEL.textContent = message;    
};

let newcard;

function draw(){
    let sum = 0;
    for(let i=0; i<cards.length; i++){
        if(cards[i] !== undefined){
            sum += cards[i];
        }
    }
    let dealers_sum = dealerscards[0];
    newcard = getRandomCard();
    sum += newcard;
    cards.push(newcard);
    game(sum, dealers_sum);
};

function stand() {
    let dealers_sum = 0;
    for (let j = 0; j < dealerscards.length; j++) {
        if (dealerscards[j] !== undefined) {
            dealers_sum += dealerscards[j];
        }
    }
    while (dealers_sum < 16) {
        let newcard = getRandomCard();
        dealerscards.push(newcard);
        dealers_sum += newcard;
    }
    let sum = 0;
    for(let i=0; i<cards.length; i++){
        if(cards[i] !== undefined){
            sum += cards[i];
        }
    }
    if (dealers_sum > 21) {
        message = "Dealer Bust! You Win!";
    }
    else if (dealers_sum < sum){
        message = "You Win!";
    }
    else if (sum > 21){
        message = "You Bust! Dealer Wins!";
    }
    else if (dealers_sum = sum){
        message = "Draw!";
    }
    for (let j = 0; j < dealerscards.length; j++) {
        if (dealerscards[j] !== undefined && dealerscards[j] != dealerscards[0]) {
            dealerscardsEL.textContent += " , " + dealerscards[j];
        }
    }
    dealerssumEL.textContent = "Sum: " + dealers_sum;
    messageEL.textContent = message;
}

function startover(){
    dealerssumEL.textContent = "Dealer Sum: "
    dealerscardsEL.textContent = "Dealer Cards: "
    sumEl.textContent = "Sum: ";
    CardsEl.textContent = "Cards: ";
    cards = [];
    dealerscards = [];
    messageEL.textContent = "Want to play a round?";
};