import Mock from 'mockjs'

export default [
    {
        url: '/api/auth/oauth/token',
        timeout: 1000,
        method: 'post',
        response: (options) => {
            const { headers, body, query } = options
            const { username, password } = body
            const { grant_type, scope } = query

            let code = 200
            let data = {
                expires_in: 7199,
                token_type: "bearer"
            }
            let msg = ''
            if(!headers.authorization){
                code = 401
                data = null
                msg = 'null'
            }
            if(scope === 'app'){
                // 前台用户
                data = {
                    ...data,
                    access_token: "7dd50837-d723-4e34-bc5a-5c3d0786487a",
                    refresh_token: "1d8113c8-bef1-4378-8ad1-33b23b2ea146",
                    clientId: "app_person_user",
                    scope: "app"
                }
            }else if(scope === 'server'){
                // 后台用户
                data = {
                    ...data,
                    access_token: "80768e78-f985-4b16-b351-bce45d189daa",
                    refresh_token: "dfaf78d9-a023-425c-b6b0-e792ddec282f",
                    clientId: "pc_manage",
                    scope: "server"
                }
            }
            // 验证用户
            if(username && username === 'admin'){
                code = 200
                msg = 'OK'
            }else{
                code = 500
                data = 'invalid_exception'
                msg = '用户名或密码错误'
            }
            return Mock.mock({
                code,
                data,
                msg,
            })
        }
    },
    {
        url: '/api/upms/appPersonUser/getLoginInfo',
        timeout: 1000,
        method: 'get',
        response: (options) => {
            const { headers } = options
            if(headers.authorization){
                return Mock.mock({
                    code: 200,
                    data: {
                        appUser: {
                            createBy: null,
                            createTime: "2022-02-21 15:51:11",
                            delFlag: 0,
                            idCard: "F4416C73D202CEB99D22E9B54C3D46F80D7EDEA75BE76BE0F08057B1FEBDDC98",
                            lockFlag: 0,
                            name: "张三",
                            password: "",
                            phone: "15572151179",
                            sex: 1,
                            updateBy: null,
                            updateTime: "2022-03-23 15:48:18",
                            userId: "5",
                        },
                        permissions: null
                    },
                    msg: 'OK'
                })
            }
        }
    },
    {
        url: '/api/upms/appCollectiveUser/getLoginInfo',
        timeout: 1000,
        method: 'get',
        response: (options) => {
            const { headers } = options
            if(headers.authorization){
                return Mock.mock({
                    code: 200,
                    data: {
                        appUser: {
                            createBy: null,
                            createTime: "2022-04-01 10:50:56",
                            delFlag: 0,
                            lockFlag: 0,
                            name: "李四",
                            password: "",
                            phone: "15572151179",
                            updateBy: null,
                            updateTime: "2022-04-01 10:51:31",
                            userId: "14",
                        },
                        permissions: null
                    },
                    msg: 'OK'
                })
            }
        }
    },
    {
        url: '/api/upms/sysOrg/getLoginInfo',
        timeout: 1000,
        method: 'get',
        response: (options) => {
            const { headers } = options
            if(headers.authorization){
                return Mock.mock({
                    code: 200,
                    data: {
                        sysOrg: {
                            accountSource: 1,
                            createBy: "6",
                            createTime: "2022-03-01 19:06:53",
                            delFlag: 0,
                            level: 3,
                            lockFlag: 0,
                            orgCode: null,
                            orgDesc: null,
                            orgId: "11",
                            orgName: "admin-org",
                            parentOid: "6",
                            password: "",
                            permCode: "0001000100010001",
                            permNo: "0001",
                            phone: null,
                            sourceFullname: null,
                            sourceId: null,
                            updateBy: "6",
                            updateTime: "2022-03-01 19:06:53",
                            username: "admin",
                        },
                        permissions: [
                            'sys_org_add', 'sys_org_detail', 'commend_add',
                            'commend_detail', 'sys_org_edit', 'sys_org_del',
                            'commend_to_examine', 'commend_edit', 'commend_del'
                        ]
                    },
                    msg: 'OK'
                })
            }
        }
    },
    {
        url: '/api/auth/token/logout',
        timeout: 1000,
        method: 'delete',
        response: () => {
            return Mock.mock({
                code: 200,
                data: null,
                msg: 'OK'
            })
        }
    },
    {
        url: '/api/upms/sysMenu/getUserMenu',
        timeout: 1000,
        method: 'get',
        response: (options) => {
            const { headers } = options
            if(headers.authorization){
                return Mock.mock({
                    code: 200,
                    data: [
                        {
                            id: "1000",
                            name: "表彰管理",
                            label: "表彰管理",
                            keepAlive: "0",
                            icon: "AppstoreFilled",
                            parentId: "-1",
                            path: "/commend-management",
                            routeName: "commend-management",
                            sortOrder: 1000,
                            type: "0",
                            permission: null,
                            weight: 1000,
                            children: [
                                {
                                    id: "1010",
                                    name: "新增表彰",
                                    label: "新增表彰",
                                    keepAlive: "0",
                                    icon: null,
                                    parentId: "1000",
                                    path: "/commend-management/add",
                                    routeName: "commend-management-add",
                                    sortOrder: 1010,
                                    type: "1",
                                    permission: "commend_add",
                                    weight: 1010,
                                },
                                {
                                    id: "1020",
                                    name: "编辑表彰",
                                    label: "编辑表彰",
                                    keepAlive: "0",
                                    icon: null,
                                    parentId: "1000",
                                    path: "/commend-management/edit",
                                    routeName: "commend-management-edit",
                                    sortOrder: 1020,
                                    type: "1",
                                    permission: "commend_edit",
                                    weight: 1020,
                                },
                                {
                                    id: "1030",
                                    name: "表彰明细",
                                    label: "表彰明细",
                                    keepAlive: "0",
                                    icon: null,
                                    parentId: "1000",
                                    path: "/commend-management/detail",
                                    routeName: "commend-management-detail",
                                    sortOrder: 1030,
                                    type: "1",
                                    permission: "commend_detail",
                                    weight: 1030,
                                }
                            ]
                        },
                        {
                            id: "2000",
                            name: "组织管理",
                            label: "组织管理",
                            keepAlive: "0",
                            icon: "GoldenFilled",
                            parentId: "-1",
                            path: "/organization-management",
                            routeName: "organization",
                            sortOrder: 2000,
                            type: "0",
                            permission: null,
                            weight: 2000,
                            children: [
                                {
                                    id: "2010",
                                    name: "新增组织",
                                    label: "新增组织",
                                    keepAlive: "0",
                                    icon: null,
                                    parentId: "2000",
                                    path: "/organization-management/add",
                                    routeName: "organization-management-add",
                                    sortOrder: 2010,
                                    type: "1",
                                    permission: "sys_org_add",
                                    weight: 2010,
                                },
                                {
                                    id: "2020",
                                    name: "编辑组织",
                                    label: "编辑组织",
                                    keepAlive: "0",
                                    icon: null,
                                    parentId: "2000",
                                    path: "/organization-management/edit",
                                    routeName: "organization-management-edit",
                                    sortOrder: 2020,
                                    type: "1",
                                    permission: "sys_org_edit",
                                    weight: 2020,
                                },
                                {
                                    id: "2030",
                                    name: "组织详情",
                                    label: "组织详情",
                                    keepAlive: "0",
                                    icon: null,
                                    parentId: "2000",
                                    path: "/organization-management/detail",
                                    routeName: "organization-management-detail",
                                    sortOrder: 2030,
                                    type: "1",
                                    permission: "sys_org_detail",
                                    weight: 2030,
                                }
                            ]
                        },
                        {
                            id: "3000",
                            name: "组织树",
                            label: "组织树",
                            keepAlive: "0",
                            icon: "ClusterOutlined",
                            parentId: "-1",
                            path: "/organization-tree",
                            routeName: "organization-tree",
                            sortOrder: 3000,
                            type: "0",
                            permission: null,
                            weight: 3000,
                        }
                    ],
                    msg: 'OK'
                })
            }
        }
    }
]