<template>
  <div class="container">
    <div class="content">
      <h1 class="title">{{ name }}</h1>
      <p class="description">{{ description }}</p>
      <div class="container-tags">
        <p class="tags-header">Tags:</p>
        <ul class="tags">
          <li v-for="(tag, index) in tags" :key="index">
            <p class="tag">{{ tag }}</p>
          </li>
        </ul>
      </div>
    </div>
    <button class="btn">室内地图</button>
  </div>
</template>

<script>
export default {
  name: 'BuildingDetail',
  props: ['name', 'tags', 'description'],
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
  margin: 0;
}
.title {
  text-align: center;
  font-weight: bold;
  font-size: 1.2rem;
  margin: .1rem 0;
}
.container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 30rem;
  border: .04rem solid darkgrey;
  border-radius: .3rem;
  padding: .5rem;
}
.container-tags {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin: .5rem 0;
}
.tags-header {
  color: #333;
  margin-right: .3rem;
}
.tags {
  li {
    display: inline-block;
    background-color: $color-primary;
    margin-right: .3rem;
    border-radius: .3rem;
    padding: .1rem .3rem;
    overflow: hidden;
  }
}
.tag {
  color:$color-secondary;
  margin: 0;
  font-size: .8rem;
}
</style>
