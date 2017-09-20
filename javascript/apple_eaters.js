/*
The Apple Eaters

A simple JavaScript game we created together with my kids to teach them coding.
Teaches basics of concepts like model/view, reacting to events, DOM manipulation.
*/

const APPLES = 2000; 
 
let player1 = {
  x: 10,
  y: 10,
  direction: null,
  name: 'Elena',
  color: 'purple',
  score: 0, 
  
  keys: { // ASDW
    65: 'left', 
    87: 'up', 
    68: 'right', 
    83: 'down',
  },
}; 
 
let player2 = {
  x: $(window).width() - 30,
  y: $(window).height() - 30,
  direction: null,
  name: 'Kamen',
  color: 'blue',
  score: 0,
  
  keys: { // Arrows
    37: 'left', 
    38: 'up', 
    39: 'right', 
    40: 'down',
  },
};

let player3 = {
  x: $(window).width() - 30,
  y: 10,
  direction: null,
  name: 'Peter',
  color: 'green',
  score: 0,
  
  keys: { // IJKL
    74: 'left', 
    73: 'up', 
    76: 'right', 
    75: 'down',
  }, 
};

let players = [player1, player2, player3];
let winner = null;

function initPlayer(player) {
  player.el = $('<div/>').appendTo($('body')).css({
    position: 'absolute',
    top: player.y,
    left: player.x,
    width: 15,
    height: 15,
    "margin-left": -7,
    "margin-top": -7,
    "background-color": player.color,
  });
  
  $('body').append(`<span>${player.name}: <span id="${player.name}">0</span></span>`).append('<br/>');
}

function initApple(apple) {
  apple.el = $('<div/>').appendTo($('body')).css({
    position: 'absolute',
    top: apple.y,
    left: apple.x,
    width: 10,
    height: 10,
    "margin-left": -5,
    "margin-top": -5,
    "background-color": apple.color,
    "border-radius": 5,
  });
}

let apples = [];
for (let i = 0; i < APPLES; i++) {
  let apple = {
    x: 50 + Math.random()*($(window).width() - 120),
    y: 50 + Math.random()*($(window).height() - 120),
    color: 'red',
    eatenBy: null,
  }
  initApple(apple);
  apples.push(apple);
}

for (let player of players) {
  initPlayer(player);
}
 
$(document).keydown(function(e) {
  for (let player of players) {
    if (player.keys[e.which]) {
      player.direction = player.keys[e.which];
    }
  }w
});

function playerEats(player, apple) {
  return !apple.eatenBy &&
    Math.abs(player.x - apple.x) < 10 &&
    Math.abs(player.y - apple.y) < 10;
}

setInterval(function() {
  // update the positions of all players
  for (let p of players) {
    if (p.direction === null) {
      continue;
    } else if (p.direction === 'right') {
      p.x += 3;
    } else if (p.direction === 'left') {
      p.x -= 3;
    } else if (p.direction === 'up') {
      p.y -= 3;
    } else if (p.direction === 'down') {
      p.y += 3;
    }
    p.x = Math.min(p.x, $(window).width() - 30);
    p.x = Math.max(p.x, 0)
    p.y = Math.max(p.y, 0)
    p.y = Math.min(p.y, $(window).height() - 30);
    p.el.css({
      left: p.x, 
      top: p.y
    });
    
    // check if player eats any new apples
    for (let apple of apples) {
      if (playerEats(p, apple)) {
        apple.eatenBy = p;
        p.score += 1;
        $(`#${p.name}`).text(p.score);
        apple.el.remove();
      }
    }
  }

  // check if we should announce the winner
  let allEaten = apples.every(a => a.eatenBy);
  if (allEaten && !winner) {
    winner = players.reduce(function(a, b) {
      return a.score > b.score ? a : b
    });
    $(`#${winner.name}`).text(winner.score + ' Winner!!!');
  }
}, 20);
