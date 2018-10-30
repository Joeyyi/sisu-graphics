<template>
  <div>
    <div class="container" @click="collapse =!collapse" v-if="collapse">
      <div>{{campusName}} - {{buildingName}} </div>
    </div>
    <div class="container" v-else>
      <ul class="campus">
        <li v-for="(campus, i) in mapNav"
          :class="{'selected': i == tempCampus }"
          @click="selectCampus(i)"
          :key="campus.name">
          {{campus.name}}
        </li>
      </ul>
      <ul class="building">
        <li v-for="(building, i) in mapNav[tempCampus].buildings"
          @click="selectBuilding(i)"
          :key="building.name">
          {{building.name}}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>

export default {
  props: ['mapNav', 'campus', 'building', 'mode'],
  data () {
    return {
      collapse: true,
      tempCampus: this.campus,
      tempBuilding: this.building
    }
  },
  computed: {
    campusName () {
      return this.mapNav ? this.mapNav[this.tempCampus].name : '请选择'
    },
    buildingName () {
      return this.mapNav ? this.mapNav[this.tempCampus].buildings[this.tempBuilding].name : '请选择'
    }
  },
  watch: {
    mode (newVal) {
      if (!newVal && !this.collapse) {
        this.collapse = true
        this.tempCampus = this.campus
        this.tempBuilding = this.building
      }
    }
  },
  methods: {
    selectCampus (i) {
      if (this.tempCampus !== i) this.tempCampus = i
    },
    selectBuilding (i) {
      if (this.tempBuilding !== i) this.tempBuilding = i
      if (this.tempCampus !== this.campus || this.tempBuilding !== this.building) this.$emit('change-nav', [this.tempCampus, this.tempBuilding])
      this.collapse = !this.collapse
    }
  }
}
</script>

<style scoped lang="scss">
@import '../assets/styles/_config';

.container {
  @extend .map-nav;
  width: 8rem;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  padding: .5rem;
}
li {
  padding: .2rem;
}
.campus {
  flex: none;
}
.building {
  background-color: lightgrey;
  border-radius: 0 .3rem .3rem .3rem;
}
.selected {
  background-color: lightgrey;
  border-radius: .3rem 0 0 .3rem;
}

</style>
