<template>
  <div class="home">
    <GameSelector />
  </div>
</template>

<script>
import GameSelector from '@/components/GameSelector.vue';

export default {
  name: 'Home',
  components: { GameSelector }
};
</script>
