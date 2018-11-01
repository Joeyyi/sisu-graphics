<template>
  <div class="container">
    <transition name="fade">
      <div class="float" v-show="showCtrls">
        <div class="orientation"
          @click="switchRotation">
          <img src="../assets/images/compass.png" :style="{transform: `rotate(${rotation - 45}deg)`}">
          <p>跟随方向:{{ enableRotation ? 'ON' : 'OFF' }}</p>
        </div>
        <map-nav
          class="map-nav"
          :mapNav="nav"
          :campus="campus"
          :building="building"
          @change-nav="changeNav"
          :mode="showCtrls" />
        <floor-nav
          class="floor-nav"
          :selected="floor"
          :total="nav[campus].buildings[building].num"
          @changeFloor="changeFloor" />
      </div>
    </transition>
    <floor-map class="map"
      v-if="fetchStatus === 1"
      :data="buildingData"
      :rotate="rotation"
      @svg-tapped="showCtrls = !showCtrls"
    />
    <div class="msg-container">
      <p class="message" v-if="fetchStatus === 0">Loading...</p>
      <p class="message" v-if="fetchStatus === 3 || fetchStatus === 4">加载错误，请重新选择</p>
    </div>
  </div>
</template>

<script>
import {mapNav} from '../global.js';
import baseModel from '../models/model.js';
import Map from '../components/Map'
import MapNav from '../components/MapNav'
import FloorNav from '../components/FloorNav'

export default {
  name: 'Floor',
  components: {
    'floor-map': Map,
    'floor-nav': FloorNav,
    'map-nav': MapNav
  },
  data () {
    return {
      campus: this.$route.query.campus || 0,
      building: this.$route.query.building || 0,
      floor: this.$route.query.floor || 0,
      room: this.$route.query.room || -1,
      buildingData: {},
      enableRotation: false,
      shouldUpdateRotation: true,
      rotation: 0,
      showCtrls: true,
      fetchStatus: 0,
      nav: mapNav
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
      baseModel.get('/view', {
        campus: this.campus,
        building: this.building,
        floor: this.floor
      }).then((res) => {
        if (res.data.responseStatus === 2) {
          this.$router.push(res.data.redirect)
        } else if (res.data.responseStatus === 1) {
          this.fetchStatus = res.data.responseStatus
          this.buildingData = res.data.data
        } else {
          this.fetchStatus = res.data.responseStatus
          console.log('error: responseStatus', this.fetchStatus)
        }
      })
    },
    getOrientation () {
      if (window.DeviceOrientationEvent) {
        window.addEventListener('deviceorientation', this.updateRotation)
      } else {
        alert('您的设备不支持罗盘')
      }
    },
    updateRotation (event) {
      if (!this.enableRotation) return
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
      this.shouldUpdateRotation = !(event.acceleration.x > 0.01)
    },
    onRoute (val) {
      if (val.query.campus !== this.campus) {
        // console.log('campus changed')
        this.campus = val.query.campus
        this.getMapData()
      } else if (val.query.building !== this.building) {
        // console.log('building changed')
        this.building = val.query.building
        this.getMapData()
      } else if (val.query.floor !== this.floor) {
        // console.log('floor changed')
        this.floor = val.query.floor
        this.getMapData()
      } else if (val.query.index !== this.room) {
        // console.log('index changed', val.query.index)
      }
    },
    changeFloor (i) {
      this.floor = i
      this.fetchStatus = 0
      this.getMapData()
    },
    changeNav (i) {
      this.campus = i[0]
      this.building = i[1]
      this.floor = 0
      this.fetchStatus = 0
      this.getMapData()
    }
  },
  mounted () {
    this.getMapData()
    this.getOrientation()
    this.getMotion()
  },
  beforeDestroy () {
    window.removeEventListener('deviceorientation', this.updateRotation)
    window.removeEventListener('devicemotion', this.watchMotion)
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
  z-index: -1;
  width: 100%;
  height: 100%;
}

.orientation {
  position: absolute;
  bottom: 1rem;
  left: 1rem;
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
.map-nav {
  position: absolute;
  left: 1rem;
  top: 1rem;
  width: 6rem;
}
.floor-nav {
  position: absolute;
  right: 1rem;
  top: 1rem;
  width: 2rem;
}
.orientation img {
  width: 2rem;
  height: 2rem;
}
p {
  margin: 0;
  z-index: 2;
}
.msg-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  position: fixed;
  z-index: -2;
}
.message {
  color: grey;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .3s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
