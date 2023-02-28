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
import Geocoder from 'ol-geocoder';

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

      // 콤마로 구분된 문자열을 콤마로 split 하고, 작은 범위부터 시작되는 결과 값을 한국 주소에 맞춰 reverse 시킨다. 
      this.$root.$refs.sideBar.address = addressInfo.data.display_name.split(", ").reverse().join(" ");
    })

    const geocoder = new Geocoder('nominatim', {
        provider: 'osm',
        lang: 'kr',
        placeholder:'주소 검색',
        limit: 5, // 자동 완성 결과 최대 개수
        autoComplete: true,
        keepOpen: true
    });

    this.olMap.addControl(geocoder);

    geocoder.on('addresschosen', (evt) => {
      this.setUiAddress(evt.address.details.name);
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
    },
    setUiAddress(str){
      this.$root.$refs.sideBar.address = str.split(', ').reverse().join(' ');
    },
  }
}

</script>

<style lang="scss" scoped>
.main-map{
  width: 100%;
  height: 100%;

  ::v-deep.ol-geocoder {
    position: absolute;
    right: 0;
    padding: 10px;

    button {
      display: none;
    }

    input::placeholder {
      color: white;
      opacity: 0.7;
    }

    input, ul {
      border-style: none;
      width: 200px;
      background-color: rgba(0,0,0,0.5);
      border-radius: 5px;
      border-color: unset;
      padding: 0 5px;
      color: white;
    }
  }
}
</style>
