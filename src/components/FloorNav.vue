<template>
  <div>
    <div class="container" @click="show =!show">
      <ul>
        <li v-for="i in total"
            :key="i"
            :class="{'selected': i - 1 == selected}"
            @click="changeFloor(i)">
          <p>{{i}}F</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>

export default {
  props: ['selected', 'total'],
  data () {
    return {
      show: true
    }
  },
  methods: {
    changeFloor (i) {
      if (i - 1 !== this.selected) {
        this.$emit('changeFloor', i - 1)
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import '../assets/styles/_config';

.container {
  @extend .map-nav;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  width: 2rem;
  z-index: 1;
  overflow: hidden;
}
.selected {
  background-color: lightgrey;
}
li {
  text-align: center;
  flex: 1;
}
p {
  margin: 0;
  padding: .4rem 0;
}
</style>
