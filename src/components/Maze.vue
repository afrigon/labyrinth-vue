<template>
  <div class="flex-container">
    <!-- <table
      style="margin: auto; table-layout: fixed; width: 100%; height: 100%;"
      cellspacing="0"
    >
      <thead>
        <tr v-for="(row, i) in maze.data" :key="i">
          <td
            width="10"
            height="10"
            v-for="(cell, j) in row"
            :key="j"
            :style="{
              borderRight:
                cell.right == 0
                  ? row.indexOf(cell) == row.length - 1
                    ? '2px solid black'
                    : '1px solid black'
                  : '',
              borderLeft:
                cell.left == 0
                  ? row.indexOf(cell) == 0
                    ? '2px solid black'
                    : '1px solid black'
                  : '',
              borderTop:
                cell.top == 0
                  ? maze.data.indexOf(row) == 0
                    ? '2px solid black'
                    : '1px solid black'
                  : '',
              borderBottom:
                cell.bottom == 0
                  ? maze.data.indexOf(row) == maze.data.length - 1
                    ? '2px solid black'
                    : '1px solid black'
                  : ''
            }"
          >
            {{ j == posx && i == posy ? 'X' : '\xa0' }}
          </td>
        </tr>
      </thead>
    </table> -->
    <div class="row" v-for="(row, i) in maze.data" :key="i">
      <div
        class="cell"
        v-for="(cell, j) in row"
        :key="j"
        :style="{
          borderRight:
            cell.right == 0
              ? row.indexOf(cell) == row.length - 1
                ? '2px solid black'
                : '2px solid black'
              : '2px solid white',
          borderLeft:
            cell.left == 0
              ? row.indexOf(cell) == 0
                ? '2px solid black'
                : '2px solid black'
              : '2px solid white',
          borderTop:
            cell.top == 0
              ? maze.data.indexOf(row) == 0
                ? '2px solid black'
                : '2px solid black'
              : '2px solid white',
          borderBottom:
            cell.bottom == 0
              ? maze.data.indexOf(row) == maze.data.length - 1
                ? '2px solid black'
                : '2px solid black'
              : '2px solid white'
        }"
      >
        {{ j == posx && i == posy ? 'X' : '\xa0' }}
      </div>
    </div>
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
    this.maze = await labyrinthApi.getMaze(this.level);

    window.addEventListener('keydown', e => {
      console.log(e.keyCode);
      if ([37, 38, 39, 40].indexOf(e.keyCode) !== -1) e.preventDefault();
      this.handleKey(e.code, false);
    });
  },
  methods: {
    handleKey(e) {
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
.flex-container {
  display: flex;
  width: 100%;
  height: 97vh;
  flex-direction: column;
  justify-content: center;
  align-content: center;
}
.row {
  display: flex;
  flex-direction: row;
  height: 100%;
}
.cell {
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
}
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
