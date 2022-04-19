<template>
    <div class="login-container">
        <div class="content">
            <div class="top">
                <div class="logo">
                    <img src="~@/assets/images/account-logo.png" alt="" />
                </div>
                <div class="desc">
                    naive-ui-admin 中台前端 **系统
                </div>
            </div>
            <div class="form">
                <NForm
                    ref="formRef"
                    label-placement="left"
                    size="large"
                    :model="formValue"
                    :rules="rules"
                    >
                    <NFormItem path="username">
                        <NInput v-model:value="formValue.username" placeholder="请输入用户名">
                            <template #prefix>
                                <NIcon size="18" color="#808695">
                                    <PersonOutline />
                                </NIcon>
                            </template>
                        </NInput>
                    </NFormItem>
                    <NFormItem path="password">
                        <NInput v-model:value="formValue.password" type="password" placeholder="请输入密码" showPasswordOn="click">
                            <template #prefix>
                                <NIcon size="18" color="#808695">
                                    <LockClosedOutline />
                                </NIcon>
                            </template>
                        </NInput>
                    </NFormItem>
                    <NFormItem class="default-color">
                        <div class="flex justify-between">
                            <div class="flex-initial">
                                <NCheckbox v-model:checked="autoLogin">自动登录</NCheckbox>
                            </div>
                            <div class="flex-initial order-last">
                                <a href="javascript:">忘记密码</a>
                            </div>
                        </div>
                    </NFormItem>
                    <NFormItem class="default-color">
                        <div class="flex justify-between">
                            <div class="flex-initial">
                                <span>账号：admin，密码随便填</span>
                            </div>
                        </div>
                    </NFormItem>
                    <NFormItem>
                        <NButton type="primary" @click="handleSubmit" size="large" :loading="loading" block>
                            登录
                        </NButton>
                    </NFormItem>
                </NForm>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, reactive } from 'vue'
import { useMessage } from 'naive-ui'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '@/store/modules/user'
import { PersonOutline, LockClosedOutline } from '@vicons/ionicons5'
export default {
    name: 'Login',
    components: {
        PersonOutline,
        LockClosedOutline,
    },
    setup(){
        const $message = useMessage()
        const $route = useRoute()
        const $router = useRouter()
        const userStore = useUserStore()
        const formRef = ref(null)
        const formValue = reactive({
            username: 'admin',
            password: '123456',
            isCaptcha: true,
        })
        const rules = {
            username: { required: true, message: '请输入用户名', trigger: 'blur' },
            password: { required: true, message: '请输入密码', trigger: 'blur' },
        }
        const autoLogin = ref(true)
        const loading = ref(false)
        function handleSubmit(e) {
            e.preventDefault()
            formRef.value?.validate(async (errors) => {
                if(!errors){
                    const { username, password } = formValue
                    $message.loading('登录中...')
                    loading.value = true

                    try {
                        const { msg, code } = await userStore.login({ username, password })
                        $message.destroyAll()
                        if(msg === 'OK'){
                            const path = decodeURIComponent($route.query?.redirect || '/')
                            $message.success('登录成功，即将进入系统')
                            if($route.name === 'Login'){
                                $router.replace('/')
                            }else{
                                $router.replace(path)
                            }
                        }else{
                            $message.info(msg || '登录失败')
                        }
                    } finally {
                        loading.value = false
                    }
                }else{
                    $message.error("请填写完整信息，并且进行验证码校验");
                }
            })
        }

        return {
            formRef,
            formValue,
            rules,
            autoLogin,
            loading,
            handleSubmit,
        }
    }
}
</script>

<style lang="less" scoped>
.login-container{
    display: flex;
    flex-direction: column;
    height: 100vh;
    overflow: auto;
    .content{
        flex: 1;
        padding: 32px 0;
        width: 384px;
        margin: 0 auto;
    }
    .top{
        padding: 32px 0;
        text-align: center;
        .logo{

        }
        .desc{
            font-size: 14px;
            color: #808695;
        }
    }
    .form{
        .default-color{
            color: #515a6e;
        }
    }
}
@media (min-width: 768px) {
    .login-container {
        background-image: url('../../assets/images/login-bg.svg');
        background-repeat: no-repeat;
        background-position: 50%;
        background-size: 100%;
        .content {
            padding: 32px 0 24px 0;
        }
    }
}
</style>