<template>
  <div class="container">
    <h1>Créer une partie</h1>
    <input
      class="create-input"
      v-model="gameId"
      placeholder="Nom de la partie..."
    />
    <button class="create-button" @click="createGame('beginner')">
      Beginner
    </button>
    <button class="create-button" @click="createGame('advanced')">
      Advanced
    </button>

    <h1>Rejoindre une partie:</h1>
    <p v-if="!loaded">Chargement...</p>
    <p v-if="loaded && games.length == 0">Aucune partie en cours</p>
    <ul v-if="games.length > 0">
      <li v-for="(gameId, i) in games" :key="i">
        <router-link :to="{ path: '/maze/' + gameId }">{{
          gameId
        }}</router-link>
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
    async createGame(level) {
      var user = await labyrinthApi.fetchCurrentUser();
      if (this.gameId === '') return;
      if (this.games.indexOf(this.gameId) !== -1) {
        alert('La partie existe déjà!');
        return;
      }
      await firebaseApi.createGame(level, this.gameId, user.data.id);
      this.$router.push({ path: `/maze/${this.gameId}` });
    }
  }
};
</script>

<style scoped>
li {
  list-style: none;
}

.container {
  text-align: left;
  padding: 20px;
}

.create-button {
  margin-left: 10px;
}

.create-input {
  margin-left: 30px;
}
</style>
