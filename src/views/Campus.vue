<template>
  <div>
    <div class="container" v-if="fetchStatus === 1" >
      <campus-picker
        :campuses="campuses"
        :selectedCampus="selectedCampus"
        event="onChooseCampus"
        @onChooseCampus="setCampus"
      />
      <building-picker
        :buildings="buildings"
        :selectedBuilding="selectedBuilding"
        event="onChooseBuilding"
        @onChooseBuilding="setBuilding"
      />
      <div>
        <building-detail
          :name="buildings[selectedBuilding].name"
          :description="buildings[selectedBuilding].description"
          :tags="buildings[selectedBuilding].tags"
          :direct="goToFloor"
        />
      </div>
    </div>
    <div class="loading" v-if="fetchStatus === 0">
      <p>Loading...</p>
    </div>
    <div class="error" v-if="fetchStatus === 4">
      <p>加载错误，请重试</p>
    </div>
  </div>
</template>

<script>
import baseModel from '../models/model.js';
import campusPicker from '../components/CampusPicker'
import buildingPicker from '../components/BuildingPicker'
import buildingDetail from '../components/BuildingDetail'

export default {
  name: 'Campus',
  components: {
    'campus-picker': campusPicker,
    'building-picker': buildingPicker,
    'building-detail': buildingDetail
  },
  data () {
    return {
      msg: 'campussssssss',
      mapData: [],
      selectedCampus: 0,
      selectedBuilding: 0,
      fetchStatus: 0
    }
  },
  computed: {
    campuses () {
      if (this.mapData.length === 0) return null
      return this.mapData.map((campus) => {
        return {
          name: campus.name + '校区',
          address: campus.address,
          description: campus.description
        }
      })
    },
    buildings () {
      if (this.mapData.length === 0) return null
      return this.mapData[this.selectedCampus].buildings
      // return this.mapData[this.selectedCampus].buildings.map((building) => {
      //   return {
      //     name: building.name,
      //     tags: building.tags,
      //     description: building.description
      //   }
      // })
    }
  },
  methods: {
    getMapData () {
      baseModel.get('/campus').then((res) => {
        this.fetchStatus = res.data.responseStatus;
        this.mapData = res.data.data;
        console.log('this.mapdata', this.mapData, this.fetchStatus)
      })
    },
    setCampus (index) {
      this.selectedCampus = index;
    },
    setBuilding (index) {
      this.selectedBuilding = index;
    },
    onSlide (e) {
      this.$refs.card.style['transform'] = `translateX(${e.deltaX}px)`
      this.$refs.card.style['transition'] = 'all 0'
    },
    onSlideEnd (e) {
      if (this.$refs.card.style['transform'].replace(/[^0-9]/ig, '') > 100) {
        // 临界位移？
        if (e.direction === 2 && this.selectedBuilding !== this.buildings.length - 1) {
          this.selectedBuilding++;
        }
        if (e.direction === 4 && this.selectedBuilding !== 0) {
          this.selectedBuilding--;
        }
      }
      this.$refs.card.style['transform'] = 'translateX(0)'
      this.$refs.card.style['transition'] = 'all 1s'
    },
    goToFloor () {
      this.$router.push({
        path: `/floor?campus=${this.selectedCampus}&building=${this.selectedBuilding}&floor=0`
      })
    }
  },
  mounted () {
    this.getMapData();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
  padding: 1rem 1rem 0;
}

.loading, .error {
  color: #666;
  text-align: center;
  margin-top: 20rem;
}

</style>
