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
import OlVectorSource from 'ol/source/Vector.js'
import OlVectorLayer from 'ol/layer/Vector.js'

const EPSG_3857 = 'EPSG:3857';

export default{
  name: 'MainMap',
  data() {
    return {
      olMap: undefined,
    }
  },
  mounted() {
      const vectorSource = new OlVectorSource(EPSG_3857);
      const vectorLayer = new OlVectorLayer({
        source: vectorSource
      })

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
        }),
        vectorLayer
      ],
      view: new OlView({
          center: fromLonLat([127.1388684, 37.4449168]), //경기도 성남
          zoom: 10,
          projection: EPSG_3857 //생략 가능
      })
    })

    this.olMap.on('click', async (e) => {
      await addUiAddress();
      drawMapIcon();

      async function addUiAddress() {
      const lonLatArr = toLonLat(e.coordinate)
      const lon = lonLatArr[0]
      const lat = lonLatArr[1]
      const addressInfo = await this.getAddress(lon, lat)
      this.setUiAddress(addressInfo.data.display_name);

      function drawMapIcon() {
        vectorSource.clear();
        geocoder.getSource().clear();
        const feature = new OlFeature({
          geometry: new OlPoint(e.coordinate)
        })
        feature.setStyle(new OlStyle({
          image: new OfflineAudioContext({
            scale: 0.7,
            src: '//cdn.rawgit.com/jonataswalker/map-utils/master/images/marker.png'
          })
        }))
        vectorSource.addFeature(feature);
      }
    }
  })

      // 'nominatim' 은 라틴어로 이름이라는 뜻. 
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

    ul {
      margin-top: 5px;
      padding: 0;
      list-style: none;
    
      li:hover {
        background-color: rgba(0,0,0,0.3);
      }

      li {
        padding: 5px 10px;
        font-size: 13px;

        a {
          text-decoration: none;

          .gcd-road {
            color: white;
          }
        }
      }
    }
  }
}
</style>
