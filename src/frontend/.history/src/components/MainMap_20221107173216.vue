<template>
  <div class="main-map" ref="map">
  </div>
</template>

<script>
import OlLayerTile from 'ol/layer/Tile.js';
import OlView from 'ol/View.js';
import OlMap from 'ol/Map.js';
import OSM from 'ol/source/OSM';
import {fromLonLat, toLonLat} from 'ol/proj.js';
import {defaults} from 'ol/control.js';
import axios from 'axios';

export default{
  name: 'MainMap',
  data() {
    return {
      olMap: undefined,
    }
  },
  mounted() {
    this.olMap = new OlMap({
      target: this.$refs.map,
      controls: defaults({
        attribution: false,
        zoom: false,
        rotate: false,
      }),
      layers: [
        new OlLayerTile({
          source: new OSM()
        })
      ],
      view: new OlView({
          center: fromLonLat([127.1388684, 37.4449168]), //경기도 성남
          zoom: 10
      })
    })

    this.olMap.on('click', async (e) => {
      console.log(toLonLat(e.coordinate));
      const lonLatArr = toLonLat(e.coordinate)
      const lon = lonLatArr[0]
      const lat = lonLatArr[1]
      const addressInfo = await this.getAddress(lon, lat)
      this.$root.$refs.sideBar.address = addressInfo.data.display_name.split(", ").reverse().join(" ");
    })
  },
  methods: {
    getAddress ( lon, lat) {
      return axios.get(
        'https://nominatim.openstreetmap.org/reverse',
        {
          params: {
            format: 'json',
            lon: lon,
            lat: lat
          }
        })
    }
  }
}

</script>

<style scoped>
.main-map{
  width: 100%;
  height: 100%;
}
</style>
