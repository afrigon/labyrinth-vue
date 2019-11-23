<template>
  <div class="maze">{{ maze }}</div>
</template>

<script>
import firebaseApi from '../api/firebaseApi';

const onStateUpdate = console.log;

export default {
  name: 'Maze',
  props: {
    level: String
  },
  data: () => ({
    gameId: null,
    maze: null
  }),
  async mounted() {
    const id = 'xehos';
    this.gameId = await firebaseApi.createGame(id);
    await firebaseApi.setPosition(this.gameId, id, 10, 20);

    await firebaseApi.watchGame(this.gameId, onStateUpdate);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
