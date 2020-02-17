<template>
  <div>
    <actionButton ref="actionButton" :downloadLoading="downloadLoading" @refresh="refresh" @search="search"  @showAddItem="showAddItem" @handleDownload="handleDownload"/>
    <div class="aoi-table">
      <el-table
        @selection-change="handleSelectionChange"
        :border="true"
        v-loading="loading"
        size="meduim"
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="board" label="BoardName"></el-table-column>
        <el-table-column prop="program" label="TestFile"></el-table-column>
        <el-table-column prop="width" label="Width"></el-table-column>
        <el-table-column label="CreateTime">
          <template slot-scope="scope">{{ utc2beijing(scope.row.createTime) }}</template>
        </el-table-column>
        <el-table-column label="UpdateTime">
          <template slot-scope="scope">{{ utc2beijing(scope.row.updateTime) }}</template>
        </el-table-column>
        <el-table-column fixed="right" width="240" label="Operation">
          <template slot-scope="scope">
            <el-button size="mini" @click="showDetail(scope.row)">Detail</el-button>
            <el-button size="mini" type="success" @click="editItem(scope.row)">Edit</el-button>
            <el-button size="mini" type="danger" @click="deleteItem(scope.row._id)">Delete</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        v-if="tableData.length"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
        class="pagination"
        :current-page="currentPage"
        :page-sizes="[9,18]"
        :total="total"
        layout="total, sizes, prev, pager, next, jumper"
      ></el-pagination>
      <el-dialog title="詳情" :visible.sync="dialogTableVisible">
        <el-table :data="itemDetail">
          <el-table-column property="board" label="主板名" width="150"></el-table-column>
          <el-table-column property="program" label="測試程式" width="200"></el-table-column>
          <el-table-column property="width" label="主板寬度"></el-table-column>
          <el-table-column property="updateTime" label="創建時間"></el-table-column>
        </el-table>
      </el-dialog>
      <el-dialog title="ADD " :visible.sync="addVisible">
        <div style="display: flex; algin-item:center ;margin-bottom: 20px">
          <span style="display:inline-block;width: 160px;line-height: 40px">主板名字:</span> <el-input
          placeholder="請輸入主板名稱"
          v-model.trim="addItem.boardName"   clearable>
        </el-input>
      </div>
        <div  style="display: flex;algin-item:center ;margin-bottom: 20px">
          <span style="display:inline-block;width: 160px;line-height: 40px">测试程式名: </span> <el-input
          placeholder="请输入测试程式名"
          v-model.trim="addItem.program"   clearable>
        </el-input>
      </div>
        <div  style="display: flex; just-content:center ;mmargin-bottom: 20px">
          <span style="display:inline-block;width: 160px;line-height: 40px">主板宽度:</span>  <el-input
          placeholder="請輸入主板宽度"
          v-model.trim="addItem.width"   clearable>
        </el-input>
      </div>
      <div style="margin-top:20px;text-align:right">
        <el-button type="primary" :loading="btnLoding" @click="submitAddItem" size="mini" >Submit</el-button>
      </div>

      </el-dialog>
      <el-dialog title="Update" :visible.sync="updateVisible">
        <div style="display: flex; algin-item:center ;margin-bottom: 20px">
          <span style="display:inline-block;width: 160px;line-height: 40px">主板名字:</span> <el-input
          placeholder="請輸入主板名稱"
          v-model.trim="updateItem.board"   clearable>
        </el-input>
      </div>
        <div  style="display: flex;algin-item:center ;margin-bottom: 20px">
          <span style="display:inline-block;width: 160px;line-height: 40px">测试程式名: </span> <el-input
          placeholder="请输入测试程式名"
          v-model.trim="updateItem.program" disabled="true"  clearable>
        </el-input>
      </div>
        <div  style="display: flex; just-content:center ;mmargin-bottom: 20px">
          <span style="display:inline-block;width: 160px;line-height: 40px">主板宽度:</span>  <el-input
          placeholder="請輸入主板宽度"
          v-model.trim="updateItem.width"   clearable>
        </el-input>
      </div>
      <div style="margin-top:20px;text-align:right">
        <el-button type="primary" :loading="btnLoding" @click="submitEditItem" size="mini" >Update</el-button>
      </div>
      </el-dialog>
      <el-dialog
        title="确认删除"
        :visible.sync="deleteVisible"
        width="30%"
        >
        <span style="color:red">Are you sure you want to delete this item?</span>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="deleteVisible = false">Cancel</el-button>
          <el-button type="danger" :loading="btnLoding"  @click="sureDeleteItem">Delete</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import actionButton from './modules/actionButton'
import { utc2beijing } from '@/utils/date'
import {getAoiData, addBoardInfo, updateBoardInfo, deleteBoardInfo} from '@/api/aoi'
export default {
  components: {
    actionButton
  },
  data () {
    return {
      id: '',
      // 删除的dialog
      deleteVisible: false,
      // 导出excel的loading状态
      downloadLoading: false,
      // 显示详情的状态
      dialogTableVisible: false,
      // 几个需要promise网路状态的按钮
      btnLoding: false,
      // 主table表的loading控制
      loading: true,
      // 分页的总条数
      total: 0,
      allTableData: [],
      currentPageSize: 9,
      currentPage: 1,
      tableData: [],
      addItem: {
        boardName: '',
        program: '',
        width: ''
      },
      updateVisible: false,
      updateItem: {
        board: '',
        program: '',
        width: 0,
        _id: ''
      },
      addVisible: false,
      itemDetail: [
        {
          boardName: '',
          program: '',
          width: '',
          createTime: '',
          _v: '',
          _id: ''
        }
      ],
      multipleSelection: []
    }
  },
  created () {
    // 所有的数据为缓存内容
    this.utc2beijing = utc2beijing
    this.getTableData()
  },
  methods: {
    // 点击搜索按钮由子组件触发
    search (input) {
      this.getTableData(input)
    },
    // 刷新按钮,此刷新按钮需要调用actionButton 内部的方法，因为此时在父组件拿不到子组件的input的值
    refresh () {
      this.$refs.actionButton.search()
    },
    // 根据数据库唯一id删除数据
    deleteItem (id) {
      this.id = id
      this.deleteVisible = true
    },
    // 确定删除根据数据库唯一id删除数据
    sureDeleteItem () {
      this.btnLoding = true
      this.loading = true
      deleteBoardInfo({id: this.id}).then(res => {
        const {data} = res
        if (data === 'ok') {
          this.deleteVisible = false
          this.refresh()
          this.$message({
            message: 'delete success!',
            type: 'success'
          })
        } else {
          this.deleteVisible = false
          this.refresh()
          this.$message({
            message: data,
            type: 'warning'
          })
        }
        this.btnLoding = false
        this.loading = false
      })
    },
    // 打开编辑窗口
    editItem (item) {
      // console.log(item)
      this.updateItem = item
      // 异步显示渲染内容
      this.$nextTick(() => {
        this.updateVisible = true
      })
    },
    // 提交编辑更新内容
    submitEditItem () {
      this.loading = true
      this.btnLoding = true
      if (this.updateItem.board === '' || this.updateItem.program === '' || this.updateItem.width === '' || this.updateItem._id === '') {
        this.loading = false
        this.$message({
          message: 'Please input all item',
          type: 'warning'
        })
        this.btnLoding = false
        this.loading = false
      } else {
        updateBoardInfo(this.updateItem).then(res => {
          const {data} = res
          if (data === 'ok') {
            this.updateVisible = false
            this.refresh()
            this.$message({message: 'update success!', type: 'success'})
          } else {
            this.updateVisible = false
            this.refresh()
            this.$message({message: data, type: 'warning'})
          }
          this.btnLoding = false
          this.loading = false
        })
      }
    },
    // 增加一个主板信息
    submitAddItem () {
      this.loading = true
      this.btnLoding = true
      if (this.addItem.boardName === '' || this.addItem.program === '' || this.addItem.width === '') {
        this.loading = false
        this.$message({message: 'Please select at least one item', type: 'warning'})
        this.btnLoding = false
        this.loading = false
      } else {
        addBoardInfo(this.addItem).then(res => {
          const {data} = res
          if (data === 'ok') {
            this.addVisible = false

            this.$message({message: 'save success!', type: 'success'})
          } else if (data === 'exist') {
            this.addVisible = false
            this.$message({message: data, type: 'warning'})
          } else {
            this.addVisible = false
            this.$message({message: data, type: 'warning'})
          }
          this.refresh()
          this.addItem = {boardName: '', program: '', width: ''}
          this.btnLoding = false
          this.loading = false
        })
      }
    },
    // 手动点击选择的item
    handleSelectionChange (v) {
      this.multipleSelection = v
    },
    // 增加一項
    showAddItem () {
      this.addVisible = true
    },
    // 點擊詳情展示
    showDetail (item) {
      this.itemDetail = [
        Object.assign({}, item, {
          updateTime: utc2beijing(item.updateTime)
        })
      ]
      // 因為數據渲染需要時間，所以是需要渲染完成之後再顯示
      // console.log(this.itemDetail)
      this.$nextTick(() => {
        this.dialogTableVisible = true
      })
    },
    // 得到aoi表單所有數據
    getTableData (input = '') {
      this.loading = true
      getAoiData().then(res => {
        const { data } = res
        this.allTableData = input ? data.filter((item) => item.board.indexOf(input) !== -1) : data
        this.tableData = this.allTableData
        this.total = this.tableData.length
        this.changePage()
        this.handleCurrentChange(1)
        this.loading = false
      })
    },
    // 改变当前的page索引
    handleCurrentChange (e) {
      this.currentPage = e
      this.changePage()
    },
    // 改变page显示的数据区间
    changePage () {
      this.tableData = this.allTableData.slice(
        this.currentPageSize * (this.currentPage - 1),
        this.currentPageSize * this.currentPage
      )
    },
    // 改变显示条数后需要把默认索引变成1
    handleSizeChange (e) {
      this.currentPageSize = e
      this.currentPage = 1
      // this.getTableData()
    },
    // 下载excel选中表单内容
    handleDownload () {
      if (this.multipleSelection.length) {
        this.downloadLoading = true
        import('@/vendor/Export2Excel').then(excel => {
          const tHeader = ['boardName', 'program', 'width', 'updateTime']
          const filterVal = ['board', 'program', 'width', 'updateTime']
          const list = this.multipleSelection
          const data = this.formatJson(filterVal, list)
          excel.export_json_to_excel({
            header: tHeader,
            data,
            filename: 'boardsInfo'
          })
          this.$refs.multipleTable.clearSelection()
          this.downloadLoading = false
        })
      } else {
        this.$message({
          message: 'Please select at least one item',
          type: 'warning'
        })
      }
    },
    // 需要json格式化内容
    formatJson (filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]))
    }
  }
}
</script>
<style lang="scss" scoped>

.aoi-table {
  padding-top: 20px;
  .pagination {
    box-sizing: border-box;
    padding-right: 60px;
    margin-top: 16px;
    text-align: right;
  }
}
</style>
