import axios from 'axios'

export default {
  // axiosを用いてAPIからnameを含む映画のjsonデータを返す
  fetchMovieCollection (name) {
    return axios.get('&s=' + name).then(response => {
      return response.data
    })
  },

  // axiosを用いてAPIから一つの映画のjsonデータを返す
  fetchSingleMovie (id) {
    return axios.get('&i=' + id).then(response => {
      return response.data
    })
  }
}