<template>
  <v-container>
    <!-- apiのデータを取得中の場合はprogress-circularを表示する -->
    <div class="text-center" v-if="loading">
      <v-progress-circular indeterminate size="150" width="8" color="green"></v-progress-circular>
    </div>
    <div v-else>
      <v-row>
        <v-col sm="6" md="4" lg="3" v-for="(item, index) in wholeResponse" :key="index">
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
              <movie :id="item.imdbID"></movie>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>
import movieApi from "@/services/MovieApi";
import Movie from "@/components/Movie";

export default {
  data() {
    return {
      wholeResponse: [],
      loading: true
    };
  },
  components: {
    Movie
  },
  mounted() {
    movieApi
      .fetchMovieCollection("Avengers")
      .then(response => {
        this.wholeResponse = response.Search; // dataのSearch内にある(オブジェクトを内包した)リストを取得
        this.loading = false;
      })
      .catch(error => {
        console.log(error);
      });
  }
};
</script>