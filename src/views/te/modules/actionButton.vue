<template>
  <div class="actionButton">
      <div>
        <el-button type="primary" @click="showAddItem" size="mini" icon="el-icon-edit">Add</el-button>
        <el-button
          style="text-align:right"
          @click="handleDownload"
          type="primary"
          size="mini"
          :icon="downloadLoading ? 'el-icon-loading':'el-icon-download'"
        >Export Select</el-button>
        <el-button type="primary" @click="refresh" size="mini" icon="el-icon-refresh">Refresh</el-button>
      </div>
      <div style="font-size:0">
        <el-input
         clearable
          class="search-input"
          @focus="()=>{this.isFocus = true}"
          @blur="()=>{this.isFocus = false}"
          :style="{width: isFocus? '300px': '160px' } "
          v-model.trim="input"
          style="marign-right:0;border-top-right-radius:0;border-bottom-right-radius:0"
          size="mini"
          placeholder="Please input content"
        ></el-input>
        <el-button
          class="search-button"
          style="text-align:right"
          type="primary"
          size="mini"
          icon="el-icon-search"
          @click="search"
        >Search</el-button>
      </div>
  </div>
</template>

<script>
export default {
  props: {
    downloadLoading: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      input: '',
      isFocus: false
    }
  },
  methods: {
    showAddItem () {
      this.$emit('showAddItem')
    },
    handleDownload () {
      this.$emit('handleDownload')
    },
    refresh () {
      this.$emit('refresh')
    },
    search () {
      this.$emit('search', this.input)
    }
  },
  watch: {
    input (newVal, oldVal) {
      if (oldVal !== '' && newVal === '') {
        this.$emit('search', '')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.actionButton {
  display: flex;
  justify-content: space-between;
  .search-button {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
  .search-input {
    transition: all 0.3s ease-in;
    >>> .el-input__inner {
      outline: none;
      border-top-right-radius: 0px !important;
      border-bottom-right-radius: 0px !important;
    }
  }
}
</style>
