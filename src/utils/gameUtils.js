export function createSixDeck() {
    let deck = [];

    const suits = ["spades", "hearts", "diamonds", "clubs"]
    const values = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"]

    for (let i = 0; i < values.length; i++) {
        for (let j = 0; j < suits.length; j++) {
            deck.push({
                value: values[i],
                suit: suits[j],
            })
        }
    }

    let sixDeck = Array(3).fill(deck).flat();

    return sixDeck;
}

export function shuffleDeck(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]]; // Swap cards
    }
    return deck;
}

export function dealCard(deck) {
    const dealedCard = deck.pop();

    return dealedCard;
}

export function startGame(bet) {

    let deck = shuffleDeck(createSixDeck());

    let playersHand = [dealCard(deck), dealCard(deck)];

    let dealersHand = [dealCard(deck), dealCard(deck)];

    const canSplit = (playersHand[0].value === playersHand[1].value);

    let gameState = {
        deck,
        dealersHand,
        playersHand,
        canSplit,
        canDouble: true,
        playerScore: calculateScore(playersHand),
        dealersScore: calculateScore(dealersHand)
    }

    return gameState;
}

export function calculateScore(hand) {

    let score = 0;
    let aceScore = 0;

    hand.forEach((card) => {

        const value = card.value;

        if (value === "K" || value === "J" || value === "Q") {
            score += 10
        } else if (value === "A") {
            score += 11;
            aceScore++;
        }
        else {
            score += Number(value);
        }
    });

    while (score > 21 && aceCount > 0) {
        score -= 10;
        aceCount--;
    }

    return score

}

export function playerHit(gameState) {
    let { playersHand, deck } = gameState;

    const newCard = dealCard(deck);

    playersHand.push(newCard);

    const playerScore = calculateScore(playersHand);

    const newGameState = {
        ...gameState,
        deck,
        playerScore,
        playersHand,
        playerScore,
        canDouble: false
    };

    if (playerScore > 21) {
        dealerTurn(newGameState);
    }

    return newGameState;
}

export function playerDouble(gameState) {
    let { playersHand, deck, canDouble } = gameState;

    if (!canDouble) {
        return;
    }

    const newCard = dealCard(deck);

    playersHand.push(newCard);

    const playerScore = calculateScore(playersHand);

    const newGameState = {
        ...gameState,
        deck,
        playerScore,
        playersHand,
        playerScore,
        canDouble: false
    };

    dealerTurn(newGameState);
}

export function playerStand(gameState) {
    dealerTurn(gameState);
}

export function dealerTurn(gameState) {
    let { deck, playersHand, dealersHand, playerScore, dealersScore } = gameState;

    while (dealersScore < 17) {
        const newCard = dealCard(deck);
        dealersHand.push(newCard);
        dealersScore = calculateScore(dealersHand);
    }

    const newGameState = {
        ...gameState,
        deck,
        dealersHand,
        dealersScore,
    };

    getGameResult(newGameState);

    return newGameState;
}


export function getGameResult(gameState) {
    let { playerScore, dealersScore } = gameState;

    if(playerScore>21){
        console.log("Player busted")
        return;
    }

    if(dealersScore>21){
        console.log("Dealer busted")
        return;
    }

    if(playerScore === 21){
        console.log("Player has a BlackJack")
    }

    if (dealersScore === 21) {
        console.log("Dealer has a BlackJack");
    }

    if (playerScore > dealersScore) {
        console.log("Player Won");
        return;
    } else if (playerScore < dealersScore) {
        console.log("Player Lost");
        return;
    } else {
        console.log("Push (Tie)");
        return;
    }
}