<template>
  <div
    style="display: flex; align-items: center; justify-content: center; width: 100%; height: 100vh;"
  >
    <table
      style="margin: auto; table-layout: fixed; width: 100%; height: 100vh;"
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
    </table>
  </div>
</template>

<script>
import labyrinthApi from '../api/labyrinthApi';
import firebaseApi from '../api/firebaseApi';

var app = {
  name: 'Maze',
  props: {
    level: String
  },
  data: () => ({
    gameId: null,
    playerId: 'xehos',
    maze: { data: [] },
    posx: 0,
    posy: 0,
    players: []
  }),
  async mounted() {
    this.maze = await labyrinthApi.getMaze(this.level);

    window.addEventListener('keydown', e => {
      if ([37, 38, 39, 40].indexOf(e.keyCode) !== -1) e.preventDefault();
      this.handleKey(e.code, false);
    });

    this.gameId = await firebaseApi.createGame(this.playerId);
    await firebaseApi.watchGame(this.gameId, state => {
      const players = state.toJSON();
      let values = [];

      for (let player in players) {
        if (player == this.playerId) continue;

        values.push({ id: player, ...players[player] });
      }

      this.players = values;
    });
  },
  watch: {
    async posx(x) {
      await firebaseApi.setPosition(this.gameId, this.playerId, x, this.posy);
    },
    async posy(y) {
      await firebaseApi.setPosition(this.gameId, this.playerId, this.posx, y);
    }
  },
  methods: {
    handleKey(e) {
      switch (e) {
        case 'ArrowUp':
        case 'KeyW':
        case 'KeyK':
          if (this.maze.data[this.posy][this.posx].top) this.posy--;
          break;
        case 'ArrowLeft':
        case 'KeyA':
        case 'KeyH':
          if (this.maze.data[this.posy][this.posx].left) this.posx--;
          break;
        case 'ArrowDown':
        case 'KeyJ':
          if (this.maze.data[this.posy][this.posx].bottom) this.posy++;
          break;
        case 'ArrowRight':
        case 'KeyD':
        case 'KeyL':
          if (this.maze.data[this.posy][this.posx].right) this.posx++;
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
