<template>
  <div class="drug-protein-container">
    <svg :width="width" :height="height">
      <defs>
        <linearGradient id="brilliance_gradient" x1="50%" x2="50%" y1="0%" y2="100%">
          <stop offset="0" style="stop-color:#FFFFFF;stop-opacity:1;"></stop>
          <stop offset="0.1" style="stop-color:#FFFFFF;stop-opacity:0.99;"></stop>
          <stop offset="1" style="stop-color:#FFFFFF;stop-opacity:0;"></stop>
        </linearGradient>
      </defs>
      <defs >
        <filter id="filter_shadow">
          <feGaussianBlur stdDeviation="1"></feGaussianBlur>
        </filter>
      </defs>
      <defs >
        <linearGradient id="bubble_gradient1" x1="50%" x2="50%" y1="100%" y2="0%">
          <stop offset="0.2472" style="stop-color:#FAFAFA;"></stop>
          <stop offset="0.4517" style="stop-color:#A2A2A2;"></stop>
          <stop offset="0.6785" style="stop-color:#5E5E5E;"></stop>
          <stop offset="0.8975" style="stop-color:#3C3C3C;"></stop>
          <stop offset="1" style="stop-color:#383838;"></stop>
        </linearGradient>
        <radialGradient cx="50%" cy="50%" id="bubble_gradient2" r="50%">
          <stop offset="0" style="stop-color:#FFFFFF;"></stop>
          <stop offset="0.3726" style="stop-color:#FDFDFD;"></stop>
          <stop offset="0.6026" style="stop-color:#EBEBEB;"></stop>
          <stop offset="0.7463" style="stop-color:#C4C4C4;"></stop>
          <stop offset="0.8581" style="stop-color:#888888;"></stop>
          <stop offset="0.9523" style="stop-color:#373737;"></stop>
          <stop offset="0.9926" style="stop-color:#090909;"></stop>
          <stop offset="1" style="stop-color:#000000;"></stop>
        </radialGradient>
      </defs>
      <defs >
        <linearGradient id="brilliance_gradient" x1="50%" x2="50%" y1="0%" y2="100%">
          <stop offset="0" style="stop-color:#FFFFFF;stop-opacity:1;"></stop>
          <stop offset="0.1" style="stop-color:#FFFFFF;stop-opacity:0.99;"></stop>
          <stop offset="1" style="stop-color:#FFFFFF;stop-opacity:0;"></stop>
        </linearGradient>
      </defs>
      <defs >
        <linearGradient id="pill_gradient1" x1="50%" x2="50%" y1="100%" y2="0%">
          <stop offset="0.2472" style="stop-color:#FAFAFA"></stop>
          <stop offset="0.3381" style="stop-color:#D0D0D0"></stop>
          <stop offset="0.4517" style="stop-color:#A2A2A2"></stop>
          <stop offset="0.5658" style="stop-color:#7C7C7C"></stop>
          <stop offset="0.6785" style="stop-color:#5E5E5E"></stop>
          <stop offset="0.7893" style="stop-color:#494949"></stop>
          <stop offset="0.8975" style="stop-color:#3C3C3C"></stop>
          <stop offset="1" style="stop-color:#383838"></stop>
        </linearGradient>
        <radialGradient cx="50%" cy="50%" id="pill_gradient2" r="50%">
          <stop offset="0" style="stop-color:#FFFFFF"></stop>
          <stop offset="0.3726" style="stop-color:#FDFDFD"></stop>
          <stop offset="0.5069" style="stop-color:#F6F6F6"></stop>
          <stop offset="0.6026" style="stop-color:#EBEBEB"></stop>
          <stop offset="0.68" style="stop-color:#DADADA"></stop>
          <stop offset="0.7463" style="stop-color:#C4C4C4"></stop>
          <stop offset="0.805" style="stop-color:#A8A8A8"></stop>
          <stop offset="0.8581" style="stop-color:#888888"></stop>
          <stop offset="0.9069" style="stop-color:#626262"></stop>
          <stop offset="0.9523" style="stop-color:#373737"></stop>
          <stop offset="0.9926" style="stop-color:#090909"></stop>
          <stop offset="1" style="stop-color:#000000"></stop>
        </radialGradient>
      </defs>
      <defs >
        <linearGradient id="pill_brilliance_gradient" x1="50%" x2="50%" y1="0%" y2="100%">
          <stop offset="0" style="stop-color:#FFFFFF; stop-opacity:1"></stop>
          <stop offset="0.1" style="stop-color:#FFFFFF; stop-opacity:0.99"></stop>
          <stop offset="1" style="stop-color:#FFFFFF; stop-opacity:0"></stop>
        </linearGradient>
      </defs>
    </svg>
    <div class="legend-container">
      <!--<p class="title">Description</p>
      <p>{{cid1}}</p>
      <p class="title">introduce</p>
      <ul class="line">
        <li>
          In this introduc: {{cid2}}
        </li>
      </ul>-->
      <div class="drug-info-container">
        <p class="title">
          Agents
        </p>
        <table v-if="drugInfoList.length">
          <tr><th>Pubchem ID</th><td><a target="_blank" :href="'https://pubchem.ncbi.nlm.nih.gov/compound/'+ drugInfoList[0].cIds">{{drugInfoList[0].cIds}}</a></td><td><a target="_blank" :href="'https://pubchem.ncbi.nlm.nih.gov/compound/'+ drugInfoList[1].cIds">{{drugInfoList[1].cIds}}</a></td></tr>
          <tr><th>Drug Name</th><td>{{drugInfoList[0].drugName}}</td><td>{{drugInfoList[1].drugName}}</td></tr>
          <tr><th>Official Name</th><td>{{drugInfoList[0].drugNameOfficial}}</td><td>{{drugInfoList[1].drugNameOfficial}}</td></tr>
          <tr><th>Structure</th><td><img :src="drugInfoList[0].originImgUrl" alt="ChemicalStructure"/></td><td><img :src="drugInfoList[1].originImgUrl" alt="ChemicalStructure"/></td></tr>
          <tr><th>Molecular Weight</th><td>{{drugInfoList[0].molecularWeight}}</td><td>{{drugInfoList[1].molecularWeight}}</td></tr>
          <tr><th>Smiles String</th><td>{{drugInfoList[0].smilesString}}</td><td>{{drugInfoList[1].smilesString}}</td></tr>
          <tr><th>Relative</th>
            <td colspan="2">
              <a class="pubchem" href="https://pubchem.ncbi.nlm.nih.gov/" target="_blank">
                <img src="../../assets/pubchem.png" alt=""/>
              </a>
              <a class="stitch" target="_blank" href="http://stitch.embl.de/cgi/input.pl?UserId=T1zxeKQ17paY&sessionId=lqPqezatuxhA">
                <img src="../../assets/stitch.png" alt=""/>
              </a>
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import {charts} from '../../mixins/charts'
import * as d3 from 'd3'
import {getDrugInfoByDrugName} from '../../api/api'
export default {
  name: 'CombDrugProteinNetworks',
  mixins: [charts],
  props: {
    drugProteinLinks: {
      type: Object
    },
    cid1: {
      type: String
    },
    cid2: {
      type: String
    }
  },
  mounted () {
    this.drugName = this.$route.query.drugcombination.split(' - ')
    this.mountForceLayout()
  },
  methods: {
    mountForceLayout () {
      const svg = d3.select('.drug-protein-container').select('svg')
      const width = this.width
      const height = this.height
      const graph = this.drugProteinLinks
      const distanceScale = d3.scaleLinear().domain([0, this.maxScore]).range([100, 200])
      const simulation = d3.forceSimulation().force('link', d3.forceLink().id(d => d.id).distance(d => distanceScale(d.score)))
        .force('collide', d3.forceCollide().radius(this.radius + 1).iterations(2))
        .force('charge', d3.forceManyBody())
        .force('center', d3.forceCenter(width / 2, height / 2))

      const link = svg.append('g')
        .selectAll('line')
        .data(graph.links)
        .enter()
        .append('line')
        .attr('stroke', '#aaa')
        .attr('stroke-width', '3px')
      const nodeContainer = svg.append('g')
      this.generateRect1(nodeContainer) // 确认了固定的节点
      this.generateRect2(nodeContainer)
      const node = nodeContainer
        .selectAll('g')
        .data(graph.nodes)
        .enter()
        .append('g')
        .attr('cursor', 'pointer')
        .call(d3.drag().on('start', d => {
          if (!d3.event.active) simulation.alphaTarget(0.3).restart()
          d.fx = d.x
          d.fy = d.y
        }).on('drag', d => {
          d.fx = d3.event.x
          d.fy = d3.event.y
        }).on('end', d => {
          if (!d3.event.active) simulation.alphaTarget(0)
          d.fx = null
          d.fy = null
        }))

      this.generateCircle(node)

      graph.nodes[1].fx = width / 2 - 110
      graph.nodes[1].fy = height / 2
      node.append('title').text(d => d.protein ? d.protein.annotation : d.id)
      node.append('text')
        .attr('fill', 'black')
        .style('font-size', '16px')
        .text(d => d.protein ? d.protein.preferredName : 'None')

      graph.nodes[0].fx = width / 2 + 105 // 此处是控制药物线的节点位置
      graph.nodes[0].fy = height / 2
      node.append('title').text(d => d.protein ? d.protein.annotation : d.id)
      node.append('text')
        .attr('fill', 'black')
        .style('font-size', '16px')
        .text(d => d.protein ? d.protein.preferredName : 'None')

      simulation.nodes(graph.nodes).on('tick', () => {
        link
          .attr('x1', function (d) { return d.source.x })
          .attr('y1', function (d) { return d.source.y })
          .attr('x2', function (d) { return d.target.x })
          .attr('y2', function (d) { return d.target.y })

        node.selectAll('ellipse')
          .attr('cx', function (d) { return d.x })
          .attr('cy', function (d, i) {
            return i === 0 ? d.y + 10 : d.y - 13
          })
        node.selectAll('circle')
          .attr('cx', function (d) { return d.x })
          .attr('cy', function (d) { return d.y })

        node.selectAll('text')
          .attr('x', d => d.x - this.radius)
          .attr('y', d => d.y + 2 * this.radius)

        nodeContainer.select('.rect1').select('text')
          .attr('x', this.drugProteinLinks.nodes[0].x - 35)
          .attr('y', this.drugProteinLinks.nodes[0].y + 30)

        nodeContainer.select('.rect2').select('text')
          .attr('x', this.drugProteinLinks.nodes[1].x - 35)
          .attr('y', this.drugProteinLinks.nodes[1].y + 30)
      })
      simulation.force('link').links(graph.links)
      Promise.all([getDrugInfoByDrugName(this.drugName[0]), getDrugInfoByDrugName(this.drugName[1])]).then(data => {
        console.log('这两个drugname的信息为：')
        this.drugInfoList = data
        console.log(this.drugInfoList)
      })
    },
    generateCircle (g, radius = this.radius) {
      g.append('ellipse')
        .attr('rx', 19)
        .attr('ry', 14)
        .attr('opacity', 0.6)
        .attr('fill', '#000000')
        .attr('filter', 'url(#filter_shadow)')
      g.append('circle')
        .attr('r', radius)
        .attr('fill', 'url(#bubble_gradient1)')
      g.append('circle')
        .attr('r', radius)
        .attr('opacity', 0.33)
        .attr('fill', 'url(#bubble_gradient2)')
        .on('mouseover', function () {
          d3.select(this).attr('opacity', 0)
        })
        .on('mouseout', function () {
          d3.select(this).attr('opacity', 0.33)
        })
      g.append('circle')
        .attr('r', radius)
        .attr('opacity', 0.4)
        .attr('pointer-events', 'none')
        .attr('fill', () => {
          return this.getRandomColor()
        })
      g.append('ellipse')
        .attr('rx', 11.5)
        .attr('ry', 6)
        .attr('fill', 'url(#brilliance_gradient)')
    },
    generateRect1 (container, width = this.width / 2 + 100, height = this.height / 2, rectHeight = 30) {
      const g = container.append('g')
      g.attr('class', 'rect1')
      const w = rectHeight / 2
      const path = `M${width - w},${height - w} A15,15 0 0,0 ${width - w},${height + w} L${width + rectHeight},${height + w} A15,15 0 0,0 ${width + rectHeight},${height - w} z`
      const transform1 = `translate(${width - rectHeight},${height - w}) translate(0,10) scale(1,0.75) translate(-${width - rectHeight},-${height - w})`
      const transform2 = `translate(${width - rectHeight},${height - w}) scale(0.8,0.3) translate(9,7) translate(-${width - rectHeight},-${height - w})`
      g.append('path').attr('d', path)
        .attr('fill', '#000000')
        .attr('opacity', 0.6)
        .attr('filter', 'url(#filter_shadow)')
        .attr('transform', transform1)
      g.append('path').attr('d', path)
        .attr('fill', 'url(#pill_gradient1)')
      g.append('path').attr('d', path)
        .attr('fill', 'url(#pill_gradient2)')
        .attr('opacity', 0.33)
      g.append('path').attr('d', path)
        .attr('fill', 'rgb(255,0,0)')
        .attr('opacity', 0.5)
        .attr('cursor', 'pointer')
        .append('title').text(this.drugProteinLinks.nodes[0].id)
      g.append('path').attr('d', path)
        .attr('fill', 'url(#pill_brilliance_gradient)')
        .attr('transform', transform2)
      g.append('text')
        .attr('fill', 'black')
        .style('font-size', '16px')
        .text(this.drugName[0])

      // g.on('click', () => {
      //   console.log('this', this.$emit('centerNodeClick'))
      // })
    },
    generateRect2 (container, width = this.width / 2 - 120, height = this.height / 2, rectHeight = 30) { // 控制药物的位置
      const g = container.append('g')
      g.attr('class', 'rect2')
      const w = rectHeight / 2
      const path = `M${width - w},${height - w} A15,15 0 0,0 ${width - w},${height + w} L${width + rectHeight},${height + w} A15,15 0 0,0 ${width + rectHeight},${height - w} z`
      const transform1 = `translate(${width - rectHeight},${height - w}) translate(0,10) scale(1,0.75) translate(-${width - rectHeight},-${height - w})`
      const transform2 = `translate(${width - rectHeight},${height - w}) scale(0.8,0.3) translate(9,7) translate(-${width - rectHeight},-${height - w})`
      g.append('path').attr('d', path)
        .attr('fill', '#000000')
        .attr('opacity', 0.6)
        .attr('filter', 'url(#filter_shadow)')
        .attr('transform', transform1)
      g.append('path').attr('d', path)
        .attr('fill', 'url(#pill_gradient1)')
      g.append('path').attr('d', path)
        .attr('fill', 'url(#pill_gradient2)')
        .attr('opacity', 0.33)
      g.append('path').attr('d', path)
        .attr('fill', 'rgb(255,0,0)')
        .attr('opacity', 0.5)
        .attr('cursor', 'pointer')
        .append('title').text(this.drugProteinLinks.nodes[1].id)
      g.append('path').attr('d', path)
        .attr('fill', 'url(#pill_brilliance_gradient)')
        .attr('transform', transform2)
      g.append('text')
        .attr('fill', 'black')
        .style('font-size', '16px')
        .text(this.drugName[1])

      // g.on('click', () => {
      //   console.log('this', this.$emit('centerNodeClick'))
      // })
    },
    getRandomColor () {
      return 'rgb(' + Math.round(Math.random() * 255) + ',' + Math.round(Math.random() * 255) + ',' + Math.round(Math.random() * 255) + ')'
    }
  },
  data () {
    return {
      radius: 20,
      drugName: [],
      drugInfoList: []
    }
  },
  computed: {
    maxScore () {
      let ret = this.drugProteinLinks.links[0].score
      this.drugProteinLinks.links.forEach(item => {
        if (item.score >= ret) {
          ret = item.score
        }
      })
      return ret
    }
  }
}
</script>

<style lang="less" scoped>
  @import "../../assets/style/main";
  .drug-protein-container{
    display: flex;
    justify-content: space-between;
    .legend-container{
      width: calc(100% - 510px);
      padding: 10px;
      .drug-info-container{
        width: calc(100% - 520px);
        padding: 10px;
        transition: all 0.3s;
        /*          &:hover{
                    box-shadow: 0 30px 30px -10px rgba(33,71,109,0.3), 0 0 20px -2px rgba(15,81,148,0.2);
                  }*/

        .title{
          padding: 10px 0 20px;
          font-size: 24px;
        }
        table{
          width: 100%;
          padding: 8px;
          /*font-family: Consolas,Menlo,Courier,monospace;*/
          font-size: 12px;
          border-collapse: collapse;
          border-spacing: 0;
          empty-cells: show;
          margin-bottom: 24px;
          tr{

          }
          td{
            word-wrap:break-word;
            word-break:break-all;
            img{
              width: 200px;
              object-fit: contain;
            }
            a{
              color: @theme-color;
              &:hover{
                text-decoration: underline;
              }
              img{
                width: 60px;
                height: 25px;
                object-fit: contain;
              }
            }
          }
          th,td{
            border: 1px solid rgba(33,71,109,0.3);
            padding: 8px;
            text-align: left;
          }
        }
      }
      /*.title{
        font-size: 24px;
        font-weight: 300;
        padding: 10px 0;
        border-bottom: 1px solid #eee;
      }
      .legend{
        display: flex;
        justify-content: flex-start;
        align-items: center;
        img{
          width: 100px;
          height: 50px;
          object-fit: contain;
          transform: scale(0.5);
        }
      }*/
    }
  }
</style>
