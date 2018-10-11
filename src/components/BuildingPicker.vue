<template>
  <div>
    <ul>
      <li class="item"
        v-for="(building, index) in buildings"
        :key="index"
        :class="{ selected
        : selectedBuilding == index }"
        @click="onPress(index)">
        <div class="text">{{ building.name }}</div>
      </li>
    </ul>
    <building-detail
      :name="buildings[selectedBuilding].name"
      :description="buildings[selectedBuilding].description"
      :tags="buildings[selectedBuilding].tags"
    />
  </div>
</template>

<script>
import BuildingDetail from './BuildingDetail'
export default {
  name: 'BuildingPicker',
  props: ['buildings', 'selectedBuilding', 'event'],
  components: {
    'building-detail': BuildingDetail
  },
  methods: {
    onPress (data) {
      this.$emit(this.event, data);
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
  overflow: scroll;
}
.item {
  flex: none;
  margin-left: .5rem;
  width: 5rem;
  height: 5rem;
  border: .04rem solid $color-primary;
  border-radius: .3rem;
  padding: 0;
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
  color: $color-primary;
}
.selected {
  background-color:  $color-primary-light;
  div {
    color: $color-secondary;
  }
}
a {
  color: #42b983;
}
</style>
