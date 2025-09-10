
const initialDeck = [];
const cardBackImageSrc = "./images/cardBack.jpeg";
const numOfPairs = 15;

createCard = function(index) {
    return {
        turned: false,
        faceVisible: false,
        found: false,
        cardId: index,
        faceImage: "./images/" + 'face_' + index + ".jpeg",
    }
}

// create cards for all pairs
//ordered 0...11
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
            cards: [],
            card1: '',
            card2: '',
            totalPair: numOfPairs,
            foundPair: 0,
            moves: 0,
            isGameStarted: false,
            isGameEnd: false,
            selectedPairNumber: 8,
            gridRows: 4,
            windowWidth: window.innerWidth,
            isEndWindowOpen: false,
        }
    },

    watch: {
        card2(value) {
            if(value != ''){
                setTimeout(this.checkMatch, 300);
            }
        },

        foundPair(value){
            if(value == this.selectedPairNumber){
                this.isGameEnd = true;
                this.isEndWindowOpen = true;
            }
        }
    },
    computed: {
       gridColumns(){
            if(this.windowWidth < 700){
                switch(this.selectedPairNumber){
                    case 15: this.gridRows = 6; return 5;
                    case 12: this.gridRows = 6; break;
                    case 10: this.gridRows = 5; break;
                    default: this.gridRows = 4; break;

                }
                // max column number on smaller windows
                return 4;
            }

            else{
                this.gridRows = 4;
                // column number
                switch(this.selectedPairNumber){
                    case 15: 
                    this.gridRows = 5;
                    return 6;
                    case 12: return 6;
                    case 10: return 5;
                    default: return 4;

                }
            }
            
        },

    },

    methods:{
        startGame(){
            // Create a random deck with selected number of pairs
            this.cards = this.CreateRandomDeck(this.selectedPairNumber);
        
            this.isGameStarted = true;
            this.ShuffleCards();
        },

        SelectPair(number){
            this.selectedPairNumber = number;
        },

        restartGame(){
            this.cards.forEach((card) => {
                card.turned = false;
                card.faceVisible = false;
                card.found = false;
            });
            this.foundPair = 0;
            this.isGameEnd = false;
            this.moves = 0;
            this.card1 = '';
            this.card2 = '';
            this.isGameStarted = false;
            //this.ShuffleCards();
        },

        playAgain(){
            this.restartGame();
            this.startGame();
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
            this.moves++;
            if(this.card1.cardId == this.card2.cardId){
                this.foundPair++;
                // leave them turned up
                // clear selection
                this.card1.found = true;
                this.card2.found = true;
                this.card1 = '';
                this.card2 = '';
            }
            else{
                 // wait before flipping the cards back
                 setTimeout(this.FlipCardsBack, 500);
            } 
        },

        FlipCardsBack(){
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
            }, 300); 
        },

        // Fisher-Yates (Knuth) shuffle algorithm
        ShuffleCards(){
            for (let i = this.cards.length - 1; i > 0; i--) {
                // Generate a random index between 0 and i
                const j = Math.floor(Math.random() * (i + 1));
                
                // Swap elements at index i and j
                [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
              }
        },

        CreateRandomDeck(pairNum){
            let deck = initialDeck.slice(); // copy inital ordered deck

            // pair amount that needs to be removed
            let removeAmount = numOfPairs - pairNum; 

            // randomly remove pairs from the deck until reached the desired count
            for(let n = 0; n < removeAmount; n++){
                // select a random pair 
                removePairPosition = Math.floor(Math.random() * (deck.length / 2));
                
                // remove the pair
                deck.splice(removePairPosition * 2, 2);
            }

            return deck;
        },

        handleResize(){
            this.windowWidth = window.innerWidth;
            // console.log("change window");
            //this.cardWidth =  (this.windowWidth / 10) + 'rem';
        },

        PrintArray(array){
            array.forEach(item => console.log(item.faceImage));
        }

    },

    mounted(){
         window.addEventListener('resize', this.handleResize);
    },
    beforeUnmount(){
          window.removeEventListener('resize', this.handleResize);
    }
    
});

app.mount('#game');