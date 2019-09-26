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
            <v-card-title>
              <p>{{ item.Title }}</p>
            </v-card-title>
            <v-card-text>
              <p>Year: {{ item.Year }}</p>
              <p>Type: {{ item.Type }}</p>
              <p>IMDB-id: {{ item.imdbID }}</p>
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
  props: {
    name: String // 親コンポーネントからの値
  },
  data() {
    return {
      targetUrl: "http://www.omdbapi.com/?apikey=87929455&Content-Type=application/json&s={}".replace(
        "{}",
        this.name
      ),
      loading: true,
      movieResponse: []
    };
  },
  mounted() {
    if (this.name !== undefined) {
      axios
        .get(this.targetUrl)
        .then(response => {
          this.movieResponse = response.data.Search;
          this.loading = false;
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  methods: {
    singleMovie(id) {
      this.$router.push("/movie/" + id);
    }
  }
};
</script>