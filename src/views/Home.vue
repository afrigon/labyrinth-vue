<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png" /> -->
    <Maze level="advanced" />
  </div>
</template>

<script>
import Maze from '@/components/Maze.vue';

export default {
  name: 'Home',
  components: { Maze }
};
</script>
