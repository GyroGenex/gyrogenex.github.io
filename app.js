class Card { // card class 
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

class Deck { // deck Class. it can shuffle and deal cards

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

    const $computerHand = $("<div>").addClass("computerHand").attr("countAces", 0);
    const $computerCards = $("<span>").text("Computer's Hand").addClass("description");
    $computerHand.append($computerCards);
    const $playerHand = $("<div>").addClass("playerHand").attr("countAces", 0);;
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

    $standButton = $("<button>").text("stand").addClass("stand button");
    $choices.append($standButton);

    $nextButton = $("<button>").text("next").addClass("next button");
    $choices.append($nextButton);


    const assignCards = (hand) => {

        const cardDetails = deck.giveCard();

        const $card = $("<div>").addClass("card");
        $card.attr("value", cardDetails.value);
        const $cardTop = $("<span>").addClass("top").text(cardDetails.suit);
        const $cardText = $("<h5>").addClass("center");
        if (cardDetails.face == "10") {
            $cardText.text(cardDetails.face);
        } else {
            $cardText.text(cardDetails.face[0]);
        }
        const $cardBottom = $("<span>").addClass("bottom").text(cardDetails.suit);

        hand.append($card);
        $card.append($cardTop);
        $card.append($cardText);
        $card.append($cardBottom);

        if ($cardText.text() == "A") {
            console.log("Ace");
            hand.attr("countaces", parseInt(hand.attr("countaces")) + 1);
        }

        // if (hand.hasClass("computerHand") && hand.children(".card").length === 2) {
        //     $card.addClass("card-back");
        // }

    };

    const checkValue = (value, hand) => {
        if (value > 21) {
            console.log("higher than 21");
            console.log(hand.attr("countaces"));
            if (parseInt(hand.attr("countaces")) > 0) {
                hand.attr("countaces", parseInt(hand.attr("countaces")) - 1);
                value -= 10;
                console.log(value);
                checkValue(value, hand);
            }
        }

        return value;
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
        } else if ($button.hasClass("stand")) {
            let playerValue = 0;
            const $playerCards = $("div.playerHand").children(".card");
            $playerCards.each((index, div) => {
                const value = parseInt($(div).attr("value"));
                playerValue += value;

            });


            let computerValue = 0;
            const $computerCards = $("div.computerHand").children(".card");
            $computerCards.each((index, div) => {
                const value = parseInt($(div).attr("value"));
                computerValue += value;
                if ($(div).hasClass("card-back")) {
                    $(div).toggleClass("card-back");
                }
            });

            while (computerValue < 16) {
                assignCards($computerHand);
                const $lastCard = $("div.computerHand").children(".card:last-child");
                computerValue += parseInt($lastCard.attr("value"));
                computerValue = checkValue(computerValue, $computerHand);
            }



            setTimeout(() => {
                playerValue = checkValue(playerValue, $playerHand);
                console.log(playerValue);
                computerValue = checkValue(computerValue, $computerHand);
                console.log(computerValue);


                if (playerValue > 21) {
                    alert("Player busted");
                    return;
                }

                if (computerValue > 21) {
                    alert("Dealer busted");
                    return;
                }

                if (playerValue > computerValue) {
                    alert("player wins!");
                } else if (playerValue < computerValue) {
                    alert("computer wins!");
                } else {
                    alert("It's a tie");
                }


            }, 500);

        } else if ($button.hasClass("next")) {
            $(".card").remove();
            $("button").toggleClass("button     ");
        }
    });
});


