<template>
  <div>
    <v-container>
      <h1 class="grey--text ma-3">Result</h1>
      <search-movie :name="this.keyName"></search-movie>
    </v-container>
  </div>
</template>

<script>
import SearchMovie from "@/components/SearchMovie";

export default {
  props: ["keyName"], // パスパラメータの値
  components: {
    SearchMovie
  }
};
</script>
