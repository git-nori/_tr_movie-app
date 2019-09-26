<template>
  <v-container>
    <div class="text-center" v-if="loading">
      <v-progress-circular indeterminate size="150" width="8" color="green"></v-progress-circular>
    </div>
    <div v-else-if="isNoData">
      <div class="text-center">
        <h2>No Movie in API with</h2>
      </div>
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
  props: {
    name: String // 親コンポーネントからの値
  },
  data() {
    return {
      loading: true,
      isNoData: false,
      movieResponse: []
    };
  },
  components: {
    Movie
  },
  mounted() {
    this.fetchResult(this.name);
  },
  methods: {
    fetchResult(value) {
      if (value !== undefined) {
        movieApi
          .fetchMovieCollection(value)
          .then(response => {
            // APIのデータが返ってきているか判定
            if (response.Response === "True") {
              this.movieResponse = response.Search;
              this.isNoData = false;
            } else {
              this.isNoData = true;
            }
            this.loading = false;
          })
          .catch(error => {
            console.log(error);
          });
      }
    }
  },
  // 【問題】(ライフサイクルフックの)mountedはコンポーネントがマウントされた際に1回のみ実行されるため、既にSearchMovieがマウントされている状態でnameの値を変更しても呼び出されない
  // 【改善】watchプロパティを使用し、nameが変更されるたびにaxiosを用いたメソッドを呼び出すようにする
  watch: {
    name(value) {
      this.loading = true;
      this.fetchResult(value);
    }
  }
};
</script>