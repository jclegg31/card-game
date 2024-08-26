// if (!localStorage.getItem('deckId')) {
//   localStorage.setItem('deckId', '');
// }

let deckId = '';

//gets deck of cards and stores ID of the deck (put that in local storage later)
fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
  .then((res) => res.json()) //parse response as JSON
  .then((data) => {
    console.log(data);
    deckId = data.deck_id;
  })
  .catch((err) => {
    console.log(`error ${err}`);
  });

document.querySelector('button').addEventListener('click', drawTwo);

//draw two cards from the deck we chose above
function drawTwo() {
  const url = `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`;

  fetch(url)
    .then((res) => res.json()) //parse response as JSON
    .then((data) => {
      console.log(data);
      document.querySelector('#player1').src = data.cards[0].image;
      document.querySelector('#player2').src = data.cards[1].image;
      let player1Val = convertToNum(data.cards[0].value);
      let player2Val = convertToNum(data.cards[1].value);
      if (player1Val > player2Val) {
        document.querySelector('h3').innerText = 'Player 1 wins';
      } else if (player1Val < player2Val) {
        document.querySelector('h3').innerText = 'Player 2 wins';
      } else {
        document.querySelector('h3').innerText = 'WAR!';
      }
    })
    .catch((err) => {
      console.log(`error ${err}`);
    });
}

function convertToNum(val) {
  if (val === 'ACE') {
    return 14;
  } else if (val === 'KING') {
    return 13;
  } else if (val === 'QUEEN') {
    return 12;
  } else if (val === 'JACK') {
    return 11;
  } else {
    return Number(val);
  }
}
