<template>
  <div>
    <v-container>
      <h1 class="grey--text ma-3">Home</h1>
      <latest-movie></latest-movie>
    </v-container>
  </div>
</template>

<script>
import LatestMovie from "@/components/LatestMovie";

export default {
  components: {
    LatestMovie
  }
};
</script>
