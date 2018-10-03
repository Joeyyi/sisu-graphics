<template>
  <div>
    <ul>
      <li v-for="(building, index) in buildings" :key="index" @click="onPress(index)">{{ building.name }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'BuildingPicker',
  props: ['buildings', 'selectedBuilding', 'event'],
  methods: {
    onPress (data) {
      this.$emit(this.event, data);
    }
  }
}
</script>

<style scoped lang="scss">
h1, h2 {
  font-weight: normal;
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
