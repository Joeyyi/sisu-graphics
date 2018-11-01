<template>
  <div>
    <ul class="container">
      <li v-for="(campus, index) in campuses" :key="index" :class="{ selected: selectedCampus == index }" @click="onPress(index)">{{ campus.name }}</li>
    </ul>
    <div class="description">
      <p class="address">地址：{{ campuses[selectedCampus].address }}</p>
      <p>{{ campuses[selectedCampus].description }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CampusPicker',
  data () {
    return {
      options: 'Welcome to Your Vue.js App'
    }
  },
  props: ['campuses', 'selectedCampus', 'event'],
  methods: {
    onPress (data) {
      this.$emit(this.event, data);
    }
  }
}
</script>

<style scoped lang="scss">
@import '../assets/styles/_config';

.container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
ul {
  border: 1px solid $color-primary;
  overflow: hidden;
  border-radius: 1rem;
  width: 50%;
  margin: 0 auto;
}
li {
  flex:1;
  color: $color-primary;
  background-color: $color-secondary;
  padding: 0 10px;
  &.selected {
    background-color: $color-primary;
    color: $color-secondary;
  }
}
.address {
  text-align: center;
}
.description {
  margin-top: .5rem;
  p {
    margin: .2rem 0;
  }
}
</style>
