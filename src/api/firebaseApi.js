import * as firebase from 'firebase/app';
import 'firebase/database';
import randomColor from 'randomcolor';

const app = firebase.initializeApp({
  databaseURL: 'https://hackathon-aeglo-19.firebaseio.com'
});
const db = firebase.database(app);

const createGame = async (level, gameId, playerId) => {
  await db.ref('game/' + gameId).set({
    level: level,
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

const joinGame = async (gameId, playerId) => {
  const snapshot = await db.ref('game/' + gameId).once('value');
  const players = snapshot.toJSON().players;

  if (Object.keys(players).length >= 4) {
    alert('This room is full');
    return;
  }

  db.ref(`game/${gameId}/players/${playerId}`).set({
    color: randomColor(),
    position: {
      x: 0,
      y: 0
    }
  });
};

const getGameLevel = async gameId => {
  console.log(gameId);
  return 'advanced';
};

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

export default {
  createGame,
  watchGame,
  setPosition,
  getGames,
  joinGame,
  getGameLevel
};
