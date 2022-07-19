<template>
    <div class="login-container">
        <div class="login-content">
            <div class="content-top">
                <div class="logo">
                    <el-icon :size="46"><Logo1 /></el-icon>
                </div>
                <div class="desc">
                    element-plus 后台模版
                </div>
            </div>
            <div class="content-form">
                <el-tabs v-model="activeName" stretch @tab-click="handleClickTab">
                    <el-tab-pane
                        v-for="item in tabs" :key="item.name" :name="item.name" :label="item.label" />
                </el-tabs>
                <el-form
                    ref="ruleFormRef"
                    :model="ruleForm"
                    :rules="rules"
                    size="large"
                    >
                    <el-form-item prop="username">
                        <el-input v-model="ruleForm.username" :prefix-icon="User" />
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input v-model="ruleForm.password" :prefix-icon="Lock" :type="currentPsd.type">
                            <template #suffix>
                                <el-icon :size="14" style="cursor: pointer;">
                                    <component :is="currentPsd.icon" @click="psdToggle = !psdToggle" />
                                </el-icon>
                            </template>
                        </el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-checkbox v-model="ruleForm.checked" label="自动登录" />
                    </el-form-item>
                    <el-form-item>
                        <div class="flex-item">
                            <a href="javascript:">忘记密码</a>
                            <a href="javascript:">注册</a>
                        </div>
                    </el-form-item>
                    <el-form-item>
                        <span>账号：admin，</span>
                        <span>密码随便填</span>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm(ruleFormRef)"
                            :loading="loading" style="width: 100%;">登录</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '@/store/modules/user'
import { ElMessage }  from 'element-plus'
import type { TabsPaneContext, FormInstance, FormRules } from 'element-plus'
import { Logo1, EyeOutline, EyeOffOutline } from '@/icons/'
import { userEnum } from '@/enums/userEnum'
import { User, Lock } from "@element-plus/icons-vue";

export default defineComponent({
    name: 'Login',
    components: {
        Logo1,
        EyeOutline,
        EyeOffOutline,
    },
    setup(){
        const $route = useRoute();
        const $router = useRouter();
        const userStore = useUserStore();
        /* 密码icon/type切换 */
        const psdList = [
            { icon: 'EyeOutline', type: 'password' },
            { icon: 'EyeOffOutline', type: 'text' }
        ];
        const psdToggle = ref(false);
        const currentPsd = computed(() => psdList[Number(psdToggle.value)]);
        /* tab */
        const tabs = [
            { label: '个人用户', name: userEnum.user1 },
            { label: '组织用户', name: userEnum.user2 },
            { label: '后台', name: userEnum.system }
        ]
        const activeName = computed({
            get: () => userStore.user_type,
            set: (val) => userStore.setUserType(val as string)
        });
        function handleClickTab(tab: TabsPaneContext) {
            activeName.value = tab.paneName as string;
        }
        /* form */
        const loading = ref(false);
        const ruleFormRef = ref<FormInstance>();
        const ruleForm = reactive({
            username: 'admin',
            password: '123456',
            checked: true,// 自动登录
        });
        const rules = reactive<FormRules>({
            username: [
                { required: true, message: '请输入用户名', trigger: 'blur' },
            ],
            password: [
                { required: true, message: '请输入密码', trigger: 'blur' },
            ]
        });
        const submitForm = async (formEl: FormInstance | undefined) => {
            if (!formEl) return
            await formEl.validate(async (valid, fields) => {
                if (valid) {
                    const { username, password } = ruleForm;
                    const message = ElMessage.info({
                        message: '登录中...',
                        duration: 0
                    });
                    loading.value = true;
                    try {
                        const res = await userStore.login({ username, password });
                        if(res){
                            const path = decodeURIComponent($route.query?.redirect as string || '/');
                            ElMessage.success('登录成功，即将进入系统');
                            $router.replace(path);
                        }
                    } finally {
                        loading.value = false;
                        message.close();
                    }
                } else {
                    ElMessage.warning('请填写完整信息，并且进行验证码校验');
                    console.log(fields);
                }
            })
        }
        /* 切换 */
        return {
            activeName,
            tabs,
            ruleFormRef,
            ruleForm,
            rules,
            loading,
            User,
            Lock,
            psdToggle,
            currentPsd,
            handleClickTab,
            submitForm,
        }
    }
})
</script>
<style lang="scss" scoped>
.login-container{
    display: flex;
    flex-direction: column;
    height: 100vh;
    overflow: auto;
    .login-content{
        flex: 1;
        padding: 32px 0;
        width: 384px;
        margin: 0 auto;
    }
    .content-top{
        padding: 32px 0;
        text-align: center;
        .logo{
            .el-icon{
                margin: 1rem auto;
            }
        }
        .desc{
            font-size: 18px;
            color: #fff;
            text-shadow: 1px 1px 1px rgba(1,1,1,.5);
        }
    }
    .content-form{
        background-color: #FFF;
        padding: 20px 24px;
        .flex-item{
            width: 100%;
            display: flex;
            justify-content: space-between;
        }
    }
}
.login-container {
    background-image: url('../../assets/background/confetti-doodles.svg');
    background-repeat: no-repeat;
    background-position: 50%;
    background-size: cover;
    .login-content {
        padding: 32px 0 24px 0;
    }
}
</style>