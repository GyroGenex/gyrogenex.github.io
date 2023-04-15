class Card { // card class 
    constructor(face, suit) {
        if (face === "Ace") {
            this.value = 11;
        } else if (face === "Jack" || face === "Queen" || face === "King") {
            this.value = 10;
        } else (
            this.value = parseInt(face)
        );

        if (face === "Jack" || face === "Queen" || face === "King" || face === "Ace" || face === "10") {
            this.hilo = -1;
        } else if (face === "2" || face === "3" || face === "4" || face === "5" || face === "6") {
            this.hilo = 1;
        } else {
            this.hilo = 0;
        }
        this.face = face;
        this.suit = suit;
        this.faceUp = false;
    }
}

class Deck { // deck Class. it can shuffle and deal cards also returns number of cards and total decks

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

    length() {
        return this.cardArray.length;
    }

    numDecks() {
        return Math.ceil(this.cardArray.length / 52);
    }
}
const faces = ["Ace", "2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King"];
const suits = ["♣", "♦", "♠", "♥"];

const deckArray = [];



$(() => {
    $(".container").append($("<h1>").text("Deck Count Form"));
    $form = $("<form>");
    $form.append($("<label>").text("How many decks do you want to play with?"));
    $form.append($("<input>").attr("type", "number").attr("name", "deck-count"));
    $form.append($("<input>").attr("type", "submit"));
    $(".container").append($form);
    $(document).ready(() => {
        $('form').submit((event) => {
            event.preventDefault();
            deckCount = $('input[name="deck-count"]').val();
            console.log('Deck count: ' + deckCount);
            // do something with the deck count value

            for (i = 0; i < deckCount; i++) {
                for (let face of faces) {
                    for (let suit of suits) {
                        deckArray.push(new Card(face, suit));
                    }
                }
            }

            $(".container").children().remove();
            // build the board
            const deck = new Deck(deckArray);
            deck.shuffle();
            let count = 0;

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

            const $remainingCards = $("<h5>").text(`Cards remaining: ${deck.length()}`);
            $choices.append($remainingCards);

            const $startButton = $("<button>").text("start").addClass("start");
            $choices.append($startButton);

            const $hitButton = $("<button>").text("hit").addClass("hit button");
            $choices.append($hitButton);

            const $standButton = $("<button>").text("stand").addClass("stand button");
            $choices.append($standButton);

            const $nextButton = $("<button>").text("next").addClass("next button");
            $choices.append($nextButton);

            const $trueCount = $("<h5>").text(`True Count: ${0.00}`);
            $choices.append($trueCount);
            //board built

            //add some functions to calculate true count, card Details and checkValue

            const updateTrueCount = (card, deck) => {
                if (card.hasClass("card-back") == false) {
                    count += parseInt(card.attr("hilo"));
                    $trueCount.text(`True Count:${(count / deck.numDecks()).toFixed(2)}`);
                }
            };
            const assignCards = (hand) => {

                const cardDetails = deck.giveCard();
                $remainingCards.text(`Cards remaining: ${deck.length()}`);

                const $card = $("<div>").addClass("card");
                $card.attr("value", cardDetails.value);
                $card.attr("hilo", cardDetails.hilo);
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
                    // console.log("Ace");
                    hand.attr("countaces", parseInt(hand.attr("countaces")) + 1);
                }

                if (hand.hasClass("computerHand") && hand.children(".card").length === 2) {
                    $card.addClass("card-back");
                }

                updateTrueCount($card, deck);




            };

            const checkValue = (value, hand) => {
                let trueValue = value;
                console.log()
                if (trueValue > 21 && parseInt(hand.attr("countaces"))>0) {
                    console.log("higher than 21" ) ;
                    // console.log(hand.attr("countaces"));
                    console.log(trueValue);
                    console.log(hand.attr("countaces"))
                    hand.attr("countaces", parseInt(hand.attr("countaces")) - 1);
                    console.log(hand.attr("countaces"))
                    trueValue -= 10;
                    console.log(trueValue);
                    trueValue = checkValue(trueValue, hand);
                }   
                return(trueValue);
                
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
                            updateTrueCount($(div), deck);
                        }
                    });

                    while (computerValue < 17) {
                        assignCards($computerHand);
                        const $lastCard = $("div.computerHand").children(".card:last-child");
                        computerValue += parseInt($lastCard.attr("value"));
                        computerValue = checkValue(computerValue, $computerHand);
                    }



                    setTimeout(() => {
                        let playerActualValue = checkValue(playerValue, $playerHand);
                        console.log(playerActualValue);
                        let computerActualValue = checkValue(computerValue, $computerHand);
                        console.log(computerActualValue);


                        if (playerActualValue > 21) {
                            alert("Player busted");
                            return;
                        }

                        if (computerActualValue > 21) {
                            alert("Dealer busted");
                            return;
                        }

                        if (playerActualValue > computerActualValue) {
                            alert("Computer wins!");
                        } else if (playerActualValue < computerActualValue) {
                            alert("Dealer wins!");
                        } else {
                            alert("It's a tie");
                        }


                    }, 500);

                } else if ($button.hasClass("next")) {
                    $(".card").remove();
                    $("button").toggleClass("button");
                    $playerHand.attr("countaces", 0);
                    $computerHand.attr("countaces", 0);
                }
            });
        });

    });

});
