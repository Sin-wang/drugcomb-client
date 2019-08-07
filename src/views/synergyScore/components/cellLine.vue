<template>
  <!--  Todo:收集细胞系的gene expressions    -->
  <section class="cell-line-container">
    <HeaderTitle>CellName: {{checkedCellName}}
    </HeaderTitle>
    <div class="drug-info-container">
      <p class="title">cosmic id: {{this.CellInfoList.cosmicId}}</p>
      <p class="title">cellosaurus_assession: {{this.CellInfoList.cellosaurus_assession}}</p>
      <p class="title">disease: {{this.CellInfoList.disease}}</p>
      <p class="title">tissue: {{this.CellInfoList.tissue}}</p>
    </div>
    <p v-if="!showTable" style="font-size: 20px">Not Found</p>
    <SimpleTable v-if="showTable" :body="tableData" :header="Object.keys(tableData[0])"/>
    <Page v-if="showTable" show-elevator show-total  @pageClick="handleChangePage" :total="total" :current="pageNum" :page-size="pageSize" @changePage="handleChangePage" @pageSizeChange="handlePageSizeChange"/>
  </section>
</template>

<script>

import HeaderTitle from '../../../components/Header/HeaderTitle'
import SimpleTable from '../../../components/Table/SimpleTable'
import MultiRect from '../../../components/Visualization/Multi-Rect'
import Page from '../../../components/Paging/Paging'

import {getInfoByBlockId, getFittedInfoByBlockId} from '../../../api/api'

export default {
  name: 'cellLine',
  components: {MultiRect, SimpleTable, HeaderTitle, Page},
  props: ['blockId', 'checkedCellName'],
  data () {
    return {
      CellInfoList: [],
      tableData: [],
      showTable: true,
      total: -1,
      pageNum: 1,
      pageSize: 10
    }
  },
  mounted () {
    getInfoByBlockId(this.blockId).then(data => {
      this.CellInfoList = data
    }).then(data => {
      getFittedInfoByBlockId(this.pageNum, this.pageSize, this.CellInfoList.cosmicId).then(data => {
        if (data.total) {
          this.tableData = data.page
          this.total = data.total
        } else {
          this.showTable = false
          this.$message('Fitted Not Found')
        }
      })
    })
  },
  methods: {
    handleChangePage (index) {
      this.pageNum = index > Math.ceil(this.total / this.pageSize) ? Math.ceil(this.total / this.pageSize) : Number(index)
    },
    handlePageSizeChange (current, size) {
      this.pageNum = current
      this.pageSize = size
    },
    upTableData () {
      console.log(this.CellInfoList.cosmicId)
      getFittedInfoByBlockId(this.pageNum, this.pageSize, this.CellInfoList.cosmicId).then(data => {
        if (data.total) {
          this.tableData = data.page
          this.total = data.total
          console.log('在cellLine中的表格数据：')
          console.log(data)
        } else {
          this.$message('Not Found')
        }
      })
    }
  },
  watch: {
    pageNum () {
      this.upTableData()
    },
    pageSize () {
      this.upTableData()
    }
  }
}

</script>

<style lang="less" scoped>
  .cell-line-container{
    text-align: left;
    background: #ffffff;
    min-width: 1100px;
    .drug-info-container {
      width: calc(100% - 520px);
      padding: 10px;
      transition: all 0.3s;

      .title {
        width: 1100px;
        font-size: 20px;
        font-weight: 400;
        padding: 10px 0;
        border-bottom: 1px solid #eee;
      }
    }
  }
</style>
