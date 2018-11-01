<template>
  <div>
    <ul>
      <li class="item"
        v-for="(building, index) in buildings"
        :key="index"
        :class="{ selected: selectedBuilding == index }"
        @click="onPress(index)">
        <div class="text">{{ building.name }}</div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'BuildingPicker',
  props: ['buildings', 'selectedBuilding', 'event'],
  methods: {
    onPress (data) {
      this.$emit(this.event, data)
    }
  }
}
</script>

<style scoped lang="scss">
@import '../assets/styles/_config';

div * {
  box-sizing: border-box;
}

div {
  overflow: auto;
}

ul {
  padding: 1rem 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  overflow: auto;
}
.item {
  @extend .map-nav;
  flex: none;
  margin-left: .5rem;
  width: 4rem;
  height: 4rem;
  // border: .04rem solid $color-primary;
  border-radius: .3rem;
  padding: .5rem;;
  background-color: $color-secondary;
  &:nth-child(1) {
    margin-left: 0;
  }
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.text {
  color: #333;
}
.selected {
  width: 5rem;
  height: 5rem;
  background-color:  $color-primary;
  padding: .5rem;
  div {
    color: $color-secondary;
  }
}
a {
  color: #42b983;
}
</style>
