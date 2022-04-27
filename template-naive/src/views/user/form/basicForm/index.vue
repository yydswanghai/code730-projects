<template>
    <div class="basic-form-container">
        <div class="n-layout-page-header">
            <NCard :bordered="false" title="基础表单">
                表单页用于向用户收集或验证信息，基础表单常见于数据项较少的表单场景。表单域标签也可支持响应式。
            </NCard>
            <NCard :bordered="false" class="mt-4 proCard">
                <NGrid cols="1 s:1 m:3 l:3 xl:3 2xl:3" responsive="screen">
                    <NGridItem offset="0 s:0 m:1 l:1 xl:1 2xl:1">
                        <NForm
                            :label-width="80"
                            :model="formValue"
                            :rules="rules"
                            label-placement="left"
                            ref="formRef"
                            class="py-8"
                        >
                            <NFormItem label="姓名" path="name">
                                <NInput v-model:value="formValue.name" placeholder="输入姓名" />
                            </NFormItem>
                            <NFormItem label="电话号码" path="mobile">
                                <NInput v-model:value="formValue.mobile" placeholder="电话号码" />
                            </NFormItem>
                            <NFormItem label="时间" path="datetime">
                                <NInput v-model:value="formValue.datetime" type="datetime" />
                            </NFormItem>
                            <NFormItem label="性别" path="sex">
                                <NRadioGroup v-model:value="formValue.sex" name="sex">
                                    <NSpace>
                                        <NRadio :value="1">男</NRadio>
                                        <NRadio :value="2">女</NRadio>
                                    </NSpace>
                                </NRadioGroup>
                            </NFormItem>
                            <NFormItem label="预约备注" path="remark">
                                <NInput
                                    v-model:value="formValue.remark"
                                    type="textarea"
                                    placeholder="请输入预约备注"
                                />
                            </NFormItem>
                            <div style="margin-left: 80px">
                                <NSpace>
                                    <NButton type="primary" @click="formSubmit">提交预约</NButton>
                                    <NButton @click="resetForm">重置</NButton>
                                </NSpace>
                            </div>
                        </NForm>
                    </NGridItem>
                </NGrid>
            </NCard>
        </div>
    </div>
</template>

<script>
import { ref, reactive, toRefs } from 'vue'
import { useMessage } from 'naive-ui'
export default {
    name: 'BasicForm',
    setup(){
        const formRef = ref(null)
        const $message = useMessage()
        const defaultValueRef = () => ({
            name: '',
            mobile: '',
            datetime: [],
            sex: 1,
            remark: '',
        })
        let formValue = reactive(defaultValueRef())

        const rules = {
            name: { required: true, message: '请输入姓名', trigger: 'blur' },
            mobile: { required: true, message: '请输入电话号码', type: 'number', trigger: ['input'] },
            datetime: { required: true, message: '请选择时间', trigger: ['blur', 'change'] },
            remark: { required: true, message: '请输入预约备注', trigger: 'blur' }
        }

        function formSubmit() {
            formRef.value.validate((errors) => {
                if (!errors) {
                    message.success('验证成功');
                } else {
                    message.error('验证失败，请填写完整信息');
                }
            })
        }

        function resetForm() {
            formRef.value.restoreValidation();
            formValue = Object.assign(unref(formValue), defaultValueRef());
        }
        return{
            formRef,
            formValue,
            rules,
            formSubmit,
            resetForm,
        }
    }
}

</script>
<style lang="less" scoped>
.basic-form-container{
    
}
</style>