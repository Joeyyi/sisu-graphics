<template>
  <div class="container">
    <transition name="fade">
      <div class="float">
        <p class="nav"
          v-show="showCtrls">
          {{ campus }} {{ building }} {{ floor }} {{ room }}
        </p>
        <div class="orientation"
          v-show="showCtrls"
          @click="switchRotation">
          <img src="../assets/images/compass.png" :style="{transform: `rotate(${rotation - 45}deg)`}">
          <p>跟随方向:{{ enableRotation ? 'ON' : 'OFF' }}</p>
        </div>
      </div>
    </transition>
    <floor-map class="map"
      v-if="buildingData.blocks"
      :data="buildingData"
      :rotate="rotation"
      @svg-tapped="showCtrls = !showCtrls"
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
      enableRotation: true,
      shouldUpdateRotation: true,
      rotation: 0,
      showCtrls: true
    };
  },
  watch: {
    $route: {
      handler: function (val) {
        this.onRoute(val)
      },
      deep: true
    }
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
          console.log('floor data:', data)
          this.buildingData = data
        });
    },
    getOrientation () {
      if (window.DeviceOrientationEvent) {
        window.addEventListener('deviceorientation', this.updateRotation)
      } else {
        alert('不支持罗盘')
      }
    },
    updateRotation (event) {
      let alpha = 0
      if (event.webkitCompassHeading) {
        alpha = event.webkitCompassHeading
      } else if (event.absolute) {
        alpha = event.alpha
      }
      if (Math.abs(alpha - this.rotation) < 2) return
      if (!this.shouldUpdateRotation) return
      this.rotation = Math.floor(360 - alpha)
    },
    switchRotation () {
      if (this.enableRotation) {
        window.removeEventListener('deviceorientation', this.updateRotation)
        this.enableRotation = false
        this.rotation = 0
      } else {
        this.enableRotation = true
        this.getOrientation()
      }
    },
    getMotion () {
      if (window.DeviceMotionEvent) {
        window.addEventListener('devicemotion', this.watchMotion)
      }
    },
    watchMotion (event) {
      this.shouldUpdateRotation = !event.acceleration.x > 0.01
    },
    onRoute (val) {
      if (val.query.campus !== this.campus) {
        console.log('campus changed')
        this.campus = val.query.campus
        this.getMapData()
      } else if (val.query.building !== this.building) {
        console.log('building changed')
        this.building = val.query.building
        this.getMapData()
      } else if (val.query.floor !== this.floor) {
        console.log('floor changed')
        this.floor = val.query.floor
        this.getMapData()
      } else if (val.query.index !== this.room) {
        console.log('index changed', val.query.index)
      }
    }
  },
  mounted () {
    this.getMapData()
    this.getOrientation()
    this.getMotion()
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
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
.map {
  position: absolute;
  box-sizing: border-box;
  z-index: 0;
  width: 100%;
  height: 100%;
}

.orientation {
  position: absolute;
  bottom: 2rem;
  left: 2rem;
  background-color: #fff;
  box-shadow: 0 0 0.05em #000;
  padding: .4rem;
  border-radius: .4rem;
  -webkit-appearance: none;
  -webkit-box-shadow: 0 0 .3rem #ccc;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.orientation img {
  width: 2rem;
  height: 2rem;
}
p {
  margin: 0;
  z-index: 2;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .3s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
