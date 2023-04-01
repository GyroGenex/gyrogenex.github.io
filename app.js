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

class Deck{
    constructor(cardArray){
        this.cardArray=cardArray
    }

    shuffle() {
        this.cardArray.sort(() => Math.random() - 0.5);
    };

    compare () {
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
}
const faces = ["Ace", "2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King"];
const suits = ["Clubs", "Diamonds", "Spades", "Hearts"];

const deckArray = [];

for (let face of faces) {
    for (let suit of suits) {
        deckArray.push(new Card(face, suit));
    }
}

