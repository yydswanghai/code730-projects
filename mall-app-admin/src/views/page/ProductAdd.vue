<template>
  <div class="product-add-container">
     <div>
      <a-steps :current="current" class="steps-tit">
        <a-step v-for="item in steps" :key="item.title" :title="item.title" />
      </a-steps>
      <div class="steps-content">
        <BasicDetail v-if="current === 0" @next="next" :form="form" />
        <SaleDetail v-if="current === 1" @next="next" @prev="prev" :form="form" />
      </div>
    </div>
  </div>
</template>

<script>
import BasicDetail from "@/components/BasicDetail";
import SaleDetail from "@/components/SaleDetail";
import { addProduct, detail, editProduct } from "@/api/product"
export default {
  components: {
    BasicDetail,
    SaleDetail,
  },
  data() {
    return {
      current: 0,
      steps: [
        {
          title: '填写商品基本信息',
        },
        {
          title: '填写商品销售信息',
        }
      ],
      form: {
        title: '',
        desc: '',
        category: '',
        c_items: [],
        tags: [],
        price: 0,
        price_off: 0,
        inventory: 0,
        unit: '',
        images: [],
      }
    };
  },
  async created(){
    const { id } = this.$route.params;
    // 判断是编辑还是添加
    if(id){// 编辑
      const resp = await detail(id);
      this.form = resp;
    }
  },
  methods: {
    async next(form) {
      // 保存子组件传递过来的form到当前的form
      this.form = {
        ...this.form,
        form,
      }
      if(this.current === 1){
        // 提交数据
        if(this.$route.params.id){// 判断是编辑还是添加 - 编辑
          const resp = await editProduct(this.form);
          this.$message.success("修改成功!");
          this.$router.push({
            name: "ProductList"
          })
        }else{
          const resp = await addProduct(this.form);
          this.$message.success("添加成功!");
          this.$router.push({
            name: "ProductList"
          })
        }
      }else{
        this.current += 1;
      }
    },
    prev() {
      this.current -= 1;
    },
  },
}
</script>

<style scoped lang="less">
.product-add-container{
  .steps-tit{
    width: 50%;
    margin: 50px auto;
  }
  .steps-content {
    margin-top: 16px;
    border: 1px dashed #e9e9e9;
    border-radius: 6px;
    background-color: #fafafa;
    min-height: 200px;
    text-align: center;
    padding-top: 80px;
  }
  .steps-action {
    margin-top: 24px;
  }
}
</style>