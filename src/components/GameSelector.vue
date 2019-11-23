<template>
  <div class="container">
    <h1>Créer une partie</h1>
    <input
      class="create-input"
      v-model="gameId"
      placeholder="Nom de la partie..."
    />
    <button class="create-button" @click="this.createGame">Créer</button>

    <h1>Rejoindre une partie:</h1>
    <p v-if="games.length == 0">Aucune partie en cours</p>
    <ul v-if="games.length > 0">
      <li v-for="(gameId, i) in games" :key="i">
        {{ gameId }}
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
    gameId: '',
    games: ['abc', 'def', 'ghi']
  }),
  async mounted() {},
  methods: {
    async createGame() {
      var user = await labyrinthApi.fetchCurrentUser();
      console.log(this.gameId);
      if (this.gameId === '') return;
      await firebaseApi.createGame(this.gameId, user.data.id);
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
