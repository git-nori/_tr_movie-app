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
              <v-btn text color="success" @click>View</v-btn>
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
  data() {
    return {
      targetUrl:
        "http://www.omdbapi.com/?s=mummy&apikey=87929455&page=1&type=movie&Content-Type=application/json", // apiのURL
      wholeResponse: [],
      loading: true
    };
  },
  mounted() {
    axios
      .get(this.targetUrl)
      .then(response => {
        this.wholeResponse = response.data.Search; // dataのSearch内にある(オブジェクトを内包した)リストを取得
        this.loading = false;
      })
      .catch(error => {
        console.log(error);
      });
  }
};
</script>