<template>
  <div class="flex-container">
    <div class="row" v-for="(row, i) in maze.data" :key="i">
      <div
        class="cell"
        v-for="(cell, j) in row"
        :key="j"
        :style="{
          borderRight:
            cell.right == 0
              ? row.indexOf(cell) == row.length - 1
                ? '4px solid black'
                : '2px solid black'
              : '2px solid white',
          borderLeft:
            cell.left == 0
              ? row.indexOf(cell) == 0
                ? '4px solid black'
                : '2px solid black'
              : '2px solid white',
          borderTop:
            cell.top == 0
              ? maze.data.indexOf(row) == 0
                ? '4px solid black'
                : '2px solid black'
              : '2px solid white',
          borderBottom:
            cell.bottom == 0
              ? maze.data.indexOf(row) == maze.data.length - 1
                ? '4px solid black'
                : '2px solid black'
              : '2px solid white'
        }"
      >
        {{ j == posx && i == posy ? '1' : '\xa0' }}
        {{
          players[0] && j == players[0].position.x && i == players[0].position.y
            ? '2'
            : '\xa0'
        }}
        {{
          players[1] && j == players[1].position.x && i == players[1].position.y
            ? '3'
            : '\xa0'
        }}
        {{
          players[2] && j == players[2].position.x && i == players[2].position.y
            ? '4'
            : '\xa0'
        }}
      </div>
    </div>
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
    gameId: -1,
    playerId: 'anonymous',
    maze: { data: [] },
    posx: 0,
    posy: 0,
    players: []
  }),
  async mounted() {
    this.gameId = this.$route.params.gameId;
    console.log(this.gameId);

    var user = await labyrinthApi.fetchCurrentUser();
    this.playerId = user.data.id;
<<<<<<< HEAD
    this.level = this.level || 'advanced';
    this.maze = await labyrinthApi.getMaze(this.level);
=======

    await firebaseApi.joinGame(this.gameId, this.playerId);
    var level = await firebaseApi.getGameLevel(this.gameId);
    this.maze = await labyrinthApi.getMaze(level);
>>>>>>> d547a77514be37a36d084af6139fc03f618b082b

    window.addEventListener('keydown', e => {
      if ([37, 38, 39, 40].indexOf(e.keyCode) !== -1) e.preventDefault();
      this.handleKey(e.code, false);
    });

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
  align-content: center;
  box-sizing: border-box;
}
.cell {
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
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
