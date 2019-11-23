<template>
  <div class="home">
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
