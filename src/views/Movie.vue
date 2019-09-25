<template>
  <div>
    <v-container>
      <h1 class="grey--text my-3">Movie</h1>
      <v-dialog v-model="dialog">
        <template v-slot:activator="{on}">
          <v-btn text v-on="on" color="info">test</v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">Ratings</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col>
                  <span class="title">Source</span>
                  <v-divider></v-divider>
                </v-col>
                <v-col>
                  <span class="title">Ratings</span>
                  <v-divider></v-divider>
                </v-col>
              </v-row>
              <v-row v-for="(rating, index) in this.ratings" :key="index">
                <v-col>{{ rating.Source }}</v-col>
                <v-col>{{ rating.Value }}</v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions class="justify-end">
            <v-btn text color="success" @click="dialog=false">OK</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: ["id"], // パスパラメータの値
  data() {
    return {
      singleMovie: "",
      ratings: [],
      dialog: false
    };
  },
  mounted() {
    let targetUrl = "http://www.omdbapi.com/?apikey=87929455&i={}&Content-Type=application/json".replace(
      "{}",
      this.id
    ); // apiのURL

    axios.get(targetUrl).then(response => {
      this.singleMovie = response.data;
      this.ratings = this.singleMovie.Ratings;
    });
  }
};
</script>