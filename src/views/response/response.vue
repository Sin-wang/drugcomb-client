<template>
    <section>
      <div>
        <HeaderTitle>
          Drug Combination Response
        </HeaderTitle>
        <div class="content" v-if="tableData.length">
          <div class="tab">
            <button :class="{'active': !showTable}" @click="showTable = false">Matrix</button>
            <button :class="{'active': showTable}" @click="showTable = true">Table</button>
          </div>
          <SimpleTable v-if="showTable" :body="tableData" :header="Object.keys(tableData[0])"/>
          <div class="response-matrix" v-else>
            <MultiRect  :data="tableData"/>
            <div class="drug-info-container">
              <p class="title">Description of {{this.tableData[0].drugRowName}}</p>
              <p>{{this.drugInfoList[0]}}</p>
              <p class="title">Description of {{this.tableData[0].drugColName}}</p>
              <p>{{this.drugInfoList[1]}}</p>
              <!--<p class="title">
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
              </table>-->
            </div>
          </div>
        </div>
      </div>
    </section>
</template>

<script>
import HeaderTitle from '../../components/Header/HeaderTitle'
import {getIndividualDrugCombinationByBlockId, getDrugDescriptionByDrugName} from '../../api/api'
import SimpleTable from '../../components/Table/SimpleTable'
import MultiRect from '../../components/Visualization/Multi-Rect'
export default {
  name: 'response',
  components: {MultiRect, SimpleTable, HeaderTitle},
  props: ['blockId'],
  data () {
    return {
      drugInfoList: [],
      tableData: [],
      showTable: false
    }
  },
  mounted () {
    getIndividualDrugCombinationByBlockId(this.blockId).then(data => {
      this.tableData = data
      return data
    }).then(data => {
      Promise.all([getDrugDescriptionByDrugName(data[0].drugRowName), getDrugDescriptionByDrugName(data[0].drugColName)]).then(data => {
        console.log('这两个name以及获得的描述为：')
        this.drugInfoList = data
        if (this.drugInfoList[0] === null) {
          this.drugInfoList[0] = 'None'
        }
        if (this.drugInfoList[1] === null) {
          this.drugInfoList[1] = 'None'
        }
      })
    })
  }
}
</script>

<style lang="less" scoped>
  @import "../../assets/style/main";
  section{
    text-align: left;
    background: #ffffff;

    &>div{
      width: 1100px;
      margin: 0 auto;
      height: 100%;
    }

    &:first-child{
      margin-top: 5px;
    }
    &:last-child{
      margin-bottom: 10px;
    }

    .drug-info{
      display: flex;
      justify-content: flex-start;
      table{
        th{
          text-align: right;
        }
        th,td{
          padding: 10px;
          img{
            height: 150px;
            object-fit: contain;
          }
        }
      }

      ul{
        margin-left: 50px;
      }
    }

    .content{
      padding-left: 10px;

      .tab{
        padding: 15px 5px;
        button{
          transition: all 0.3s;
          height: 30px;
          .btn()
        }
        .active{
          background: #ffffff;
          border-color: @theme-color;
          color: @theme-color;
        }
      }
      .response-matrix{
        display: flex;
        justify-content: space-around;

        .drug-info-container{
          width: calc(100% - 520px);
          padding: 10px;
          transition: all 0.3s;
          .title{
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
          }
/*          &:hover{
            box-shadow: 0 30px 30px -10px rgba(33,71,109,0.3), 0 0 20px -2px rgba(15,81,148,0.2);
          }*/

          /*.title{
            padding: 10px 0 20px;
            font-size: 24px;
          }
          table{
            width: 100%;
            padding: 8px;
            !*font-family: Consolas,Menlo,Courier,monospace;*!
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
          }*/
        }
      }
    }
  }
</style>
