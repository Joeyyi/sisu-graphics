<template>
  <div class="wrapper" :style="{transform: `translate(${translateX}px,${translateY}px) rotate(${angle}deg) scale(${scale})`}">
    <v-touch @panmove="onMove" @tap="onTap" @rotate="onRotate" @pinch="onPinch" class="container">
        <svg></svg>
    </v-touch>
  </div>
  <!-- <div class="container">
    <v-touch @panmove="onMove" @click="onTap" tag="svg" :style="{transform: trans}"></v-touch>
  </div> -->
</template>

<script>
import * as d3 from 'd3';
export default {
  name: 'Map',
  props: ['data', 'rotate'],
  data () {
    return {
      COLOR_MAP: {
        1: '#ffee93',
        2: '#c8e9a0',
        3: '#c7f2e7',
        4: '#ffc09f',
        5: '#e2dbbe'
      },
      angle: 0,
      scale: 1,
      translateX: 0,
      translateY: 0
    }
  },
  watch: {
    rotate: function (newVal, oldVal) {
      this.angle = 0
      d3.select('svg').transition()
        .style('transform', `rotate(${newVal}deg)`)
      d3.selectAll('text').transition()
        .attr('x', (d, i) => d.x + d.w / 2 + d.d * Math.sin((newVal) * Math.PI / 180))
        .attr('y', (d, i) => d.y + d.h / 2 + d.d * Math.cos((newVal) * Math.PI / 180))
        .attr('transform', (d, i) => `rotate(${-newVal},${d.x + d.w / 2},${d.y + d.h / 2})`)
    },
    data: function (newVal, oldVal) {
      console.log('prop updated', newVal)
      this.renderMap()
    }
  },
  methods: {
    onPress (data) {
      this.$emit(this.event, data);
    },
    calcSize () {
      let x = this.data.blocks.reduce((prev, cur) => {
        if (typeof prev === 'object') prev = prev.data.x + prev.data.width
        return Math.max(prev, cur.data.x + cur.data.width)
      })
      let y = this.data.blocks.reduce((prev, cur) => {
        if (typeof prev === 'object') prev = prev.data.y + prev.data.height
        return Math.max(prev, cur.data.y + cur.data.height)
      })
      return [x, y]
    },
    onMove (e) {
      // console.log(e)
      this.translateX = Math.floor(e.deltaX)
      this.translateY = Math.floor(e.deltaY)
      // this.update()
      // d3.select('svg').transition()
      //   .attr('transform', `translate(${e.deltaX},${e.deltaY})`)
    },
    onRotate (e) {
      // console.log(e)
      this.angle = Math.floor(e.rotation)
      // this.update()
      // d3.select('svg').transition()
      //   .style('transform', `rotate(${e.angle}deg)`)
    },
    onPinch (e) {
      // console.log(e)
      this.scale = e.scale
      // this.update()
      // d3.select('svg').transition()
      //   .style('transform', `scale(${e.scale})`)
    },
    onTap (e) {
      this.$emit('svg-tapped')
    },
    update () {
      d3.select('svg').transition()
        .style('transform', `scale(${this.scale}) rotate(${this.angle})`)
    },
    renderMap () {
      const mapSize = this.calcSize()
      const dataset = this.data.blocks
      d3.select('svg').selectAll('*').remove()
      const map = d3.select('svg')
        .attr('class', 'map')
        .attr('preserveAspectRatio', 'xMidYMid meet')
        .attr('viewBox', `0 0 ${mapSize[0]} ${mapSize[1]}`)
      const blocks = map.append('g')
        .selectAll('g')
        .data(dataset)
        .enter()
        .append('g')
        .on('click', function () {
          let curColor = d3.select(this).select('rect').attr('stroke')
          d3.select(this).select('rect')
            // .transition()
            // .duration(300)
            .attr('stroke', curColor === '#fff' ? '#ff534d' : '#fff')
        })

      blocks.append('rect')
        .attr('x', (d, i) => d.data.x + 2)
        .attr('y', (d, i) => d.data.y + 2)
        .attr('width', (d, i) => d.data.width - 4)
        .attr('height', (d, i) => d.data.height - 4)
        .attr('fill', (d, i) => this.COLOR_MAP[d.type])
        .attr('stroke', '#fff')
        .attr('stroke-width', 4)
        .attr('stroke-linejoin', 'bevel')

      blocks.selectAll('text')
        .data((d) => {
          if (d.name.length || d.numbers.length === 1) {
            return ([{
              name: d.name || d.numbers[0],
              x: d.data.x,
              y: d.data.y,
              w: d.data.width,
              h: d.data.height,
              d: 0
            }])
          } else {
            return d.numbers.map((item, index) => {
              return ({
                name: item,
                x: d.data.x,
                y: d.data.y,
                w: d.data.width,
                h: d.data.height,
                d: index === 0 ? 18 : -18
              })
            })
          }
        })
        .enter()
        .append('text')
        .text((d) => d.name)
        .attr('x', (d, i) => d.x + d.w / 2 + d.d * Math.sin(0))
        .attr('y', (d, i) => d.y + d.h / 2 + d.d * Math.cos(0))
        .attr('fill', '#595959')
        .attr('font-size', '2rem')
        .attr('font-family', '"Consolas","Courier New",Monaco,sans-serif')
        .attr('text-anchor', 'middle')
        .attr('dominant-baseline', 'middle')
        .attr('font-weight', 'bold')

      // const text = blocks.selectAll('text')
      //   .data((d) => d)
      //   .enter()
      //   .append('text')
      //   .text((d, i) => {
      //     if (d.type === 1) return d.numbers[0]
      //     if (d.type === 2) return '🚶'
      //     if (d.type === 3) return '🚰'
      //     if (d.type === 4) return '🚻'
      //     if (d.type === 5) return '☕'
      //   })
      //   .attr('x', (d, i) => d.data.x + d.data.width / 2)
      //   .attr('y', (d, i) => d.data.y + d.data.height / 2)
      //   .attr('font-size', '2rem')
      //   .attr('font-family', '"Consolas","Courier New",Monaco,sans-serif')
      //   .attr('text-anchor', 'middle')
      //   .attr('dominant-baseline', 'middle')
    }
  },
  mounted () {
    this.renderMap()
  }
}
</script>

<style scoped lang="scss">
@import '../assets/styles/_config';

// div * {
//   box-sizing: border-box;
//   margin: 0;
// }

// .container {
//   display: flex;
//   flex-direction: column;
//   justify-content: space-between;
//   align-items: center;
//   border: .04rem solid darkgrey;
//   border-radius: .3rem;
//   padding: .5rem;
//   overflow: auto;
// }
.container {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
}

svg {
  touch-action: auto;
}

</style>
