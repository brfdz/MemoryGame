
const initialDeck = [];
const cardBackImageSrc = "./images/cardBack.jpeg";
const numOfPairs = 8;

createCard = function(index) {
    return {
        turned: false,
        faceVisible: false,
        cardId: index,
        faceImage: "./images/" + 'face_' + index + ".jpeg",
    }
}

createDeck = function(){
    for(let i = 0; i < numOfPairs; i++){
        //Create a pair
        initialDeck.push(createCard(i));
        initialDeck.push(createCard(i));
    };
};

createDeck();

const app = Vue.createApp({
    data(){
        return{
            cards: initialDeck,
            card1: '',
            card2: '',
            totalPair: numOfPairs,
            foundPair: 0,
            isGameStarted: false,
            isGameEnd: false,
        }
    },

    watch: {
        card2(value) {
            if(value != ''){
                setTimeout(this.checkMatch, 500);
            }
        },

        foundPair(value){
            if(value == this.totalPair){
                this.isGameEnd = true;
            }
        }
    },

    methods:{
        startGame(){
            this.isGameStarted = true;
            this.ShuffleCards();
        },

        restartGame(){
            this.cards.forEach((card) => {
                card.turned = false;
                card.faceVisible = false;
            });
            this.foundPair = 0;
            this.isGameEnd = false;
            this.card1 = '';
            this.card2 = '';
            this.ShuffleCards();
        },

        select(picked){
            if(!picked.turned){
                if(this.card1 == ''){
                    this.card1 = picked;
                }
                else if(this.card2 == ''){
                    this.card2 = picked;
                }
                else{
                    return;
                }   
                picked.turned = true;
                picked.faceVisible = true;
            }
        },

        checkMatch() {
            if(this.card1.cardId == this.card2.cardId){
                this.foundPair++;
                // leave them turned up
                // clear selection
                this.card1 = '';
                this.card2 = '';
            }
            else{
                // turn the cards - trigger animations
                this.card1.turned = false;
                this.card2.turned = false;
                setTimeout(() => {
                    // Hide face after the flip animation completes
                    this.card1.faceVisible = false; 
                    this.card2.faceVisible = false;
                    // clear selection
                    this.card1 = '';
                    this.card2 = '';
                }, 400);  
            } 
        },

        // Fisher-Yates (Knuth) shuffle algorithm
        ShuffleCards(){
            for (let i = this.cards.length - 1; i > 0; i--) {
                // Generate a random index between 0 and i
                const j = Math.floor(Math.random() * (i + 1));
                
                // Swap elements at index i and j
                [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
              }
              return array;
        },

    },
    
});

app.mount('#game');