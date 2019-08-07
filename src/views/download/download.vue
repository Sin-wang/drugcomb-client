<template>
  <FullPage>
    <section class="download-container">
      <div>
        <HeaderTitle>Datasets for download</HeaderTitle>
        <div class="content">
          <p class="title">Drug combinations with quantitative synerge scores</p>
          <div class="all-dataset">
            <table>
              <tr><th>No</th><th>File name (size)</th><th>Description</th><th>Release Date</th></tr>
              <tr><td>1</td><td><a href="http://drugcombdb.denglab.org/download/drugcombs_scored.csv" download="drugcombs_scored.csv">drugcombs_scored.csv</a></td><td>Drug combinations with quantitative synergy scores computed using dose response matrices</td><td>2019.05.31</td></tr>
            </table>
          </div>
          <p class="title">
            Two categories for classification task (synergism vs antagonism)
          </p>
          <table>
            <tr><th>No</th><th>File name (size)</th><th>Description</th><th>Release Date</th></tr>
            <tr><td>1</td><td><a href="http://drugcombdb.denglab.org/download/Syner&Antag_zip.csv" download="Syner&Antag_zip.csv">Syner&Antag_zip.csv</a></td><td>Drug combinations classified by ZIP score </td><td>2019.05.31</td></tr>
            <tr><td>2</td><td><a href="http://drugcombdb.denglab.org/download/Syner&Antag_bliss.csv" download="Syner&Antag_bliss.csv">Syner&Antag_bliss.csv</a></td><td>Drug combinations classified by BLISS score </td><td>2019.05.31</td></tr>
            <tr><td>3</td><td><a href="http://drugcombdb.denglab.org/download/yner&Antag_loewe.csv" download="yner&Antag_loewe.csv">Syner&Antag_loewe.csv</a></td><td>Drug combinations classified by LOEWE score </td><td>2019.05.31</td></tr>
            <tr><td>4</td><td><a href="http://drugcombdb.denglab.org/download/Syner&Antag_hsa.csv" download="Syner&Antag_hsa.csv">Syner&Antag_hsa.csv</a></td><td>Drug combinations classified by HSA score </td><td>2019.05.31</td></tr>
            <tr><td>5</td><td><a href="http://drugcombdb.denglab.org/download/Syner&Antag_synthetic.csv" download="Syner&Antag_synthetic.csv">Syner&Antag_synthetic.csv</a></td><td>Drug combinations classified by SYNTHETIC score </td><td>2019.05.31</td></tr>
          </table>
          <p class="title">One category dataset (synergism) </p>
          <div class="all-dataset">
            <table>
              <tr><th>No</th><th>File name (size)</th><th>Description</th><th>Release Date</th></tr>
              <tr><td>1</td><td><a href="http://drugcombdb.denglab.org/download/SynDrugComb_fda.xlsx" download="SynDrugComb_fda.xlsx">SynDrugComb_fda.xlsx</a></td><td>Drug combinations extracted from FDA orange book</td><td>2019.05.31</td></tr>
              <tr><td>2</td><td><a href="http://drugcombdb.denglab.org/download/SynDrugComb_textmining.xlsx" download="SynDrugComb_textmining.xlsx">SynDrugComb_textmining.xlsx</a></td><td>Drug combinations extracted from pubmed iteratures followed by manual curations. </td><td>2019.05.31</td></tr>
              <tr><td>3</td><td><a href="http://drugcombdb.denglab.org/download/SynDrugComb_fda&textmining.xlsx" download="SynDrugComb_fda&textmining.xlsx">SynDrugComb_fda&textmining.xlsx</a></td><td>Drug combinations extracted from FDA orange book and pubmed iteratures followed by manual curations. </td><td>2019.05.31</td></tr>
            </table>
          </div>
          <p class="title">Three-individual-drug combination dataset</p>
          <div class="all-dataset">
            <table>
              <tr><th>No</th><th>File name (size)</th><th>Description</th><th>Release Date</th></tr>
              <tr><td>1</td><td><a href="http://drugcombdb.denglab.org/download/ThreeDrugCombs.csv" download="ThreeDrugCombs.csv">ThreeDrugCombs.csv</a></td><td>Drug combinations composed by three individual drugs (synerge score is unavailable) </td><td>2019.05.31</td></tr>
            </table>
          </div>
          <p class="title">Supplementary data files</p>
          <div class="all-dataset">
            <table class="small">
              <tr><th>No</th><th>Dataset</th><th>Release Date</th></tr>
              <tr v-for="(item,index) in allData" :key="index"><td>{{index+1}}</td><td><span @click="handleDownLoad(item.index-1, item.title)" class="download-link">{{item.title}}</span></td><td>{{item.date}}</td></tr>
            </table>
            <p style="color: #ff0000;">
              Note: All the datasets are for acedemic usage only.
            </p>
          </div>
        </div>
      </div>
    </section>
  </FullPage>
</template>

<script>
import FullPage from '../../components/FullPage/FullPage'
import HeaderTitle from '../../components/Header/HeaderTitle'
import Search from '../../components/Header/Search'
import {downloadFileByIndex} from '../../api/api'
export default {
  name: 'download',
  components: {Search, HeaderTitle, FullPage},
  methods: {
    handleSearch (keyword) {
      this.keyword = keyword
      this.$message('This feature has not been implemented yet.')
    },
    handleDownLoad (index, fileName) {
      downloadFileByIndex(index).then(res => {
        const testBlob = res.data.slice(0)
        const reader = new FileReader()
        reader.readAsText(testBlob, 'utf-8')
        reader.onload = function (evt) {
          // 到底是后台返回的数据乱码了 还是前端接收数据流的时候创建的blob乱码了--
          const url = window.URL.createObjectURL(new Blob(['\uFEFF' + evt.target.result], {type: 'text/plain;charset=utf-8'}))
          const link = document.createElement('a')
          link.href = url
          link.setAttribute('download', `${fileName}`)
          document.body.appendChild(link)
          link.click()
        }
        /*        const url = window.URL.createObjectURL(res.data)
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', `${fileName}`)
        document.body.appendChild(link)
        link.click() */
      })
    }
  },
  data () {
    return {
      singleDrug: null,
      keyword: '',
      allData: [
        {
          index: 3,
          date: '2019.04.19',
          title: 'cell_Line.csv'
        },
        {
          index: 4,
          date: '2019.04.19',
          title: 'drug_chemical_info.csv'
        },
        {
          index: 5,
          date: 'Latest',
          title: 'drug_protein_links.tsv'
        },
        {
          index: 6,
          date: 'Latest',
          title: 'protein_protein_links.txt'
        }
      ]
    }
  }
}
</script>

<style lang="less" scoped>
  @import "../../assets/style/main";
  .download-container{
    margin-top: 5px;
    padding: 15px 30px;
    min-height: calc(100vh - 75px);
    text-align: left;
    background: #ffffff;
    &>div{
      width: 1000px;
      margin: 0 auto;
      height: 100%;
      .content{
        padding-left: 30px;

        p.title{
          font-weight: 500;
          font-size: 18px;
          padding: 10px 0;
        }
        p{
          font-weight: 300;
          font-size: 16px;
          color: #212121;
        }
        table{
          width: 75%;
          border-spacing: 0;
          border-collapse: collapse;
          margin: 10px 0 20px;
          th,td{
            padding: 8px 16px;
            text-align: left;
          }
          th{
            font-weight: 600;
            text-align: center;
            white-space: nowrap;
            border-top: 1px solid #ddd;
            border-bottom: 1px solid #ddd;
            background: #f7f7f7;
          }
          tr:last-child{
            td{
              border-bottom: 1px solid #ddd;
            }
          }
          tr{
            td:first-child,td:last-child{
              text-align: center;
            }
          }
        }
        table.small{
          width: 50%;
        }
      }

      .description{
        .description-title{
          font-weight: 400;
          padding: 0 0 10px;
        }
        ul{
          padding:10px;
          background: #f5f5f5;
          border: 1px solid #e8e8e8;
          li{
            padding: 2px;
          }
        }
      }
      .download-link{
        color: @theme-color;
        &:hover{
          text-decoration: underline;
          cursor: default;
        }
      }
    }
  }
</style>
