<template>
  <div class="container" v-if="fetchOK" >
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
    <v-touch @panmove="onSlide" @panend="onSlideEnd">
      <div ref="card">
        <building-detail
          :name="buildings[selectedBuilding].name"
          :description="buildings[selectedBuilding].description"
          :tags="buildings[selectedBuilding].tags"
          :direct="goToFloor"
        />
      </div>
    </v-touch>
  </div>
  <div class="loading" v-else>
    <p>loading...</p>
    <p>loading...</p>
    <p>loading...</p>
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
      fetchOK: false
    }
  },
  computed: {
    campuses () {
      return this.mapData.map((campus) => campus.name + '校区');
    },
    buildings () {
      if (this.mapData.length === 0) return null
      return this.mapData[this.selectedCampus].buildings.map((building) => {
        return {
          name: building.name,
          tags: building.tags,
          description: building.description
        }
      })
    }
  },
  methods: {
    getMapData () {
      baseModel.get().then((data) => {
        setTimeout(() => {
          this.mapData = data;
          this.fetchOK = true;
        }, 500)
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

</style>
