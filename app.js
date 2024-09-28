
const initialDeck = [];
let aCharCode = 'a'.charCodeAt(0);
const numOfPairs = 8;

createDeck = function(){
    for(let i = 0; i < numOfPairs; i++){
        initialDeck.push({
            turned: false,
            face: String.fromCharCode(aCharCode + i), 
            up: '#'
        });

        initialDeck.push({
            turned: false,
            face: String.fromCharCode(aCharCode + i), 
            up: '#'
        });
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
        }
    },

    computed: {
    },

    watch: {
        card2(value) {
            if(value != ''){
                setTimeout(this.isMatch, 200);
            }
            
        },

        foundPair(value){
            if(value == this.totalPair){
                alert("You won!");
            }
        }
    },

    methods:{
        select(picked){
            if(!picked.turned){
                if(this.card1 == ''){
                    this.card1 = picked;
                    picked.turned = true;
                    picked.up = picked.face;
                }
                else if(this.card2 == ''){
                    this.card2 = picked
                    picked.turned = true;
                    picked.up = picked.face;
                }

            }
        },

        isMatch() {
            if(this.card1.face == this.card2.face){
                this.foundPair++;
                // leave them turned
            }
            else{
                // reset cards
                this.card1.up = '#';
                this.card1.turned = false;

                this.card2.up = '#';
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