<template>
  <div class="product-list-container">

    <Search @submit="handleSubmit" :data="categoryList" />
    
    <ProductTable :data="tableData" :page="page" :loading="loading" @change="changePage" @edit="handleEdit" @remove="handleRemove"/>

  </div>
</template>

<script>
import Search from "@/components/Search.vue";
import ProductTable from "@/components/ProductTable.vue";
import { getProducts, removeProduct } from "@/api/product.js";
import { getCategories } from "@/api/category.js";
export default {
    components: {
        Search,
        ProductTable,
    },
    data() {
        return {
            searchForm: {},// 搜索表单数据
            tableData: [],// 列表数据
            categoryList: [],// 类目数据
            page: {// 分页数据
                current: 1,
                pageSize: 10,
                total: 1,
                showSizeChanger: true,
                showQuickJumper: true
            },
            loading: false,// 是否在加载
            categoryObj: {},
        };
    },
    async created(){
        await this.fetchCategoryData();
        await this.fetchTableData();
    },
    methods: {
        // 加载列表数据
        async fetchTableData(){
            this.loading = true;
            const resp = await getProducts({
                page: this.page.current, 
                size: this.page.pageSize,
                ...this.searchForm,
            });
            this.page.total = resp.total;
            this.tableData = resp.data.map((item) => ({
                ...item,
                categoryName: this.categoryObj[item.category].name
            }));
            this.loading = false;
        },
        // 加载类目数据
        async fetchCategoryData(){
            const resp = await getCategories();
            this.categoryList = resp.data;
            resp.data.forEach((item) =>{
                this.categoryObj[item.id] = item;
            })
        },
        // 点击搜索
        async handleSubmit(form){
            this.searchForm = form;
            await this.fetchTableData();
        },
        // 翻页
        async changePage(page){
            this.page = page;
            await this.fetchTableData()
        },
        // 编辑
        handleEdit(record){
            this.$router.push({
                name: "ProductEdit",
                params: {
                    id: record.id
                }
            })
        },
        // 删除
        handleRemove(record){
            this.$confirm({
                title: '确认删除?',
                content: () => <div style="color">{`您是否想要删除：${record.title} ?`}</div>,
                onOk: async () => {
                    console.log("删除" + record.id)
                    await removeProduct(record.id);
                    await this.fetchTableData();
                },
                onCancel() {
                    console.log("取消删除")
                },
            });
        }
    },
}
</script>

<style scoped lang="less">
.product-table-container{
    .btns{
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
        .ant-btn:first-of-type{
            margin-bottom: 2px;
        }
    }
    .imgs {
        border-radius: 5px;
        overflow: hidden;
        display: block;
        width: 100%;
        height: 100%;
        img{
            width: 80px;
            height: 80px;
            object-fit: cover;
        }
    }
    .pagin-container{
        margin: 10px;
        text-align: right;
    }
}
</style>