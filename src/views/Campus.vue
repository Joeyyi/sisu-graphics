<template>
  <div class="container">
    <campus-picker :campuses="campuses" :selectedCampus="selectedCampus" event="onChooseCampus"  @onChooseCampus="setCampus" />
    <building-picker :buildings="buildings" :selectedBuilding="selectedBuilding" event="onChooseBuilding" @onChooseBuilding="setBuilding" />
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
      selectedBuilding: 0
    }
  },
  computed: {
    campuses () {
      return this.mapData.map((campus) => campus.name + '校区');
    },
    buildings () {
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
        this.mapData = data;
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
  margin-top: 1rem;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
