

const colorDotElements = ["red", "orange", "yellow", "green", "blue", "purple"];
var consetdeck = [];
for (let i = 1; i < 64; i++) {
    consetdeck.push(i);
}

//Misc Helpers
function randomFromArray(array) {
    return array[Math.floor(Math.random() * array.length)];
}

//fisher yates shuffle, code stolen from GFG
let fyshuffle = (arr) => {
    for (let i = 62; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
}

function xor(l) {
    var curr = 0;
    for (var i = 0; i < l.length; i++) {
        curr = curr ^ l[i];
    }
    return curr;
}




(function () {
    let gameid = prompt("Please enter room code");
    let myname = prompt("Please enter your name");
    

    let playerId;
    let playerRef;
    let nameList = [];
    let players = {};
    let playerElements = {};

    let deck = [];
    let killed;
    let table = [];
    let selectedCards = [];
    let target;

    /* 
    let probationcards = [];
    let probationcandidates = [];
    let probationStatus = false;
    */ 


    function checkConset(cards, target) {
        const cvals = cards.map(x => table[x]);
        if (xor(cvals) == target) {
            return true;
        }
        else {
            console.log("not a conset!");
            return false;
        }
    }

    // shit that requires you to send crap

    function sendDeclaration(cards) {
        firebase.database().ref(`games/${gameid}/events`).push({
            type: "declare",
            cards: cards,
            author: playerId,
            authorname: myname
        })
    }

    // shit for like syncing
    function declare(cards) {
        // Remove the cards, then deal the next cards;
        cards.forEach((x, i) => {
            table[x] = deck.pop(); //* 
            if (selectedCards.includes(x)) {
                cselect(x);
            }
        });
        updateTable();
    }

    function updateNameList() {
        var stringnamelist = "Connected users: ";
        nameList.forEach((x, i) => {
            stringnamelist += "<li>" + x + "</li>";
        })
        document.getElementById("plist").innerHTML = stringnamelist;
    }

    function startNewGame() {
        // shuffle cards
        deck = [...consetdeck];
        fyshuffle(deck);
        // probationcards = [];
        unfadeCards();
        firebase.database().ref(`games/${gameid}/events`).set({});
        firebase.database().ref(`games/${gameid}/events`).push({
            type: "startgame",
            cards: deck,
            author: playerId,
            authorname: myname
        });
    }

    // do stuff with the actual UI lol
    function cardFromNumber(num) {
        // convert the number into a card, somehow
        // first, binary is necessary
        if (num == 0) {
            // dont render a card
            return 0;
        }
        let cardstring = (64 + num).toString(2).substring(1);
        let retstring = "<div class=\"dots-table-container\"> <table class=\"dots-table\">";
        let counter = 0;
        for (const c of cardstring) {
            if (counter % 2 == 0) {
                retstring += "<tr>";
            }
            if (c == "1") {
                retstring += `<td><div class="dot ${colorDotElements[counter]}-dot"></div></td>`;
            }
            else {
                retstring += `<td><div class="dot invisible-dot"></div> </td>`;
            }
            if (counter % 2 == 1) {
                retstring += "</tr>";
            }
            counter++;
        }
        retstring += "</table></div>";
        return retstring;
    }
    function fadeCard(ind) {
        var x =document.getElementById(`${ind}`).getElementsByClassName("dots-table-container")[0];
        x.classList.add("faded");
    }

    function unfadeCards(){
        for (var i =0; i<7; i++){
            var x = document.getElementById(`${i}`).getElementsByClassName("dots-table-container")[0];
            x.classList.remove("faded");
        }
    }

    function updateCard(ind) {
        document.getElementById(`${ind}`).innerHTML = cardFromNumber(table[ind]);
    }

    function updateTable() {
        //hardcoding ftw? 
        for (var i = 0; i < 7; i++) { // fix me later
            updateCard(i);
        }
        // document.getElementById('probationPile').innerHTML = `<div class="cardcount">${probationcards.length}</div>`

    }

    function toggleSelection(ind) {
        document.getElementById(`${ind}`).classList.toggle("selected");
    }
    function clearSelections() {
        selectedCards = [];
        for (var i=0; i< 7; i++){ // fix me later
            document.getElementById(`${i}`).classList.remove("selected");
        }
    }

    function cselect(ind) {
        // select/unselect the god damn card
        if (selectedCards.includes(ind)) {
            selectedCards = selectedCards.filter(e => e != ind);
        }
        else {
            selectedCards.push(ind);
        }
        toggleSelection(ind);
    }

    function probationAction(){
        if (probationStatus) {
            if (selectedCards.length ==1 && probationcandidates.includes(selectedCards[0])) {
                firebase.database().ref(`games/${gameid}/events`).push({
                    type: "probateCard",
                    cards: selectedCards,
                    author: playerId,
                    authorname: myname
                });
            }
        }
        else {
            if (selectedCards?.length && checkConset(selectedCards, 0)) { 
                firebase.database().ref(`games/${gameid}/events`).push({
                    type: "declareProbation",
                    cards: selectedCards,
                    author: playerId,
                    authorname: myname
                });
            }
        }
    }


    function boxUpdate(stringAction){
        document.getElementById("log").innerHTML = `<p>${stringAction}</p>`;
    }

    function handleEvent(evnt) {
        if (evnt.type == "declare") {
            if (checkConset(evnt.cards, target)) {
                console.log('Event', evnt);
                declare(evnt.cards, evnt.author);
                boxUpdate(`<b>${evnt.authorname}</b> declares ProSet: ${evnt.cards.join(', ')}`);
                clearSelections();
            }
        }
        if (evnt.type == "startgame") {
            deck = evnt.cards;
            table = [deck.pop(), deck.pop(), deck.pop(), deck.pop(), deck.pop(), deck.pop(), deck.pop()];
            // table = [deck.pop(), deck.pop(), deck.pop(), deck.pop(), deck.pop(), deck.pop()];
            //target = deck[0];
            target = 0;
            // document.getElementById("targetcard").innerHTML = cardFromNumber(target);
            boxUpdate(`<b>${evnt.authorname}</b> starts a new game!`);
            clearSelections();
            updateTable();
        }
        if (evnt.type == "declareProbation") {
            probationcandidates = evnt.cards;
            for (var i=0; i<7; i++) {
                if (!probationcandidates.includes(i)){
                    fadeCard(i);
                }
            }
            boxUpdate(`<b>${evnt.authorname}</b> finds ProSet: ${evnt.cards.join(', ')}`);
            probationStatus = true;
            clearSelections();
        }
        if (evnt.type == "probateCard") {
            killed = evnt.cards[0];
            boxUpdate(`<b>${evnt.authorname}</b> probates ${killed}`);
            probationStatus = false;
            probationcards.push(table[killed]);
            table[killed] = deck.pop();
            updateTable();
            unfadeCards();
            clearSelections();
        }
    }
    function initGame() {

        const allPlayersRef = firebase.database().ref(`games/${gameid}/players`);
        const dbgameEvents = firebase.database().ref(`games/${gameid}/events`);
        const gameref = firebase.database().ref(`games/${gameid}`);

        // when players change
        allPlayersRef.on("value", (snapshot) => {
            //Fires whenever a change occurs
            players = snapshot.val() || {};
            nameList = [];
            Object.keys(players).forEach((x) => {
                nameList.push(players[x].name);
            })
            updateNameList();
        })


        // handling events when received 

        dbgameEvents.once("value", (snapshot) => {
            snapshot.forEach((childSnapshot) => {
                console.log(childSnapshot.key);
                handleEvent(childSnapshot.val());
            });
        })

        dbgameEvents.on("child_added", (snapshot) => {
            const newEvent = snapshot.val() || {};
            handleEvent(newEvent);
        })

        //make button do stuff 
        document.querySelector("#gamestart").addEventListener("click", () => {
            startNewGame();
        })
         // set listeners for declaring
         new KeyPressListener("Space", () => {
            sendDeclaration(selectedCards);
            console.log("Declared!");
        });
        

         //document.getElementById("targetcard").addEventListener("click", () => { sendDeclaration(selectedCards); })
        document.getElementById("probationPile").addEventListener("click", () => {sendDeclaration(selectedCards); })
        // new KeyPressListener("ShiftLeft", () => {probationAction();});

        new KeyPressListener("KeyE", () => {cselect(0);});
        new KeyPressListener("KeyR", () => {cselect(1);});
        new KeyPressListener("KeyS", () => {cselect(2);});
        new KeyPressListener("KeyD", () => {cselect(3);});
        new KeyPressListener("KeyF", () => {cselect(4);});
        new KeyPressListener("KeyX", () => {cselect(5);});
        new KeyPressListener("KeyC", () => {cselect(6);});
        // right handed
        new KeyPressListener("KeyI", () => {cselect(0);});
        new KeyPressListener("KeyO", () => {cselect(1);});
        new KeyPressListener("KeyJ", () => {cselect(2);});
        new KeyPressListener("KeyK", () => {cselect(3);});
        new KeyPressListener("KeyL", () => {cselect(4);});
        new KeyPressListener("KeyM", () => {cselect(5);});
        new KeyPressListener("Comma", () => {cselect(6);});
        document.getElementById("0").addEventListener("click", () => { cselect(0) })
        document.getElementById("1").addEventListener("click", () => { cselect(1) })
        document.getElementById("2").addEventListener("click", () => { cselect(2) })
        document.getElementById("3").addEventListener("click", () => { cselect(3) })
        document.getElementById("4").addEventListener("click", () => { cselect(4) })
        document.getElementById("5").addEventListener("click", () => { cselect(5) })
        document.getElementById("6").addEventListener("click", () => { cselect(6) })
    }



    firebase.auth().onAuthStateChanged((user) => {
        console.log(user)
        if (user) {
            playerId = user.uid;
            playerRef = firebase.database().ref(`games/${gameid}/players/${playerId}`);
            document.getElementById("roomname").innerHTML = `<h1> Room ${gameid} </h1>`;

            playerRef.set({
                id: playerId,
                name: myname,
            })

            //Remove me from Firebase when I diconnect
            playerRef.onDisconnect().remove();

            //Begin the game now that we are signed in
            initGame();
        } else {
            //You're logged out.
        }
    })



    firebase.auth().signInAnonymously().catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
        console.log(errorCode, errorMessage);
    });


})();
