<template>
  <FullPage>
    <section class="synergy-score-container">
      <div>
        <HeaderTitle>
          Drug Combinations
        </HeaderTitle>
        <div class="content">
          <div style="padding: 10px;">
            <Search before-text="Input drug name(s):" @input="handleInput" :tips="tips" :value="keyword" @search="handleSearch"/>
            <!--            <div class="search-tips">-->
            <!--              <ul class="line">-->
            <!--                <li>single drug <span v-if="keyword.split(' - ').length <= 1 && keyword !== ''">: &nbsp;<code >{{ keyword}}</code></span></li>-->
            <!--                <li>drug combination<span v-if="keyword.split(' - ').length > 1">: &nbsp;<code >{{ keyword}}</code></span></li>-->
            <!--              </ul>-->
            <!--            </div>-->
          </div>
          <!--<selectCellName @getSelectCellName="getCellName" :cellname="CellName" ></selectCellName>-->
         <!-- <div class='example-3'>
            <span v-for="(n,i) in CellName" v-bind:key="i" >
              <input type="checkbox" :value="n" :id="n" :name="n" v-model="checkedNames" >
              <label class="la" :for="n" >  【{{n}}】  </label>
            </span>
            <br>
            <span>Selected diseaseNames: {{ checkedNames }}</span>
          </div>-->
          <div style="padding: 10px;" class="filter" v-if="CellName.length">
            <span class="filter-tag">Filter by tissue: </span>
            <div class="filter-area">
              <div v-if="isCollapse" class="filter-list">
                <label class="checkbox" v-for="(item, index) in CellName" :key="index" ><input type="checkbox" :value="item" v-model="checkedNames" />{{item.tissue}}
                </label>
                <button class="toggle-collapse" v-if="checkedNames.length" href="" @click.prevent="checkedNames = [] ,ckeckedCellNames = []">reset</button>
              </div>
              <div class="filter-area">
              <!--<button class="toggle-collapse" href="" @click.prevent="isCollapse = !isCollapse">{{isCollapse? 'collapse' : 'open'}}</button>-->
              </div>
            </div>
          </div>
          <div style="padding: 10px;" class="filter" v-if="checkedNames.length">
            <span class="filter-tag">Filter by cellLine: </span>
            <div class="filter-area">
              <div v-if="isCollapse" class="filter-list">
                <label class="" v-for="(item, index) in checkedNames"  :key="index">
                  <label class="checkbox" v-for="(n,i) in item.cellName" :key="i">
                    <input type="checkbox" :value="n" v-model="checkedCellNames" />{{n}}
                  </label>
                </label>
                <button class="toggle-collapse" v-if="checkedNames.length" href="" @click.prevent="checkedCellNames = []">reset</button>
              </div>
              <div class="filter-area">
<!--
                <button class="toggle-collapse" v-if="checkedNames.length" href="" @click.prevent="checkedCellNames = []">reset</button>
-->
              </div>
            </div>
          </div>
          <template v-if="tableData.length">
            <SimpleTable :header="Object.keys(tableData[0])" :body="tableData" :linkIndexList="[1,2,3,4,5,6]" @itemClicked="handleItemClicked"/>
            <Page show-elevator show-total  @pageClick="handleChangePage" :total="total" :current="pageNum" :page-size="pageSize" @changePage="handleChangePage" @pageSizeChange="handlePageSizeChange"/>
            <div class="table-tips">
              <HeaderTitle>
                Tips
              </HeaderTitle>
              <ul class="line">
                <li>Clicking Single <code>Drug</code> item will jump to drug information detail page.</li>
                <li>Clicking <code>CellName</code> can get more information about cell line and disease.</li>
                <li>Clicking <code>SynergyScore</code> will get response matrix with popup dialog. <code>SynergyScore</code> represents the synergistic or antagonistic effect between the pair of drug combinations. Formally, the drug combinations with score greater than 0 are classified as synergistic ones, otherwise antagonistic ones.</li>
              </ul>
            </div>
          </template>
          <div class="not-found" v-else>
            <img src="" alt="">
            <p>
              No Results.
            </p>
          </div>
        </div>
      </div>
    </section>
    <Dialog v-if="showResponseMatrix" @closeDialog="showResponseMatrix = false"> <!--这个就是关闭的动态-->
      <Response :blockId="blockId"/>
    </Dialog>
    <Dialog v-if="showCellLineDialog" @closeDialog="showCellLineDialog = false">
        <CellLine :checkedCellName="checkedCellName" :blockId="blockId"/>
    </Dialog>
  </FullPage>
</template>

<script>
import FullPage from '../../components/FullPage/FullPage'
import HeaderTitle from '../../components/Header/HeaderTitle'
import Options from '../../components/Paging/Options'
import {getDrugIntegrationPages, searchDrugPages, getAllcellName, getDrugNameCellName, searchDrugCombinationByCombinationName} from '../../api/api'
import SimpleTable from '../../components/Table/SimpleTable'
import Page from '../../components/Paging/Paging'
import Search from '../../components/Header/Search'
import Dialog from '../../components/Dialog/Dialog'
import Response from '../response/response'
import CellLine from './components/cellLine'
import selectCellName from '../../components/Select/selectCellName'
import {throttle, sourceLinks} from '../../utils/util'
export default {
  name: 'synergyScore',
  components: {CellLine, Response, selectCellName, Dialog, Search, Page, SimpleTable, Options, HeaderTitle, FullPage},
  methods: {
    handleSearch (keyword) {
      if (keyword !== this.keyword) { // 再在这里确定了keyword不同之后，再根据keyword来取cellname数据
        this.keyword = keyword
        this.pageNum = 1
        this.tips = [] // close tips
        this.checkedNames = []
        this.checkedCellNames = []
      }
    },
    handleInput (keyword) { // 输入变化就会调用到此函数
      console.log('输入有变化了')
      console.log(keyword)
      if (keyword !== this.keyword) {
        console.log('与原来的不一样了')
        this.keyword = keyword
      }
      throttle(this.onInputSearch, null, [keyword])
    },
    onInputSearch (keyword) {
      if (keyword === '') { // 输入缩减至空时,this.keyword也为空了，那么这里也需要调用函数找所有的cellname
        this.tips = [] // close tips
        return
      }
      console.log('进入后台')
      console.log(keyword)
      this.filterTissue(this.checkedNames)
      var tempTissue4 = this.checkedTissue.join("','")
      var tempCellNames4 = this.checkedCellNames.join("','")
      searchDrugPages(keyword, 1, 100, tempCellNames4, tempTissue4).then(data => {
        if (data.total) {
          this.tips = data.page.map(item => item.drugCombination)
        } else {
          this.$message('Can not find a drug containing this word.')
        }
      })
    },
    handleItemClicked (col, key, obj) {
      switch (key.toLowerCase()) {
        case 'drugcombination':
          window.open(`/combdrugs?drugcombination=${encodeURIComponent(col.trim())}`)
          // this.$router.push(`/combdrugs?drugcombination=${encodeURIComponent(col.trim())}`) // <!--这个地方应该如何跳转？-->
          break
        case 'drug1':
        case 'drug2':
          window.open(`/drugDetail?drugName=${encodeURIComponent(col.trim())}`)
          break
        case 'cellname':
          this.checkedCellName = col.trim()
          this.blockId = obj.id
          this.showCellLineDialog = true
          break
        case 'synergyscore':
          this.blockId = obj.id
          this.showResponseMatrix = true
          break
        case 'source':
          window.open(sourceLinks[obj.source.toUpperCase()])
          break
        default:
          break
      }
    },
    filterTissue (al) {
      console.log('进来了filter')
      this.checkedTissue = []
      for (var i in al) {
        this.checkedTissue[i] = al[i].tissue
      }
      console.log(this.checkedTissue)
    },
    updateTableData () {
      if (this.keyword === '') { // 为空时，get到所有的
        console.log('为空')
        this.filterTissue(this.checkedNames)
        var tempTissue1 = this.checkedTissue.join("','")
        var tempCellNames1 = this.checkedCellNames.join("','")
        getDrugIntegrationPages(this.pageNum, this.pageSize, tempCellNames1, tempTissue1).then(data => { // 将获得到的数据放入data中保存
          if (data.total) {
            this.tableData = data.page
            this.total = data.total
            console.log(data)
          } else {
            this.$message('Not Found')
          }
        })
        this.GetdrugNameCellname(this.keyword)
      } else {
        // 判断是否为组合药物  需要新加cellname参数，来进行筛选
        if (this.keyword.split(' - ').length > 1) {
          console.log('两个药物')
          console.log(this.checkedNames)
          this.filterTissue(this.checkedNames)
          var tempTissue2 = this.checkedTissue.join("','")
          var tempCellNames2 = this.checkedCellNames.join("','")
          searchDrugCombinationByCombinationName(this.keyword, this.pageNum, this.pageSize, tempCellNames2, tempTissue2).then(data => {
            console.log('进来了两个药物')
            if (data.total) {
              this.tableData = data.page
              this.total = data.total
            } else {
              this.$message('Not Found')
            }
          })
        } else {
          console.log('一个药物')
          this.filterTissue(this.checkedNames)
          var tempTissue3 = this.checkedTissue.join("','")
          var tempCellNames3 = this.checkedCellNames.join("','")
          searchDrugPages(this.keyword, this.pageNum, this.pageSize, tempCellNames3, tempTissue3).then(data => {
            if (data.total) {
              this.tableData = data.page
              this.total = data.total
            } else {
              this.$message('Not Found')
            }
          })
        }
        this.GetdrugNameCellname(this.keyword)
      }
    },
    GetdrugNameCellname (keyword) {
      console.log('查找')
      console.log(keyword)
      if (keyword === '') { // 为空时，搜索所有的cellname
        console.log('为空的时候')
        getAllcellName().then(data => {
          if (data) {
            this.CellName = data
          } else {
            this.$message('Not Found')
          }
        })
      } else {
        console.log('不为空的时候')
        getDrugNameCellName(keyword).then(data => {
          if (data) {
            this.CellName = data
          } else {
            this.$message('Not Found')
          }
        })
      }
    },
    handleChangePage (index) {
      this.pageNum = index > Math.ceil(this.total / this.pageSize) ? Math.ceil(this.total / this.pageSize) : Number(index)
    },
    handlePageSizeChange (current, size) {
      this.pageNum = current
      this.pageSize = size
    },
    getCellName (val) {
      console.log('获得的cellname:')
      console.log(val)
    }
  },
  mounted () { // 该函数只在刚刚进入到本页面触发      首先从synergyScore获取后面的传值，判断并取cellname数据
    console.log(this.$route.query.q)
    this.keyword = this.$route.query.q || this.keyword
    console.log('22222')
    console.log(this.keyword)
    this.updateTableData()
  },
  data () {
    return {
      checkedCellName: '',
      tables: [],
      tableData: [],
      CellName: [],
      total: -1,
      pageNum: 1,
      pageSize: 10,
      keyword: '',
      blockId: -1,
      checkedNames: [],
      checkedCellNames: [],
      checkedTissue: [],
      showResponseMatrix: false,
      showCellLineDialog: false,
      tips: [], // search tips,
      isCollapse: true
    }
  },
  watch: {
    pageNum () {
      this.updateTableData()
    },
    pageSize () {
      this.updateTableData()
    },
    checkedNames () {
      this.updateTableData()
    },
    checkedCellNames () {
      this.updateTableData()
    }
  }
}
</script>

<style lang="less" scoped>
  @import "../../assets/style/main";
  .synergy-score-container{
    margin-top: 5px;
    padding: 15px 30px;
    min-height: calc(100vh - 75px);
    text-align: left;
    background: #ffffff;

    &>div{
      width: 1000px;
      margin: 0 auto;
      height: 100%;
    }
    .content{
      padding-left: 10px;
      .example-3{
        .act{
          background: yellow;
        }
        .la{
          background: whitesmoke;
        }
      }

      .filter{
        display: flex;
        .filter-tag{
          height: 30px;
          width: 120px;
          flex-shrink: 0;
          display: flex;
          align-items: center;
        }
        .filter-area{
          margin-left: 10px;
          .filter-list{
            border: 1px;
            border-style: groove;
            border-color: @input-focus-color;
            solid-color: @input-focus-color;
            max-height: 400px;
            max-width: 850px;
            overflow-y: auto;
            display: flex;
            justify-content: flex-start;
            flex-wrap: wrap;
            .checkbox{
              height: 40px;
              display: inline-flex;
              align-items: center;
              margin: 5px 8px;
              input{
                margin: 0 3px;
              }
            }
          }
          .toggle-collapse{
            background-color: @input-focus-color;
            height: 30px;
            margin: 5px 3px;
            display: inline-flex;
            align-items: center;
          }
        }
      }

      .search-tips{
        padding: 10px 0;
      }
      .table-tips{
        margin-top: 10px;
      }
    }
    .not-found{
      height: 500px;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
    }
  }
</style>
