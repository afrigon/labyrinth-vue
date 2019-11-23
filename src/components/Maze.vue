<template>
  <div syle="width:100%;">
    <table style="margin: auto;" cellspacing="0">
      <thead>
        <tr v-for="(row, i) in maze.data" :key="i">
          <td
            width="10"
            height="10"
            v-for="(cell, j) in row"
            :key="j"
            :style="{
              borderRight: cell.right == 0 ? '1px solid black' : '',
              borderLeft: cell.left == 0 ? '1px solid black' : '',
              borderTop: cell.top == 0 ? '1px solid black' : '',
              borderBottom: cell.bottom == 0 ? '1px solid black' : ''
            }"
          >
            {{ j == posx && i == posy ? 'X' : '\xa0' }}
          </td>
        </tr>
      </thead>
    </table>
  </div>
</template>

<script>
import labyrinthApi from '../api/labyrinthApi';

var app = {
  name: 'Maze',
  props: {
    level: String
  },
  data: () => ({
    posx: 0,
    posy: 0,
    maze: { data: [] }
  }),
  async mounted() {
    this.maze = await labyrinthApi.getMaze('advanced');

    window.addEventListener('keydown', e => {
      this.handleKey(e.code);
    });
  },
  methods: {
    handleKey(e) {
      console.log(this);
      switch (e) {
        case 'ArrowUp':
          if (this.maze.data[this.posy][this.posx].top) this.posy--;
          break;
        case 'ArrowDown':
          if (this.maze.data[this.posy][this.posx].bottom) this.posy++;
          break;
        case 'ArrowRight':
          if (this.maze.data[this.posy][this.posx].right) this.posx++;
          break;
        case 'ArrowLeft':
          if (this.maze.data[this.posy][this.posx].left) this.posx--;
          break;
      }
    }
  }
};
export default app;
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
