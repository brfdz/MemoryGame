
const initialDeck = [];
const cardBackImageSrc = "./images/cardBack.jpeg";
const numOfPairs = 8;

createCard = function(index) {
    return {
        turned: false,
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
        }
    },

    computed: {
    },

    watch: {
        card2(value) {
            if(value != ''){
                setTimeout(this.isMatch, 500);
            }
            
        },

        foundPair(value){
            if(value == this.totalPair){
                alert("You won!");
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
            });
            this.foundPair = 0;
            this.card1 = '';
            this.card2 = '';
            this.ShuffleCards();
        },

        select(picked){
            if(!picked.turned){
                if(this.card1 == ''){
                    this.card1 = picked;
                    picked.turned = true;
                }
                else if(this.card2 == ''){
                    this.card2 = picked;
                    picked.turned = true;
                }

            }
        },

        isMatch() {
            if(this.card1.cardId == this.card2.cardId){
                this.foundPair++;
                // leave them turned up
            }
            else{
                // turn the cards
                this.card1.turned = false;
                this.card2.turned = false;
            }

            // clear selection
            this.card1 = '';
            this.card2 = '';
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