var cardSuits = ["H","C","S","D"];
var cardFaces = ["2","3","4","5","6","7","8","9","10","J","Q","K","A"]
var playerHand = document.querySelector("#player-hand");
var dealerHand = document.querySelector("#dealer-hand");
var dealerPoints = document.querySelector("#dealer-points");
var playerPoints = document.querySelector("#player-points");
var dealButton = document.querySelector("#deal-button");
var hitButton = document.querySelector("#hit-button");
var standButton = document.querySelector("#stand-button");
var cardAnimateImg = document.querySelector(".cardImage2");
var deck = [];
var playerTotal = 0;
var dealerTotal = 0;
var dealerHoleCard;
var holeCardFlipped = true;
var playerCurrentCards = [];
var dealerCurrentCards = []

document.querySelector("body").addEventListener('click', (e) => {
    console.log(e);
});

var holeCardImg = document.createElement("img");
holeCardImg.setAttribute("src","images/Red_back.jpg");
holeCardImg.setAttribute("class","cardImage");


function createCards(){
    for(let card of cardFaces){
        let value;
        if(card == "J" || card == "Q" || card == "K"){
            value = "10";
        }else if(card == "A"){
            value = "11";
        }else{
            value = card;
        }
        const temp1 ={
            name: card,
            nameSuit: card+"H",
            value: value

        } 
        const temp2 ={
            name: card,
            nameSuit: card+"S",
            value: value
        } 
        const temp3 ={
            name: card,
            nameSuit: card+"C",
            value: value
        } 
        const temp4 ={
            name: card,
            nameSuit: card+"D",
            value: value
        } 
        deck.push(temp1,temp2,temp3,temp4);
    }
}

createCards();

console.log(deck)
function createCardDeck(){
    for(let card of deck){
         card.imgsrc = `images/${card.nameSuit}.jpg`;
    }
        
}

createCardDeck()
console.log(deck);

for(let card of deck){
    let temp = document.createElement("img");
    temp.setAttribute("src",card.imgsrc);
    temp.setAttribute("class","cardImage");
    card.imgHTML = temp;
}
console.log(deck)

function shuffleDeck(deck) {
    for (var i = deck.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = deck[i];
        deck[i] = deck[j];
        deck[j] = temp;
    }
    return deck;
}

var gameDeck = [...deck];
shuffleDeck(gameDeck)
// var card2C = document.createElement("img");
// card2C.setAttribute("src","images/2C.jpg");
// card2C.setAttribute("class","cardImage");
// cardImages.push(card2C);
checkAces = (person) => {

    if(getTotal(person)>21){
        for(let card of person){
            if(card.name == "A"){
                card.value = 1;
            }
        }

    }
    
}
getTotal = (person) => {
    let total = 0;
    for(let card of person){
        total += Number(card.value);
    }
    return total
}
deal = () => {
    let card1 = dealCard()
    let card2 = dealCard()
    let card3 = dealCard()
    let card4 = dealCard()
    playerCurrentCards.push(card1,card2);
    dealerCurrentCards.push(card3,card4);
    dealerHoleCard = card3;
    cardAnimateImg.classList.add("playerCardAnimate");
    cardAnimateImg.addEventListener("animationend", (e) =>{
        playerHand.appendChild(card1.imgHTML);
        playerHand.appendChild(card2.imgHTML);
    });
   
    dealerHand.appendChild(holeCardImg);
    dealerHand.appendChild(card4.imgHTML);
    dealerTotal += Number(card4.value)
    playerTotal += Number(card1.value) + Number(card2.value)
    dealerPoints.innerHTML = dealerTotal;
    playerPoints.innerHTML = getTotal(playerCurrentCards);
    checkAces(playerCurrentCards);
    // if(getTotal(playerCurrentCards) === 21){
    //     setTimeout(function() {
    //         alert("21! You Win!");
    //     },10);
    // }
}

dealCard = () => {
    var nextCard = gameDeck.pop();
    return nextCard;
}

hit = () => {
    let card = dealCard();
    playerCurrentCards.push(card);
    playerHand.appendChild(card.imgHTML);
    
    
    checkAces(playerCurrentCards)
    let currentTotal = getTotal(playerCurrentCards);
    console.log(currentTotal);
    playerPoints.innerHTML = getTotal(playerCurrentCards);
    if(getTotal(playerCurrentCards) > 21){
        setTimeout(function() {
            document.querySelector("#messages").innerHTML = "You busted dealer wins!";
            alert("You busted! Dealer WINS!")
        },10);
        
    }
}

stand = () => {
    dealerPlay();
    if(getTotal(playerCurrentCards) <= 21 && getTotal(dealerCurrentCards) <= 21){
        checkWin();
    }
    
}

checkWin = () => {
    if(getTotal(playerCurrentCards) > getTotal(dealerCurrentCards)){
        setTimeout(function() {
            alert("You win")
        },10);
    }else if(getTotal(dealerCurrentCards) > getTotal(playerCurrentCards)){
        setTimeout(function() {
            alert("Dealer WINS!")
        },10);
    }else{
        setTimeout(function() {
            alert("Draw")
        },10);
    }
}

dealerPlay = () => {
    if(holeCardFlipped){
        let dealerFirstCard = document.querySelector("#dealer-hand img");
        dealerFirstCard.setAttribute("src",dealerHoleCard.imgsrc);
        dealerTotal += Number(dealerHoleCard.value);
        dealerPoints.innerHTML = dealerTotal;
    }   
    let card = dealCard();
    dealerCurrentCards.push(card);
    dealerHand.appendChild(card.imgHTML);

    dealerTotal += Number(card.value)
    checkAces(dealerCurrentCards);
    dealerPoints.innerHTML = getTotal(dealerCurrentCards);

    if(getTotal(dealerCurrentCards) > 21){
        setTimeout(function() {
            alert("dealer busted! you WIN!")
        },10);
    }
    if(getTotal(dealerCurrentCards) <= 16){
        dealerPlay();
    }

}

dealButton.addEventListener('click',deal);
hitButton.addEventListener('click',hit);
standButton.addEventListener('click',stand);




// var card10C = document.createElement("img");
// card10C.setAttribute("src","images/10C.jpg");
// card10C.setAttribute("class","cardImage");
// cardImages.push(card10C);

// dealerHand.appendChild(cardImages[1]);



