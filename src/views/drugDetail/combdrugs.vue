<template>
  <FullPage>
    <section class="drug-info-container">
      <div>
        <HeaderTitle>
          CombDrug-Detail-Information
        </HeaderTitle>
        <div class="drug-info">
          <template v-if="drugProteinLinks && drugProteinLinks.links.length">
            <CombDrugProteinNetworks :width="450" :height="410" :drugProteinLinks="drugProteinLinks" :cid1="this.drugInfo[0]" :cid2="this.drugInfo[1]" />
            <div v-if="drug_protein_table.length" style="padding: 8px 0;"><!--数据表格-->
              <p class="table-title">Common targets of {{combDrugName[0]}} and {{combDrugName[1]}}</p>
              <SimpleTable :header="Object.keys(drug_protein_table[0])" :body="drug_protein_table"/>
              <Page show-elevator show-total  @pageClick="handleChangePage" :total="total" :current="pageNum" :page-size="pageSize" @changePage="handleChangePage" @pageSizeChange="handlePageSizeChange"/>
            </div>
          </template>
          <div v-if="!error && !drugProteinLinks">
            Loading...
          </div>
          <div v-if="!error && drugProteinLinks && !drugProteinLinks.links.length">
            No Results.
          </div>
        </div>
      </div>
    </section>
  </FullPage>
</template>

<script>import FullPage from '../../components/FullPage/FullPage'
import HeaderTitle from '../../components/Header/HeaderTitle'
import {getCombDrugProteinLinksInformation, getDrugInfoDescriptionByDrugId, getDrugInfoExtraByDrugId, getCombDrugProteinLinksPages, getDrugInfoByDrugNames} from '../../api/api'
import DrugProteinNetworks from '../../components/Visualization/DrugProteinNetworks'
import SimpleTable from '../../components/Table/SimpleTable'
import Page from '../../components/Paging/Paging'
import CombDrugProteinNetworks from '../../components/Visualization/CombDrugProteinNetworks'
export default {
  name: 'drugcombination',
  components: {Page, SimpleTable, CombDrugProteinNetworks, DrugProteinNetworks, HeaderTitle, FullPage},
  mounted () {
    this.fetchData()
  },
  methods: {
    fetchData () {
      /*  const drugName = this.$route.query.drugName
      this.drugName = drugName  */
      var com = this.$route.query.drugcombination.split(' - ')
      this.combdurgsName = com
      if (this.combdurgsName === '') {
        this.$message({
          type: 'error',
          text: 'Path Error'
        })
      } else {
        getDrugInfoByDrugNames(this.combdurgsName[0], this.combdurgsName[1]).then(data => { /* 根据两个name来找两个cid */
          this.drugInfo = data
          console.log('两个cids')
          return data
        }).then(data => {
          getCombDrugProteinLinksInformation(data[0], data[1]).then(data => {
            console.log('getCombDrugProteinLinksInformation:')
            this.drugProteinLinks = data // 传入两个药物ID进去
          })
          getDrugInfoExtraByDrugId(this.drugInfo[0]).then(data => { /* 在drug_chemical_info_extra根据CID，只要了Indication和Pharmacodynamics */
            console.log('getDrugInfoExtraByDrugId:')
            this.drugInfoExtra = data
          })
          getDrugInfoDescriptionByDrugId(this.drugInfo[0]).then(data => {
            console.log('getDrugInfoDescriptionByDrugId')
            this.drugDescription = data.description
          })
          this.updateTableData()
        }).catch(err => {
          this.error = true
          this.$message({
            type: 'error',
            text: 'Loading data error! 【ERROR】: ' + JSON.stringify(err)
          })
        })
      }
    },
    updateTableData () {
      if (this.drugInfo) {
        getCombDrugProteinLinksPages(this.drugInfo[0], this.drugInfo[1], this.pageNum, this.pageSize).then(data => {
          this.drug_protein_table = data.page.sort((p, c) => {
            return +p.proteinId.replace('9606.ENSP', '') - c.proteinId.replace('9606.ENSP', '')
          })
          this.total = data.total
          console.log('getCombDrugProteinLinksPages:')
        })
      } else {
        this.$message({
          text: 'drug ID is null',
          type: 'error'
        })
      }
    },
    handleChangePage (index) {
      this.pageNum = index > Math.ceil(this.total / this.pageSize) ? Math.ceil(this.total / this.pageSize) : Number(index)
    },
    handlePageSizeChange (current, size) {
      this.pageNum = current
      this.pageSize = size
    }
  },
  data () {
    return {
      drugInfo: null,
      drugName: '',
      drugProteinLinks: null,
      error: false,
      drugInfoExtra: null,
      drug_protein_table: [],
      pageNum: 1,
      pageSize: 10,
      total: -1,
      combdurgsName: [],
      drugDescription: ''
    }
  },
  computed: {
    combDrugName () {
      return this.$route.query.drugcombination.split(' - ')
    }
  },
  watch: {
    pageNum () {
      this.updateTableData()
    },
    pageSize () {
      this.updateTableData()
    }
  }
}
</script>

<style lang="less" scoped>
  .drug-info-container{
    margin-top: 5px;
    padding: 15px 30px;
    min-height: calc(100vh - 75px);
    text-align: left;
    background: #ffffff;
    &>div{
      width: 1000px;
      margin: 0 auto;
      height: 100%;
      &>div{
        padding-left: 30px;
        .table-title{
          /*text-align: center;*/
          font-weight: 300;
          font-size: 24px;
          padding: 10px 0;
        }
      }
    }
  }
</style>
