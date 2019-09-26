<template>
  <v-container>
    <div class="text-center" v-if="loading">
      <v-progress-circular indeterminate size="150" width="8" color="green"></v-progress-circular>
    </div>

    <div v-else>
      <v-row>
        <v-col sm="6" md="4" lg="3" v-for="(item, index) in movieResponse" :key="index">
          <v-card>
            <v-img :src="item.Poster" height="200"></v-img>
            <v-card-title>{{ item.Title }}</v-card-title>
            <v-card-text>
              <div>Year: {{ item.Year }}</div>
              <div>Type: {{ item.Type }}</div>
              <div>imdbID: {{ item.imdbID }}</div>
            </v-card-text>
            <v-card-actions class="justify-end">
              <v-btn text color="success" @click="singleMovie(item.imdbID)">View Detail</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  props: ["name"], // パスパラメータの値
  data() {
    return {
      loading: false,
      movieResponse: []
    };
  },
  mounted() {
    let targetUrl = "http://www.omdbapi.com/?apikey=87929455&Content-Type=application/json&s={}".replace(
      "{}",
      this.name
    );
    axios
      .get(targetUrl)
      .then(response => {
        this.movieResponse = response.data.Search;
        console.log(this.movieResponse);
      })
      .catch(error => {
        console.log(error);
      });
  },
  methods: {
    singleMovie(id) {
      this.$router.push("/movie/" + id);
    }
  }
};
</script>