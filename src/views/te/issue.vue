<template>
  <div>
  <div style="display:flex;justify-content: space-between;margin-bottom:10px">
  <div style="display:flex">
         <span class="title">線別 :</span><el-select
      v-model="value" style="width: 100px" :clearable="true">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
    <span class="title" style="margin-left: 20px;">日期 :</span>
    <el-date-picker
     style="width: 120px"
      v-model="valueDate"
      type="date"
      placeholder="选择日期">
    </el-date-picker>
    <span class="title" style="margin-left: 20px;">Cover:</span><el-select
      v-model="coverVal" style="width: 120px" :clearable="true">
      <el-option
        v-for="item in coverOptions"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
  </div>
   <div>

  <el-button class="exportExcel"  @click="_exportExcel" style="margin-right: 20px;text-align:right;background:#77A1D3"  type="primary" icon="el-icon-download">導出Excel</el-button>
  <el-button class="exportExcel" @click="_addItem" style="margin-right: 20px;text-align:right;background:#20BDFF"  type="primary" icon="el-icon-download">新增</el-button>
  <el-button type="primary" style="background:#3CA55C" icon="el-icon-search" @click="_search">搜索</el-button>

   </div>
</div>
  <DataTable ref="doorTable"  :tableData="tableData" :pictLoading="pictLoading" :tableBarList="tableBarList" />
  <BasePagination v-if="tableData.length" @handleCurrentChange="handleCurrentChange" @handleSizeChange="handleSizeChange" :total="total"/>
  <el-dialog
  title="新增異常"
  :close-on-click-modal="false"
  :visible.sync="dialogVisible"
  width="1200px"
  >
  <div style="display:flex;justify-content:space-around">
    <div>
  <div style="margin-top: 10px">
    <span class="title">線別 :</span><el-select
        v-model="issue.line"  :clearable="true">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
  </div>
  <div style="margin-top: 10px">
    <span class="title">機種:</span><el-input v-model="issue.mechineName" style="width: 220px"></el-input>
  </div>
  <div style="margin-top: 10px">
    <span class="title">條碼:</span><el-input v-model="issue.barcode" style="width: 220px"></el-input>
  </div>
  <div style="margin-top: 10px">
    <span class="title">描述:</span><el-input v-model="issue.description" style="width: 220px"></el-input>
  </div>
  <div style="margin-top: 10px">
    <span class="title">人員:</span><el-input v-model="issue.ownerName" style="width: 220px"></el-input>
  </div>
    <div style="display:flex;margin-top:10px">
    <span class="title">站別:</span><el-input style="width: 220px" v-model="issue.stack"></el-input>
  </div>
  <div style="display:flex;margin-top:10px">
  <span class="title" >日期 :</span><el-date-picker
      v-model="issue.date"
      type="date"
      placeholder="选择日期">
  </el-date-picker>
  </div>
    </div>
    <div>
      <div style="margin-top: 10px;text-align:center">
      <ImgCutter v-on:cutDown="cutDown" label="模擬圖片"></ImgCutter>
      <img :src="imgUrl" width="100px" height="100px" alt="dffd">
      </div>
    </div>
    <div>
      <div style="margin-top: 10px">
        <span class="title" style="width: 400px">機台測試結果圖片:</span>
      </div>
    </div>
  </div>
  <div>
  </div>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
</el-dialog>
  </div>
</template>

<script>
/* eslint-disable */
import BasePagination from '@/components/base/basePagination'
import DataTable from '@/components/datatable'
import ImgCutter from 'vue-img-cutter'
// import {queryVacation} from '@/api/hr'
// import {dateFormat} from '@/utils/date'
export default {
  data () {
    return {
      imgUrl: '',
      dialogVisible: false,
      issue: {
        stack: '',
        date: new Date(),
        line: '',
        mechineName: '',
        barcode: '',
        description: '',
        ownerName: '',
        imitateImg: '',
        resultImg: '',
        corver: true,
        course: '',
        way: ''
      },
      valueDate: '',
      value: '',
      dialogVisible: false,
      coverVal: '',
      options: [
        {
          label: 'A2A',
          value: 'normalleave'
        },
        {
          label: 'A2B',
          value: 'errorleave'
        }
      ],
      coverOptions: [
        {
          label: '可Cover',
          value: 'normalleave'
        },
        {
          label: '不可Cover',
          value: 'errorleave'
        }
      ],
      // 员工工号
      pictLoading: false,
      tableData: [],
      currentPage: 1,
      pageSize: 10,
      userNum: '',
      startDate: '',
      total: 0,
      endDate: '',
      tableBarList: [
        {label: '序號', width: '50px', type: 'index'},
        {property: 'userNo', label: '工號'},
        {property: 'userName', label: '姓名'},
        {property: 'partN', label: '部門'},
        {property: 'issueType', label: '異常類型'},
        {property: 'issueImg', label: '異常圖片'},
        {property: 'issueStartTime', label: '異常發生時間'},
        {property: 'issueInfo', label: '說明'}
      ],
      pickerOptionsStart: {
        disabledDate (time) {
          if (!time) {
            return ''
          }
          return time.getTime() > Date.now()
        }
      },
      pickerOptionsEnd: {
        disabledDate (time) {
          if (!time) {
            return ''
          }
          return time.getTime() > Date.now()
        }
      }
    }
  },
  methods: {
    cutDown (data) {
      console.log(data)
      this.imgUrl =  data.dataURL
    },
    _addItem () {
      this.dialogVisible = true
    },
    changeStart () {
      if (this.startDate === '' || this.startDate === null) {
        this.endDate = ''
        return
      }
      const that = this
      this.pickerOptionsEnd = {
        disabledDate (time) {
          if (that.startDate === '' || that.startDate === null) {
            return
          }
          return time.getTime() > that.startDate.getTime() + 3600 * 1000 * 24 * 150 || time.getTime() < that.startDate.getTime()
        }
      }
    },
    _search () {
      this.pictLoading = true
      // queryVacation(dateFormat('YYYY-mm-dd', this.startDate), dateFormat('YYYY-mm-dd', this.endDate), this.currentPage, this.pageSize, this.value).then(res => {
      //   this.tableData = res.data.data[1]
      //   // console.log(res.data)
      //   this.total = res.data.cursor.total
      //   this.pictLoading = false
      // })
    },
    _exportExcel () {
      const tHeader = ['工號', '姓名', '部門代碼', '部門名稱', '申請時間', '休假時數', '休假開始時間', '休假結束時間', '休假類別', '請假原因']
      const filterVal = ['userNo', 'userName', 'deptNo', 'deptName', 'applyDate', 'absenceHours', 'startTime', 'endTime', 'absenceName', 'reason']
      const tabelName = '休假記錄表'
      this.$refs.doorTable.exportExcel(tHeader, filterVal, tabelName)
    },
    handleSizeChange (size) {
      this.currentPage = 1
      this.pageSize = size
      this._search()
    },
    handleCurrentChange (index) {
      this.currentPage = index
      this._search()
    }
  },
  components: {
    // DateAndTitle,
    BasePagination,
    DataTable,
    ImgCutter
  }

}
</script>

<style lang="scss" scoped>
.title {
  display: inline-block;
  height: 40px;
  line-height: 40px;
  color: #fff;
  width: 60px;
  text-align: center;
  font-size: 14px;
  padding: 0 5px;
  background: #409eff;
  // margin-left: 10px;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
}
.idCon{
    display: inline-block;
    font-size: 0;
}
// 截图
.cropper-content {
    .cropper {
        width: auto;
        height: 300px;
    }
}
>>>.el-input__inner{
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}
</style>
