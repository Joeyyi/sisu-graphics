<template>
  <div>
    <canvas id="bg" />
    <div class="container">
      <img src="../assets/images/icon.png" />
      <div class="title-ch">
        <h1>上外校园地图</h1>
      </div>
      <!--<svg>
        <text class="title en" x="0" y="0">SISU</text>
        <text class="title en" x="0" y="0">GRAPHICS</text>
      </svg>-->
      <div class="search-container">
        <img src="../assets/images/search.png" />
        <input placeholder="搜索教室/编号..."/>
      </div>
      <div class="view-campus" @click="viewCampus">查看地图</div>
    </div>
  </div>
</template>

<script>

import generate from '../assets/scripts/bg-generator.js';
export default {
  name: 'Index',
  data () {
    return {
      msg: 'Welcome to homeeeeee'
    }
  },
  methods: {
    viewCampus () {
      this.$router.push({
        path: '/campus'
      })
    }
  },
  mounted () {
    generate.generate();
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h1, h2 {
  font-weight: normal;
  font-size: 2rem;
  font-weight: 900;
  -webkit-text-stroke: .1rem #fff;
}
#bg {
  position: absolute;
  z-index: 0;
  width: 100%;
  height: 100%;
}
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 1;
  position: absolute;
  height: 100%;
  width: 100%;
  text-align: center;
  img {
    width: 80%;
  }
  svg {
    width: 50%;
    border: 1px solid blue;
  }
  .title {
    font-size: 5rem;
    font-family: sans-serif;
    fill: red;
    stroke-width: .1rem;
    stroke: #0f9;
    text-anchor: middle;
    dominant-baseline: middle
  }
}
.search-container {
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  border: .08rem solid #666;
  border-radius: .9rem;
  background-color: rgba(255,255,255,0.7);
  padding: .2rem .5rem .2rem .1rem;
  width: 50%;
  img {
    width: 1.3rem;
    height: 1.3rem;
  }
  input {
    font-size: 1rem;
    outline: none;
    border-width: 0;
    background-color: transparent;
    padding: 0 .2rem;
  }
}
.view-campus {
  box-sizing: border-box;
  margin: .3rem 0;
  width: 50%;
  background-color: rgba(0,0,0,0.7);
  color: #fff;
  border-radius: .9rem;
  border-width: 0;
  font-size: 1rem;
  padding: .2rem 0;
}

</style>
