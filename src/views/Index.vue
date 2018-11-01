<template>
  <div>
    <canvas id="bg" />
    <div class="container"  v-if="!searchMode">
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
        <input @click="toggleSearch" placeholder="搜索教室/编号..." readonly />
      </div>
      <div class="view-campus" @click="viewCampus">查看地图</div>
    </div>
    <div v-else class="search-view">
      <div class="search-bar">
        <div class="search-container">
          <img src="../assets/images/search.png" />
          <input v-model="keyword" placeholder="搜索教室/编号..." autofocus="autofocus"/>
        </div>
        <div class="search-cancel" @click="toggleSearch">取消</div>
      </div>
      <ul class="search-list">
        <li v-for="item in searchResults" :key="item.name" @click="gotoMap(item.index)">{{item.name}}</li>
      </ul>
    </div>
  </div>
</template>

<script>

import background from '../assets/scripts/bg-generator.js'
import baseModel from '../models/model.js'

export default {
  name: 'Index',
  data () {
    return {
      searchMode: false,
      keyword: '',
      searchResults: [],
      now: ''
    }
  },
  watch: {
    keyword (newVal) {
      let now = Date.now()
      if (now - this.now < 800) {
        this.now = now
        return
      }
      this.now = now

      baseModel.get('/search', {kw: newVal})
        .then((res) => {
          this.searchResults = res.data.slice(0, 13)
        })
    }
  },
  methods: {
    viewCampus () {
      this.$router.push({
        path: '/campus'
      })
    },
    toggleSearch () {
      this.searchMode = !this.searchMode
    },
    gotoMap (index) {
      this.$router.push({
        path: '/floor',
        query: {
          campus: index[0],
          building: index[1],
          floor: index[2],
          room: index[3]
        }
      })
    }
  },
  mounted () {
    background.generate();
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
    width: 15rem;
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
  max-width: 500px;
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
  max-width: 500px;
  background-color: rgba(0,0,0,0.7);
  color: #fff;
  border-radius: .9rem;
  border-width: 0;
  font-size: 1rem;
  padding: .2rem 0;
}
.search-view {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 1;
  position: absolute;
  width: 100%;
}
.search-bar {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 50%;
  min-width: 300px;
  max-width: 500px;
  padding: 1rem 0;
  .search-container {
    flex: 1 1 auto;
  }
  .search-cancel {
    flex: 0 1 40px;
    padding: 0 .5rem;
    margin: 0 0 0 .5rem;
    background-color: rgba(255,255,255,0.7);
    border-radius: .2rem;
    overflow: hidden;
    text-align: center;
    color: #666;
  }
}
.search-list {
  width: 50%;
  min-width: 300px;
  max-width: 500px;
  background-color: rgba(255,255,255,0.7);
  border-radius: .5rem;
  overflow: hidden;
  color: #666;
  li {
    padding: .5rem .2rem .2rem .2rem;
    border-bottom: .01rem solid #ccc;
    &:last-of-type {
      padding-bottom: .5rem;
      border: none;
    }
  }
}
</style>
