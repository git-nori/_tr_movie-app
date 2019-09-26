<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title class="grey--text">Movie Searcher</v-toolbar-title>
      <div class="flex-grow-1"></div>

      <v-toolbar-items>
        <v-row sm="6" md="3" class="mt-3 justify-end">
          <v-form v-model="valid" class="mx-3">
            <v-text-field
              label="movieName"
              required
              :rules="searchWordRules"
              prepend-icon="mdi-movie"
              v-model="searchWord"
            >test</v-text-field>
          </v-form>
          <v-btn class="mx-3" :disabled="!dataAvailable" @click="searchMovie">
            <v-icon left>mdi-magnify</v-icon>
            <span>SEARCH</span>
          </v-btn>
        </v-row>
      </v-toolbar-items>
    </v-app-bar>
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      searchWord: "",
      valid: false,
      searchWordRules: [v => !!v || "inputWord is required"]
    };
  },
  methods: {
    searchMovie() {
      this.$router.push("/search/" + this.searchWord);
      this.searchWord = "";
    }
  },
  computed: {
    dataAvailable() {
      return this.searchWord !== null && this.searchWord !== "";
    }
  }
};
</script>
