<template>
    <div class="search-container">
      <a-form-model layout="inline" :model="searchForm" @submit="handleSubmit" @submit.native.prevent class="form">
        <div class="flex-item">
          <a-form-model-item label="检索关键字">
            <a-input class="search-item" v-model="searchForm.searchWord" placeholder="搜索关键字" />
          </a-form-model-item>
          <a-form-model-item label="商品类目">
            <a-select
              show-search
              placeholder="请选择商品类目"
              class="search-item"
              @change="handleSelectChange"
              allowClear
            >
              <a-select-option v-for="c in data" :value="c.id" :key="c.id">
                {{ c.name }}
              </a-select-option>
            </a-select>
          </a-form-model-item>
        </div>
        <div class="flex-item">
          <a-form-item>
            <a-button type="primary" html-type="submit">
              搜索
            </a-button>
          </a-form-item>
        </div>
      </a-form-model>
      <div class="add-product">
        <a-button @click="handleAddProduct">
          <Router-link :to="{ name: 'ProductAdd' }">新增商品</Router-link>
        </a-button>
      </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
          searchForm: {
            searchWord: "",
            category: "",
          },
        };
    },
    props: ["data"],
    methods: {
        // 提交表单的时候触发的函数
        handleSubmit() {
          this.$emit("submit", this.searchForm)
        },
        // 切换类目触发的函数
        handleSelectChange(value) {
          this.searchForm.category = value;
        },
        handleAddProduct(){
          console.log("新增商品!!!")
        }
    },
}
</script>

<style scoped lang="less">
.search-container{
  padding: 10px;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  .search-item{
    width: auto;
    min-width: 160px;
  }
  .flex-item{
    display: flex;
    .ant-form-item{
      margin-bottom: 10px;
      display: flex;
      &:first-of-type{
        margin-right: 3rem;
        margin-left: 1rem;
      }
    }
    &:last-of-type > .ant-form-item{
      margin: 0;
    }
  }
  .add-product{
    margin-top: 4px;
  }
}
</style>