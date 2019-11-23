<template>
  <div syle="width:100%;">
    <table style="border: 1px solid black; margin: auto;">
      <thead>
        <tr v-for="(row, headerKey) in maze.data" :key="headerKey">
          <td
            width="10"
            height="10"
            v-for="(cell, headerKey2) in row"
            :key="headerKey2"
            :style="{
              borderRight: cell.right == 0 ? '1px solid black' : '',
              borderLeft: cell.left == 0 ? '1px solid black' : '',
              borderTop: cell.top == 0 ? '1px solid black' : '',
              borderBottom: cell.bottom == 0 ? '1px solid black' : ''
            }"
          >
            {{ '\xa0' }}
          </td>
        </tr>
      </thead>
    </table>
  </div>
</template>

<script>
import labyrinthApi from '../api/labyrinthApi';

export default {
  name: 'Maze',
  props: {
    level: String
  },
  data: () => ({
    maze: null
  }),
  async mounted() {
    this.maze = await labyrinthApi.getMaze('advanced');
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
