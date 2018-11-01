<template>
  <div class="container">
    <div class="content">
      <h1 class="title">{{ name }}</h1>
      <div class="container-tags">
        <p class="tags-header">Tags:</p>
        <ul class="tags">
          <li v-for="(tag, index) in tags" :key="index">
            <p class="tag">{{ tag }}</p>
          </li>
        </ul>
      </div>
      <p class="description">{{ description }}</p>
    </div>
    <div class="btn" @click="direct">楼层地图</div>
  </div>
</template>

<script>
export default {
  name: 'BuildingDetail',
  props: ['name', 'tags', 'description', 'direct'],
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
  height: 15rem;
  // border: .04rem solid darkgrey;
  border-radius: .3rem;
  padding: .5rem;
}
.content {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
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
    background-color: #ccc;
    margin-right: .3rem;
    border-radius: .3rem;
    padding: .2rem .3rem;
    overflow: hidden;
  }
}
.tag {
  color:#333;
  margin: 0;
  font-size: .8rem;
}
.btn {
  // @extend .map-nav;
  padding: .5rem;
  background-color: $color-primary;
  color: #fff;
  border-radius: .4rem;
  -webkit-appearance: none;
}
</style>
