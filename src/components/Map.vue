<template>
  <div class="container">
      <!-- <v-touch @panmove="onMove" @click="onTap" tag="svg" ref="s" :style="{transform: trans}"></v-touch> -->
    <svg ref="svg" @click="onRotate"></svg>
  </div>
</template>

<script>
import * as d3 from 'd3';
export default {
  name: 'Map',
  props: ['data', 'transform'],
  data () {
    return {
      COLOR_MAP: {
        1: '#ffee93',
        2: '#c8e9a0',
        3: '#c7f2e7',
        4: '#ffc09f',
        5: '#e2dbbe'
      },
      trans: 0
    }
  },
  watch: {
    transform: function (oldVal, newVal) {

      this.trans = `rotate(${newVal}deg)`;
      d3.select('svg').transition()
        .style('transform', `rotate(${newVal - 90}deg)`)
      d3.selectAll('text').transition()
        // .attr('x', (d, i) => d.x + d.w / 2 + 15 * Math.sin(newVal - 90))
        // .attr('y', (d, i) => d.y + d.h / 2 + 15 * Math.cos(newVal - 90))
        .attr('transform', (d, i) => `rotate(${90 - newVal},${d.x + d.w / 2},${d.y + d.h / 2})`)
        // .attr('x', (d,i) => d)
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
      d3.select('svg').transition()
        .attr('transform', `translate(${e.deltaX},${e.deltaY})`)
    },
    onRotate (d) {
      d3.select('svg').transition()
        .style('transform', `rotate(${this.transform}deg)`)
      console.log(this.trans)
    },
    onTap (e) {
      // this.$refs.s.tranform = this.trans
      // d3.select('svg').transition()
      //   .attr('transform', `translate(${e.center.x},${e.center.y})`)
      // d3.select('svg').transition()
      //   .style('transform', `translate(${e.screenX}px,${e.screenY}px)`)
      console.log(e)
    }
  },
  mounted () {
    const mapSize = this.calcSize()
    const dataset = this.data.blocks
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
            h: d.data.height
          }])
        } else {
          return d.numbers.map((item, index) => {
            return ({
              name: item,
              x: d.data.x,
              y: d.data.y,
              w: d.data.width,
              h: index === 0 ? d.data.height - 30 : d.data.height + 30
            })
          })
        }
      })
      .enter()
      .append('text')
      .text((d) => d.name)
      .attr('x', (d, i) => d.x + d.w / 2)
      .attr('y', (d, i) => d.y + d.h / 2)
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
}

</style>
