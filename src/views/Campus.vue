<template>
  <div class="container" v-if="fetchOK" >
    <campus-picker
    :campuses="campuses"
    :selectedCampus="selectedCampus"
    event="onChooseCampus"
    @onChooseCampus="setCampus"/>
    <building-picker
    :buildings="buildings"
    :selectedBuilding="selectedBuilding"
    event="onChooseBuilding"
    @onChooseBuilding="setBuilding" />
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
export default {
  name: 'Campus',
  components: {
    'campus-picker': campusPicker,
    'building-picker': buildingPicker
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
