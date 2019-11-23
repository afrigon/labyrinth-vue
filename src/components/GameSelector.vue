<template>
  <div>
    <h1>Créer une partie</h1>
    <input v-model="gameId" placeholder="Nom de la partie..." />
    <button @click="this.createGame">Créer</button>

    <h1>Rejoindre une partie:</h1>
    <p v-if="!loaded">Chargement...</p>
    <p v-if="loaded && games.length == 0">Aucune partie en cours</p>
    <ul v-if="games.length > 0">
      <li v-for="(gameId, i) in games" :key="i">
        <router-link to="/maze/gameId">{{ gameId }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import labyrinthApi from '../api/labyrinthApi';
import firebaseApi from '../api/firebaseApi';

export default {
  name: 'GameSelector',
  data: () => ({
    loaded: false,
    gameId: '',
    games: []
  }),
  async mounted() {
    this.games = await firebaseApi.getGames();
    this.loaded = true;
  },
  methods: {
    async createGame() {
      var user = await labyrinthApi.fetchCurrentUser();
      if (this.gameId === '') return;
      await firebaseApi.createGame(this.gameId, user.data.id);
    }
  }
};
</script>
