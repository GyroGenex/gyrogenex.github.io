class Card {
    constructor(face, suit) {
        if (face === "Ace") {
            this.value = 11;
        } else if (face === "Jack" || face === "Queen" || face === "King") {
            this.value = 10;
        } else (
            this.value = parseInt(face)
        );
        this.face = face;
        this.suit = suit;
        this.faceUp = false;
    }
}

class Deck {
    constructor(cardArray) {
        this.cardArray = cardArray;
    }

    shuffle() {
        this.cardArray.sort(() => Math.random() - 0.5);
    };

    compare() {
        let topCard = this.cardArray[0];
        console.log(`Top card is ${topCard.face} of ${topCard.suit}`);
        let bottomCard = this.cardArray[this.cardArray.length - 1];
        console.log(`Bottom card is ${bottomCard.face} of ${bottomCard.suit}`);
        if (topCard.value == bottomCard.value) {
            console.log("It is a tie");
        } else if (topCard.value > bottomCard.value) {
            console.log(`${topCard.face} of ${topCard.suit} is bigger`);
        } else {
            console.log(`${bottomCard.face} of ${bottomCard.suit} is bigger`);
        }
    };

    giveCard() {
        return this.cardArray.pop();
    }
}
const faces = ["Ace", "2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King"];
const suits = ["Clubs", "Diamonds", "Spades", "Hearts"];

const deckArray = [];

for (let face of faces) {
    for (let suit of suits) {
        deckArray.push(new Card(face, suit));
    }
}

$(() => {
    const deck = new Deck(deckArray);
    console.log(deck);
    deck.shuffle();


    const $container = $("div");

    const $computerHand = $("<div>").addClass("computerHand");
    const $computerCards = $("<span>").text("Computer's Hand").addClass("description");
    $computerHand.append($computerCards);
    const $playerHand = $("<div>").addClass("playerHand");
    const $playerCards = $("<span>").text("Players's Hand").addClass("description");
    $playerHand.append($playerCards);

    const $choices = $("<div>").addClass("choices");

    $container.append($computerHand);
    $container.append($playerHand);
    $computerHand.after($choices);

    $startButton = $("<button>").text("start").addClass("start");
    $choices.append($startButton);

    $hitButton = $("<button>").text("hit").addClass("hit button");
    $choices.append($hitButton);

    $standButton = $("<button>").text("hit").addClass("stand button");
    $choices.append($standButton);

    const assignCards = (hand) => {

        const cardDetails = deck.giveCard();
        console.log(deck);
        console.log(cardDetails);

        const $card = $("<div>").addClass("card");
        $card.attr("value", cardDetails.value);
        const $cardTop = $("<span>").addClass("top").text(cardDetails.suit);
        const $cardText = $("<h5>").addClass("center").text(cardDetails.face[0]);
        const $cardBottom = $("<span>").addClass("bottom").text(cardDetails.suit);

        hand.append($card);
        $card.append($cardTop);
        $card.append($cardText);
        $card.append($cardBottom);

        if (hand.hasClass("computerHand") && hand.children(".card").length === 2) {
            $card.addClass("card-back");
        }

    };

    $("button").on("click", (event) => {
        const $button = $(event.currentTarget);

        if ($button.hasClass("start")) {
            assignCards($playerHand);
            assignCards($computerHand);
            assignCards($playerHand);
            assignCards($computerHand);
            $("button").toggleClass("button");
        } else if ($button.hasClass("hit")) {
            assignCards($playerHand);
        }



    });
})
    ;
