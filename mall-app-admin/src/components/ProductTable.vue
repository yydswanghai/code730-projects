<template>
    <div class="product-table-container">
        <a-table 
            :columns="columns" 
            :data-source="tableData" 
            :row-selection="rowSelection"
            :scroll="{y: 560}"
            :pagination="page"
            :loading="loading"
            @change="changePage"
        >

            <span slot="tags" slot-scope="tags">
                <a-tag
                    v-for="tag in tags"
                    :key="tag"
                    :color="tagColor(tag)" >
                    {{ tag.toUpperCase() }}
                </a-tag>
            </span>

            <span slot="image" slot-scope="text, recode" class="imgs">
                <img :src="recode.images[0]" />
            </span>

            <span slot="action" slot-scope="text, record" class="btns">
                <a-button type="primary" @click="editProduct(record)">
                    编辑
                </a-button>
                 <a-button type="danger" @click="removeProduct(record)">
                    删除
                </a-button>
            </span>

        </a-table>
    </div>
</template>



<script>

const columns = [
    {
        title: 'ID',// 列头显示文字
        dataIndex: 'id',// 列数据在数据项中对应的 key
        key: 'id',// Vue 需要的 key。如果没有使用 template 风格的 API，且已经设置了唯一的 dataIndex，可以忽略这个属性
        width: 80,// 列宽度
    },
    {
        title: '图片',
        dataIndex: 'image',
        key: 'image',
        scopedSlots: { customRender: 'image' },// 可以通过该属性配置支持 slot-scope 的属性
        width: 120,
    },
    {
        title: '标题',
        dataIndex: 'title',
        key: 'title',
        width: 200,
    },
    {
        title: '描述',
        dataIndex: 'desc',
        key: 'desc',
        width: 120,
    },
    {
        title: '类目',
        dataIndex: 'categoryName',
        key: 'category',
        width: 90,
        
    },
    {
        title: '预售价格',
        dataIndex: 'price',
        key: 'price',
        width: 90,
    },
    {
        title: '折扣价格',
        dataIndex: 'price_off',
        key: 'price_off',
        width: 90,
    },
    {
        title: '标签',
        key: 'tags',
        dataIndex: 'tags',
        scopedSlots: { customRender: 'tags' },
        width: 120,
    },
    {
        title: '限制购买数量',
        dataIndex: 'inventory',
        key: 'inventory',
        width: 120,
    },
     {
        title: '上架状态',
        dataIndex: 'status',
        key: 'status',
        width: 90,
        customRender(text, recode){
            return recode.status === 1 ? '上架' : '下架';
        }
    },
    {
        title: '操作',
        key: 'action',
        scopedSlots: { customRender: 'action' },
    },
];

const rowSelection = {
    onChange: (selectedRowkeys, selectedRows) => {
        console.log(`选中行的keys : ${selectedRowkeys}`, `selectedRows: `, selectedRows)
    },
    // onSelect: (record, selected, selectedRows) => {
    //     console.log(record, selected, selectedRows);
    // },
    // onSelectAll: (selected, selectedRows, changeRows) => {
    //     console.log(selected, selectedRows, changeRows);
    // },
}

export default {
    data() {
        return {
            columns,// 表格列的配置描述
            rowSelection,// 多选/反选
        };
    },
    props: ["data", "page", "loading"],
    computed: {
        tableData(){
            return this.data.map((item) => ({
                ...item,
                key: item.id
            }))
        }
    },
    methods: {
        // 标签颜色
        tagColor(tag){
            if(tag === "热销" || tag.includes("限时")){
                return 'volcano'
            }
            else if(tag.includes("包邮")){
                return 'green'
            }
            else{
                return 'geekblue'
            }
        },
        // 翻页
        changePage(page){
            this.$emit("change", page);
        },
        // 编辑
        editProduct(record){
            this.$emit("edit", record);
        },
        // 删除
        removeProduct(record){
            this.$emit("remove", record);
        }
    }
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