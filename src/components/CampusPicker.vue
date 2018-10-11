<template>
  <div>
    <ul class="container">
      <li v-for="(name, index) in campuses" :key="index" :class="{ selected: selectedCampus == index }" @click="onPress(index)">{{ name }}</li>
    </ul>
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

</style>
