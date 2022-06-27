<template>
  <div class="sale-detail-container">
    <a-form-model
        ref="ruleForm"
        :model="form"
        :rules="rules"
        :label-col="{ span: 4 }"
        :wrapper-col="{ span: 14 }"
        >
        <a-form-model-item label="商品售价" prop="price">
            <a-input v-model="form.price" />
        </a-form-model-item>
        <a-form-model-item label="折扣价" prop="price_off">
            <a-input v-model="form.price_off" />
        </a-form-model-item>
         <a-form-model-item label="商品库存" prop="inventory">
            <a-input v-model="form.inventory" />
        </a-form-model-item>
         <a-form-model-item label="计量单位" prop="unit">
            <a-input v-model="form.unit" />
        </a-form-model-item>
         <a-form-model-item label="商品相册" prop="images">
            <a-upload
                :action="'https://mallapi.duyiedu.com/upload/images?appkey=' + user.appkey"
                list-type="picture-card"
                :file-list="fileList"
                @preview="handlePreview"
                @change="handleChange"
                name="avatar"
            >
                <div v-if="fileList.length < 8">
                    <a-icon type="plus" />
                    <div class="ant-upload-text">上传</div>
                </div>
            </a-upload>
            <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
                <img alt="example" style="width: 100%" :src="previewImage" />
            </a-modal>
        </a-form-model-item>
        <a-form-model-item label="" :wrapperCol="{ span: 24 }">
            <a-button type="default" @click="prev">上一步</a-button>
            <a-button type="primary" @click="next" class="success">完成</a-button>
        </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script>
import { mapState } from "vuex";

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}
export default {
    data(){
        return {
            rules: {
                price: [
                    { required: true, message: '请填写商品售价', trigger: 'blur' },
                ],
                price_off: [
                    { required: false, message: '请填写商品售价', trigger: 'blur' },
                ],
                inventory: [
                    { required: true, message: '请填写商品库存', trigger: 'blur' },
                ],
                unit: [
                    { required: true, message: '请选择计量单位', trigger: 'blur' },
                ],
                images: [
                    { required: false, message: '请填写商品相册', trigger: 'blur' },
                ]
            },
            fileList: [],
            previewVisible: false,
            previewImage: '',
        }
    },
    props: ["form"],
    computed: {
        ...mapState("loginUser", ["user"])
    },
    created(){
        if(this.form.images.length > 0){
            this.fileList = this.form.images.map((item, index) => ({
                uid: index,
                name: `image-${index}.png`,
                status: 'done',
                url: item,
            }))
        }
    },
    methods: {
        // 点击文件链接或预览图标时的回调
        async handlePreview(file) {
            if (!file.url && !file.preview) {
                file.preview = await getBase64(file.originFileObj);
            }
            this.previewImage = file.url || file.preview;
            this.previewVisible = true;
        },
        // 上传文件改变时的状态，
        handleChange({ file ,fileList }){
            if(file.status === "done"){// 将图片插入到 form.images 数组里
                this.form.images.push(file.response.data.url);
            }
            else if(file.status === "removed"){
                const url = file.response.data.url;
                this.form.images = this.form.images.filter(item => item !== url)
            }
            this.fileList = fileList;
        },
        handleCancel() {
            this.previewVisible = false;
        },
        next(){
            this.$refs.ruleForm.validate(valid => {
                if (valid) {
                    this.$emit("next", this.form);
                    return true;
                } else {
                    console.log('填写商品销售信息 error submit!!');
                    return false;
                }
            });
        },
        prev(){
            this.$emit("prev");
        },
    }
}
</script>

<style scoped lang="less">
.sale-detail-container{
    .success{
        margin-left: 10px;
    }
}
</style>