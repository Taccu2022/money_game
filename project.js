// 1. Deposite some money
// 2. Determine number of lines to bet on
// 3. Collect a bet amount
// 4. Spin the slot machine
// 5. Check if the user won
// 6. Give the user their wining
// 7. play again

// npm init
// npm i prompt-sync 
// to run the code "node project.js"

// function deposit(){
//     return 1
// }
// const x=deposit()

// function can also be written as follows

const prompt = require("prompt-sync")();

const ROWS = 3;
const COLS = 3;

const SYMBOLS_COUNT ={
    A: 2,
    B: 4,
    C: 6,
    D: 8
}

const SYMBOL_VALUE ={
    A: 5,
    B: 4,
    C: 3,
    D: 2
}

const deposite = () => {
    while(true){
        const depositAmount = prompt("Enter a deposit amount: ");
        //parseFloat will convert string into number
        const numberDepositAmount = parseFloat(depositAmount);

        //isNaN will check if the entered value is a not a number
        if (isNaN(numberDepositAmount) || numberDepositAmount <= 0) {
            console.log("Invalid deposit amount, try again.");
        }else{
            return numberDepositAmount;
        }
    }
};

const getNumberOfLines = () =>{
    while(true){
        const lines = prompt("Enter the number of lines to bet on (1-3): ");
        //parseFloat will convert string into number
        const numberOfLines = parseFloat(lines);

        //isNaN will check if the entered value is a not a number
        if (isNaN(numberOfLines) || numberOfLines <= 0 || numberOfLines > 3) {
            console.log("Invalid number of lines, try again.");
        }else{
            return numberOfLines;
        }
    }
}

const getBet = (balance, lines) => {
    while(true){
        const bet = prompt("Enter the bet per line: ");
        //parseFloat will convert string into number
        const numberBet = parseFloat(bet);

        //isNaN will check if the entered value is a not a number
        if (isNaN(numberBet) || numberBet <= 0 || numberBet*lines > balance) {
            console.log("Invalid bet amount, try again.");
        }else{
            return numberBet;
        }
    }
}

const spin =()=>{
    const symbols = [];
    for (const[symbol, count] of Object.entries(SYMBOLS_COUNT)){
        // console.log(symbol, count);
        for(let i=0; i<count; i++){
            symbols.push(symbol);
        }
    }
    // console.log(symbols);
    const reels = [];//[[],[],[]]; made dynamic by reels.push([]);
    for(let i=0; i<COLS; i++){
        reels.push([]);
        const reelSymbols= [...symbols];
        for(let j=0; j<ROWS; j++){
            const randomIndex = Math.floor(Math.random()*reelSymbols.length);
            const selectedSymbol = reelSymbols[randomIndex];
            reels[i].push(selectedSymbol);
            reelSymbols.splice(randomIndex, 1);
        }
    }
    return reels;
}

//trnspose matrix
const transpose = (reels) => {
    const rows =[];
    for(let i=0; i<ROWS; i++){
        rows.push([]);
        for(let j=0; j<COLS; j++){
            rows[i].push(reels[j][i]);
        }
    }
    return rows
}

const printRows = (rows) =>{
    for(const row of rows){
        let rowString = "";
        for(const [i, symbol] of row.entries()){
            rowString += symbol
            if(i != row.length-1){
                rowString += " | "
            }
        }
        console.log(rowString)
    }
}

const getWinnings = (rows, bet, lines) => {
    let winnigs =0;
    for(let row =0; row<lines; row++){
        const symbols = rows[row];
        let allSame = true;

        for(const symbol of symbols){
            if(symbol != symbols[0]){
                allSame = false;
                break;
            }
        }
        
        if (allSame){
            winnigs += bet * SYMBOL_VALUE[symbols[0]];
        }
    }
    return winnigs;
}

const game = () =>{
    let balance = deposite();
    // console.log(balance);
    while (true){
        console.log("You have a balance of ₹"+balance+" ");
        const lines = getNumberOfLines();
        // console.log(lines);
        const bet = getBet(balance, lines);
        // console.log(bet);
        balance -= bet * lines;
        const reels = spin();
        // console.log(reels);

        const rows = transpose(reels);
        // console.log(rows);

        printRows(rows);

        const won = getWinnings(rows, bet, lines);
        console.log("You wo , ₹ " +won.toString());
        balance+=won;
        if(balance<=0){
            console.log("You ran out of money!");
            break;
        }
        var playAgain = prompt("Do you want to play again (y/n)? ");
        if(playAgain != "y") break;
    }
}

game();


