<template>
  <div class="basic-detail-container">
    <a-form-model
        ref="ruleForm"
        :model="form"
        :rules="rules"
        :label-col="{ span: 4 }"
        :wrapper-col="{ span: 14 }"
    >
        <a-form-model-item label="标题" prop="title">
            <a-input v-model="form.title" />
        </a-form-model-item>
        <a-form-model-item label="商品描述" prop="desc">
            <a-input v-model="form.desc" />
        </a-form-model-item>
        <a-form-model-item label="商品类目" prop="category">
            <a-select v-model="form.category" placeholder="请选择商品类目"  @change="handleCategory">
                <a-select-option v-for="c in categoryList" :key="c.id" :value="c.id">{{ c.name }}</a-select-option>
            </a-select>
            <a-select v-model="form.c_item" placeholder="请选择子类目">
                <a-select-option v-for="c in categoryItems" :key="c" :value="c">{{ c }}</a-select-option>
            </a-select>
        </a-form-model-item>    
        <a-form-model-item label="商品标签" prop="tags">
            <a-select
            mode="tags"
            placeholder="Please select"
            :default-value="['包邮，最晚次日达']"
            v-model="form.tags"
            >
                <a-select-option value="包邮，最晚次日达">包邮，最晚次日达</a-select-option>
            </a-select>
        </a-form-model-item>
        <a-form-model-item label="" :wrapperCol="{ span: 24 }">
            <a-button type="primary" @click="next">下一步</a-button>
        </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script>
import { getCategories } from "@/api/category.js";
export default {
    data(){
        return {
            categoryList: [],
            categoryItems: [],
            rules: {
                title: [
                    { required: true, message: '请填写标题', trigger: 'blur' },
                ],
                desc: [
                    { required: false, message: '请填写商品描述', trigger: 'blur' },
                ],
                category: [
                    { required: true, message: '请选择商品类目', trigger: 'blur' },
                ],
                tags: [
                    { required: true, message: '请填写商品标签', trigger: 'blur' },
                ]
            },
        }
    },
    props: ["form"],
    async created(){
        const resp = await getCategories();
        this.categoryList = resp.data
    },
    methods: {
        handleCategory(categoryId){
            this.categoryItems = [];
            for(let i = 0;i < this.categoryList.length;i += 1){
                if(this.categoryList[i].id === categoryId){
                    this.categoryItems = this.categoryList[i].c_items
                }
            }
        },
        next(){
            this.$refs.ruleForm.validate(valid => {
                if (valid) {
                    this.$emit("next", this.form);
                    return true;
                } else {
                    console.log('填写商品基本信息 error submit!!');
                    return false;
                }
            });
        }
    }
}
</script>

<style scoped lang="less">
.basic-detail-container{
}
</style>