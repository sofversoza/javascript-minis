// 1. Deposit some money
// 2. Determine number of line to bet on
// 3. Collect a bet amount
// 4. Spin the slot machine
// 5. Check if the user won
// 6. Give the user their winnings OR take their bet if they lost
// 7. Play again

// start up our prompt-sync package
const prompt = require("prompt-sync")();

const ROWS = 3;
const COLS = 3;

const SYMBOLS_COUNT = { // how many of these symbols we'll have per column
  A: 2,
  B: 4,
  C: 6,
  D: 8,
}

const SYMBOL_VALUES = { // if we get a line of A's, we'll multiply the bet by 5
  A: 5,
  B: 4,
  C: 3,
  D: 2
}

// STEP 1
const deposit = () => {
  // while (true) is an infinite loop, so it'll continue to do this until we get a valid deposit amount from the user
  while (true) {
    const depositAmount = prompt("Enter a deposit amount: ");
    
    // once we get a user input(string), we'll convert it into a number so we can subtract from it & also make sure the user entered a valid amount
    const numberDepositAmount = parseFloat(depositAmount);
  
    // now we'll check if this is a valid number (if user entered "hello" parseFloat will return NaN (not a number) or if the user entered a negative number)
    if (isNaN(numberDepositAmount) || numberDepositAmount <= 0) {
      console.log("Invalid deposit amount, please try again.");
    } else {
      // otherwise, this function will return the valid deposit amount
      return numberDepositAmount;
    }
  }
}

// STEP 2
const getNumberOfLines = () => {
  while (true) {
    const lines = prompt("Enter the number of lines to bet on (1-3): ");
    const numberOfLines = parseFloat(lines);

    if (isNaN(numberOfLines) || numberOfLines <= 0 || numberOfLines > 3) {
      console.log("Invalid number of lines, please try again");
    } else {
      return numberOfLines;
    }
  }
}

// STEP 3
// the total bet is based on the balance the user has (cant have a bet more than their balance) divided by the number of lines they're going to bet on
const getBet = (balance, lines) => {
  while (true) {
    const bet = prompt("Enter the bet per line: ");
    const numberBet = parseFloat(bet);

    // the maximum bet a user can make is whatever their balance is divided by the num of lines they're going to bet on (ex: if they bet 2, the total is 6, bc the bets on 3 different lines)
    if (isNaN(numberBet) || numberBet <= 0 || numberBet > balance / lines) {
      console.log("Invalid bet, try again");
    } else {
      return numberBet;
    }
  }
}

// STEP 4
// to generate the reels, we'll put all of the possible symbols we can use (SYMBOLS_COUNT) inside of an array, then we'll randomly select them out of the array, and remove them from the array every single time that we use them while we're generating each reel/column
const spin = () => {
  const symbols = [];

  // generate an array that contains all of the possible symbols we can have
  for (const [symbol, count] of Object.entries(SYMBOLS_COUNT)) {
    // console.log(symbol, count);
    // now that we have the symbols and their count, we'll add it to the array
    for (let i = 0; i < count; i++) {
      symbols.push(symbol)
    }
  }
  // console.log(symbols);

  const reels = []; 
  
  // loop through the reels array
  for (let i = 0; i < COLS; i++) {
    reels.push([]); // --> [[], [], []] after we push all 3 COLS
    // copy the symbols we have available to choose for this specific reel
    const reelSymbols = [...symbols];
    
    // generate what goes inside of each columns(1-3) for each reels
    for (let j = 0; j < ROWS; j++) {
      // randomly select a symbol from our new unique symbols array
      const randomIndex = Math.floor(Math.random() * reelSymbols.length)
      const selectedSymbol = reelSymbols[randomIndex];
      // add selected symbol into the current iteration reel
      reels[i].push(selectedSymbol);
      // remove symbol so we cant select it again while we generate the remaining column of this reel. randomIndex is the position which were removing the element
      reelSymbols.splice(randomIndex, 1);
    }
  }

  return reels; // [['C', 'B', 'C'], ['C', 'D', 'B'], ['A', 'B', 'D']] vertical columns
}

// BEFORE STEP 5: TRANSPOSE
// to be able to check if the user won, we want to check our reels in rows not columns, so we'll be transposing a matrix or transposing a 2d array
// [['C', 'B', 'C'], ['C', 'D', 'B'], ['A', 'B', 'D']] --> reels in columns (currently)
// [C C A] --> row 1
// [B D B] --> row 2
// [C B D] --> row 3
const transpose = (reels) => {
  const rows = [];
  // for each row, collect all of the elements from our columns in that row then push them into our rows array
  for (let i = 0; i < ROWS; i++) { // for every single row
    rows.push([]);
    for (let j = 0; j < COLS; j++) { // loop through every single column
      // for every column we have, we'll grab the element thats in the 1st row in that col
      rows[i].push(reels[j][i])
    }
  }

  return rows;
}

// STEP 5 
const printRows = (rows) => {
  // loop through every single row & show them to the user
  for (const row of rows) { // this is iterating by item meaning we'll get an array
    let rowString = "";
   
    // ['C', 'B', 'C'] -> [0, C] [1, B] [2, C]
    for (const [i, symbol] of row.entries()) {
      rowString += symbol
      
      // add | only if its not the last symbol that we have "A | B | C"
      if (i != row.length - 1) {
        rowString += " | "
      }
    }

    console.log(rowString);
  }
}

// STEP 6 
const getWinnings = (rows, bet, lines) => {
  let winnings = 0;

  // loop through all of the lines (the row indeces we want to check)
  for (let row = 0; row < lines; row++) {
    const symbols = rows[row];
    let allSame = true;
    
    // now that we have all the symbols, we'll check if they're all the same
    for (const symbol of symbols) { // iterating by item looking at individual symbols 
      if (symbol != symbols[0]) { // only checking the first symbol bc all needs to match
        allSame = false;
        break;
      }
    }

    if (allSame) {
      winnings += bet * SYMBOL_VALUES[symbols[0]]
    }
  }

  return winnings;
}

// STEP 7
const game = () => {
  let balance = deposit();

  // we'll do all this  to start & if the user continue to play
  while (true) {
    console.log("You have a balance of $" + balance);
    const numberOfLines = getNumberOfLines();
    const bet = getBet(balance, numberOfLines);

    balance -= bet * numberOfLines;

    const reels = spin();
    const rows = transpose(reels);
    printRows(rows);
    const winnings = getWinnings(rows, bet, numberOfLines);

    balance += winnings;
    console.log("You won $" + winnings.toString());

    if (balance <= 0) {
      console.log("You ran out of money!");
      break;
    }

    const playAgain = prompt("Do you want to play again? (y/n) ")
    
    if (playAgain != "y") break;
  };

}

game();