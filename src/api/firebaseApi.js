import * as firebase from 'firebase/app';
import 'firebase/database';
import randomColor from 'randomcolor';

const app = firebase.initializeApp({
  databaseURL: 'https://hackathon-aeglo-19.firebaseio.com'
});
const db = firebase.database(app);

const createGame = async (gameId, playerId) => {
  await db.ref('game/' + gameId).set({
    players: {
      [playerId]: {
        color: randomColor(),
        position: {
          x: 0,
          y: 0
        }
      }
    }
  });
};

// const joinGame = async (gameId, playerId) => {
//   const game = await getState(gameId);

//   if (game.players.length >= 4) {
//     alert("this room is already full")
//   }
// }

const getGames = async () => {
  let games = await db.ref('game').once('value');
  games = games.toJSON();
  games = Object.keys(games).map(k => ({
    id: k,
    ...games[k]
  }));
  games = games.filter(g => Object.keys(g.players).length < 4);
  return games.map(g => g.id);
};

const watchGame = (gameId, callback) => {
  return db.ref('game/' + gameId).on('child_changed', callback);
};

const setPosition = (gameId, playerId, x, y) => {
  const key = `players/${playerId}/position`;
  db.ref('game/' + gameId).update({
    [key]: { x, y }
  });
};

export default { createGame, watchGame, setPosition, getGames };
