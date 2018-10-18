<template>
  <div class="container">
    <p class="float nav"
      v-show="showCtrls">
      {{ campus }} {{ building }} {{ floor }} {{ room }}
    </p>
    <p class="float ctrls"
      v-show="showCtrls"
      v-if="orientation >= 0">
      {{ orientation }}
    </p>
    <floor-map class="map"
      v-if="buildingData.blocks"
      :data="buildingData"
      :transform="orientation"
    />
  </div>
</template>

<script>
import baseModel from '../models/model.js';
import Map from '../components/Map'

export default {
  name: 'Floor',
  components: {
    'floor-map': Map
  },
  data () {
    return {
      campus: this.$route.query.campus || 0,
      building: this.$route.query.building || 0,
      floor: this.$route.query.floor || 0,
      room: this.$route.query.room || -1,
      buildingData: {},
      orientation: 0,
      showCtrls: true
    };
  },
  methods: {
    getMapData () {
      baseModel
        .get(null, {
          campus: this.campus,
          building: this.building,
          floor: this.floor
        })
        .then(data => {
          console.log(data);
          this.buildingData = data;
        });
    },
    getOrientation () {
      if (window.DeviceOrientationEvent) {
        window.addEventListener('deviceorientation', (event) => {
          if (Math.abs(event.alpha - this.orientation) < 2) return
          this.orientation = Math.floor(event.alpha)
        })
      }
    }
  },
  mounted () {
    this.getMapData()
    this.getOrientation()
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
html, body {
  height: 100%;
  width: 100%;
}

.float {
  z-index: 1;
}
.container {
  height: 100%;
}
.nav {
  position: absolute;
}
.ctrls {
  position: absolute;
}
.map {
  position: absolute;
  box-sizing: border-box;
  z-index: 0;
  width: 100%;
  height: 100%;
}
</style>
