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
    over: false,
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
  db.ref(`game/${gameId}/players/${playerId}`).set({
    color: randomColor(),
    position: {
      x: 0,
      y: 0
    }
  });
};

const leaveGame = async (gameId, playerId) => {
  await db.ref(`game/${gameId}/players/${playerId}`).remove();
};

const getGameLevel = async gameId => {
  const level = await db.ref(`game/${gameId}/level`).once('value');
  return level.toJSON();
};

const getGames = async () => {
  let games = await db.ref('game').once('value');
  games = games.toJSON();

  if (!games || !Object.keys(games).length) return [];

  games = Object.keys(games).map(k => ({
    id: k,
    ...games[k]
  }));

  games = games.filter(g => !g.over && Object.keys(g.players || {}).length < 4);

  return games.map(g => g.id);
};

const watchGame = async (gameId, callback) => {
  await db.ref('game/' + gameId).on('child_changed', callback);
};

const getState = async gameId => {
  return await db.ref(`game/${gameId}/players`).once('value');
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
  getGameLevel,
  getState,
  leaveGame
};
