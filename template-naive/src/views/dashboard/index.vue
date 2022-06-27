<template>
    <div class="dashboard-container">
        <NGrid cols="1 s:2 m:3 l:4 xl:4 2xl:4" responsive="screen" :x-gap="12" :y-gap="8">
            <NGridItem>
                <NCard title="访问量" :segmented="{ content: 'hard', footer: 'hard' }" size="small" :bordered="false">
                    <template #header-extra>
                        <NTag type="success">日</NTag>
                    </template>
                    <div class="py-1 px-1 flex justify-between">
                        <NSkeleton v-if="loading" :width="100" size="medium" />
                        <span v-else class="text-3xl">35,090</span>
                    </div>
                    <div class="py-1 px-1 flex justify-between">
                        <div class="text-sn">
                            <NSkeleton v-if="loading" :width="100" size="medium" />
                            <template v-else>
                                日同比
                                <span>16%</span>
                                <NIcon size="12" color="#00ff6f"><CaretUpOutlined /></NIcon>
                            </template>
                        </div>
                        <div class="text-sn">
                            <NSkeleton v-if="loading" :width="100" size="medium" />
                            <template v-else>
                                周同比
                                <span>36%</span>
                                <NIcon size="12" color="#ffde66"><CaretDownOutlined /></NIcon>
                            </template>
                        </div>
                    </div>
                    <template #footer>
                        <div class="flex justify-between">
                            <NSkeleton v-if="loading" text :repeat="2" />
                            <template v-else>
                                <div class="text-sn"> 总访问量： </div>
                                <div class="text-sn"><span>109,256</span></div>
                            </template>
                        </div>
                    </template>
                </NCard>
            </NGridItem>
            <NGridItem>
                <NCard title="销售额" :segmented="{ content: 'hard', footer: 'hard' }" size="small" :bordered="false">
                    <template #header-extra>
                        <NTag type="info">周</NTag>
                    </template>
                    <div class="py-1 px-1 flex justify-between">
                        <NSkeleton v-if="loading" :width="100" size="medium" />
                        <span v-else class="text-3xl">￥65,266</span>
                    </div>
                    <div class="py-2 px-2 flex justify-between">
                        <div class="text-sn flex-1">
                            <NProgress
                                type="line"
                                :percentage="60"
                                :indicator-placement="'inside'"
                                processing
                            />
                        </div>
                    </div>
                    <template #footer>
                        <div class="flex justify-between">
                            <NSkeleton v-if="loading" text :repeat="2" />
                            <template v-else>
                                <div class="text-sn"> 总销售额： </div>
                                <div class="text-sn"><span>￥716,499</span></div>
                            </template>
                        </div>
                    </template>
                </NCard>
            </NGridItem>
            <NGridItem>
                <NCard title="订单量" :segmented="{ content: 'hard', footer: 'hard' }" size="small" :bordered="false">
                    <template #header-extra>
                        <NTag type="warning">周</NTag>
                    </template>
                    <div class="py-1 px-1 flex justify-between">
                        <NSkeleton v-if="loading" :width="100" size="medium" />
                        <span v-else class="text-3xl">38,164</span>
                    </div>
                    <div class="py-1 px-1 flex justify-between">
                        <div class="text-sn">
                            <NSkeleton v-if="loading" :width="100" size="medium" />
                            <template v-else>
                                日同比
                                <span>96%</span>
                                <NIcon size="12" color="#00ff6f"><CaretUpOutlined /></NIcon>
                            </template>
                        </div>
                        <div class="text-sn">
                            <NSkeleton v-if="loading" :width="100" size="medium" />
                            <template v-else>
                                周同比
                                <span>26%</span>
                                <NIcon size="12" color="#ffde66"><CaretDownOutlined /></NIcon>
                            </template>
                        </div>
                    </div>
                    <template #footer>
                        <div class="flex justify-between">
                            <NSkeleton v-if="loading" text :repeat="2" />
                            <template v-else>
                                <div class="text-sn"> 转化率： </div>
                                <div class="text-sn"><span>248,482%</span></div>
                            </template>
                        </div>
                    </template>
                </NCard>
            </NGridItem>
            <NGridItem>
                <NCard title="成交额" :segmented="{ content: 'hard', footer: 'hard' }" size="small" :bordered="false">
                    <template #header-extra>
                        <NTag type="error">月</NTag>
                    </template>
                    <div class="py-1 px-1 flex justify-between">
                        <NSkeleton v-if="loading" :width="100" size="medium" />
                        <span v-else class="text-3xl">￥25,691</span>
                    </div>
                    <div class="py-1 px-1 flex justify-between">
                        <div class="text-sn">
                            <NSkeleton v-if="loading" :width="100" size="medium" />
                            <template v-else>
                                月同比
                                <span>81%</span>
                                <NIcon size="12" color="#00ff6f"><CaretUpOutlined /></NIcon>
                            </template>
                        </div>
                        <div class="text-sn">
                            <NSkeleton v-if="loading" :width="100" size="medium" />
                            <template v-else>
                                月同比
                                <span>19%</span>
                                <NIcon size="12" color="#ffde66"><CaretDownOutlined /></NIcon>
                            </template>
                        </div>
                    </div>
                    <template #footer>
                        <div class="flex justify-between">
                            <NSkeleton v-if="loading" text :repeat="2" />
                            <template v-else>
                                <div class="text-sn"> 总成交额： </div>
                                <div class="text-sn"><span>￥904,312</span></div>
                            </template>
                        </div>
                    </template>
                </NCard>
            </NGridItem>
        </NGrid>
        <div class="mt-4">
            <NGrid cols="1 s:2 m:3 l:8 xl:8 2xl:8" responsive="screen" :x-gap="16" :y-gap="8">
                <NGridItem v-for="(item, index) in iconList" :key="index">
                    <NCard content-style="padding-top: 0;" size="small" :bordered="false">
                        <template #footer>
                            <NSkeleton v-if="loading" size="medium" />
                            <div class="cursor-pointer" v-else>
                                <p class="flex justify-center">
                                    <span>
                                        <NIcon :size="item.size" class="flex-1" :color="item.color">
                                            <component :is="item.icon" v-on="item.eventObject || {}" />
                                        </NIcon>
                                    </span>
                                </p>
                                <p class="flex justify-center"><span>{{ item.title }}</span></p>
                            </div>
                        </template>
                    </NCard>
                </NGridItem>
            </NGrid>
        </div>
        <div class="mt-4">
            <NRow :gutter="24">
                <NCol :span="24">
                    <NCard content-style="padding: 0;" :bordered="false">
                        <NTabs type="line" size="large" :tabs-padding="20" pane-style="padding: 20px;">
                            <NTabPane name="流量趋势"><FluxTrend /></NTabPane>
                            <NTabPane name="访问量"><VisitAmount /></NTabPane>
                        </Ntabs>
                    </NCard>
                </NCol>
            </NRow>
        </div>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { CaretUpOutlined, CaretDownOutlined, UsergroupAddOutlined, BarChartOutlined,
    ShoppingCartOutlined, AccountBookOutlined, CreditCardOutlined,
    MailOutlined, TagsOutlined, SettingOutlined, } from '@vicons/antd'
import FluxTrend from './components/flux-trend.vue'
import VisitAmount from './components/visit-amount.vue'
export default {
    name: 'DashboardIndex',
    components: {
        CaretUpOutlined,
        CaretDownOutlined,
        UsergroupAddOutlined,
        BarChartOutlined,
        ShoppingCartOutlined,
        AccountBookOutlined,
        CreditCardOutlined,
        MailOutlined,
        TagsOutlined,
        SettingOutlined,
        FluxTrend,
        VisitAmount,
    },
    setup(){
        const loading = ref(true)
        const iconList = [
            {
                icon: UsergroupAddOutlined,
                size: '32',
                title: '用户',
                color: '#69c0ff',
                eventObject: {
                    click: () => {},
                },
            },
            {
                icon: BarChartOutlined,
                size: '32',
                title: '分析',
                color: '#69c0ff',
                eventObject: {
                    click: () => {},
                },
            },
            {
                icon: ShoppingCartOutlined,
                size: '32',
                title: '商品',
                color: '#ff9c6e',
                eventObject: {
                    click: () => {},
                },
            },
            {
                icon: AccountBookOutlined,
                size: '32',
                title: '订单',
                color: '#b37feb',
                eventObject: {
                    click: () => {},
                },
            },
            {
                icon: CreditCardOutlined,
                size: '32',
                title: '票据',
                color: '#ffd666',
                eventObject: {
                    click: () => {},
                },
            },
            {
                icon: MailOutlined,
                size: '32',
                title: '消息',
                color: '#5cdbd3',
                eventObject: {
                    click: () => {},
                },
            },
            {
                icon: TagsOutlined,
                size: '32',
                title: '标签',
                color: '#ff85c0',
                eventObject: {
                    click: () => {},
                },
            },
            {
                icon: SettingOutlined,
                size: '32',
                title: '配置',
                color: '#ffc069',
                eventObject: {
                    click: () => {},
                },
            },
        ]
        onMounted(() => {
            loading.value = false
        })
        return {
            loading,
            iconList,
        }
    }
}

</script>
<style lang="less" scoped>
.dashboard-container{

}
</style>