<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <Maze level="beginner" />
  </div>
</template>

<script>
import Maze from '@/components/Maze.vue';

export default {
  name: 'Home',
  components: { Maze }
};
</script>
