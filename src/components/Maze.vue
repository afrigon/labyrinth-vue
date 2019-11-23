<template>
  <div class="maze">{{ maze }}</div>
</template>

<script>
import labyrinthApi from '../api/labyrinthApi';
console.log('ello');
export default {
  name: 'Maze',
  props: {
    level: String
  },
  data: () => ({
    maze: null
  }),
  async mounted() {
    this.maze = await labyrinthApi.getMaze('beginner');
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
