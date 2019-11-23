<template>
  <div class="root">
    <div class="top-flex">
      <button
        style="position: absolute; top: 20px; right: 20px;"
        @click="logout"
      >
        logout
      </button>
    </div>

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
                : '',
            paddingRight:
              cell.right == 1
                ? row.indexOf(cell) == row.length - 1
                  ? '4px'
                  : '2px'
                : '',
            borderLeft:
              cell.left == 0
                ? row.indexOf(cell) == 0
                  ? '4px solid black'
                  : '2px solid black'
                : '',
            paddingLeft: cell.left == 1 ? '2px' : '',
            borderTop:
              cell.top == 0
                ? maze.data.indexOf(row) == 0
                  ? '4px solid black'
                  : '2px solid black'
                : '',
            paddingTop: cell.top == 1 ? '2px' : '',
            borderBottom:
              cell.bottom == 0
                ? maze.data.indexOf(row) == maze.data.length - 1
                  ? '4px solid black'
                  : '2px solid black'
                : '',
            paddingBottom: cell.bottom == 1 ? '2px' : ''
          }"
        >
          <span v-for="(player, p) in players" :key="p">
            <span
              v-if="
                player.position &&
                  player.position.x == j &&
                  player.position.y == i
              "
              class="dot"
              :style="{ backgroundColor: player.color }"
            ></span>
          </span>
        </div>
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
    players: [],
    godmode: false
  }),
  async mounted() {
    this.gameId = this.$route.params.gameId;

    var user = await labyrinthApi.fetchCurrentUser();
    this.playerId = user.data.id;

    await firebaseApi.joinGame(this.gameId, this.playerId);
    var level = await firebaseApi.getGameLevel(this.gameId);
    this.maze = await labyrinthApi.getMaze(level);

    window.addEventListener('keydown', e => {
      if ([37, 38, 39, 40].indexOf(e.keyCode) !== -1) e.preventDefault();
      this.handleKey(e.code, false);
    });

    const gameState = await firebaseApi.getState(this.gameId);
    this.onStateUpdate(gameState.players || []);

    await firebaseApi.watchGame(this.gameId, state =>
      this.onStateUpdate(state.toJSON())
    );

    window.addEventListener('beforeunload', this.leaveRoom);
    window.addEventListener('popstate', this.leaveRoom);
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
    onStateUpdate(players) {
      console.log(players);
      if (players === true) {
        alert('Game over');
        return;
      }
      let values = [];

      for (let player in players) {
        values.push({ id: player, ...players[player] });
      }

      this.players = values;
    },
    async leaveRoom() {
      await firebaseApi.leaveGame(this.gameId, this.playerId);
    },
    async logout() {
      await firebaseApi.leaveGame(this.gameId, this.playerId);
      this.$router.push('/');
    },
    handleKey(e) {
      switch (e) {
        case 'KeyG':
          this.godmode = !this.godmode;
          break;
        case 'ArrowUp':
        case 'KeyW':
        case 'KeyK':
          if (this.godmode || this.maze.data[this.posy][this.posx].top)
            this.posy--;
          break;
        case 'ArrowLeft':
        case 'KeyA':
        case 'KeyH':
          if (this.godmode || this.maze.data[this.posy][this.posx].left)
            this.posx--;
          break;
        case 'ArrowDown':
        case 'KeyS':
        case 'KeyJ':
          if (this.godmode || this.maze.data[this.posy][this.posx].bottom)
            this.posy++;
          break;
        case 'ArrowRight':
        case 'KeyD':
        case 'KeyL':
          if (this.godmode || this.maze.data[this.posy][this.posx].right)
            this.posx++;
          break;
      }
      if (this.win()) this.game_win();
    },
    win() {
      return (
        this.posy == this.maze.data.length - 1 &&
        this.posx == this.maze.data[0].length
      );
    },
    game_win() {
      firebaseApi.endGame(this.gameId);
    }
  }
};
export default app;
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.root {
  width: 100%;
  height: 100%;
}
.top-flex {
  display: flex;
  height: 10vmin;
  width: 97vw;
}
.flex-container {
  display: flex;
  width: 85vmin;
  height: 85vmin;
  flex-direction: column;
  justify-content: bottom;
  align-content: center;
  margin: auto;
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
.dot {
  height: 10px;
  width: 10px;
  border-radius: 50%;
  display: inline-block;
}
</style>
