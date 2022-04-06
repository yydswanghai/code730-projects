export async function getUserInfo() {
    return {
        code: 200,
        data: {
            permissions: [
                "sys_org_add",
                "sys_org_detail",
                "sys_auth_edit",
                "commend_add",
                "commend_detail",
                "sys_org_edit",
                "sys_org_del",
                "commend_to_examine",
                "commend_edit",
                "commend_del",
            ],
            sysOrg: {
                accountSource: 2,
                createBy: null,
                createTime: "2022-02-24 19:02:10",
                delFlag: 0,
                level: 1,
                lockFlag: 0,
                orgCode: null,
                orgDesc: null,
                orgId: "1",
                orgName: "中国共产主义青年团广东省委员会",
                parentOid: "10000000",
                password: "",
                permCode: "00010001",
                permNo: "0001",
                phone: null,
                sourceFullname: "中国共产主义青年团广东省委员会",
                sourceId: "15247607",
                updateBy: null,
                updateTime: "2022-04-06 10:25:16",
                username: null,
            }
        },
        msg: 'OK'
    }
}

export async function getUserMenu() {
    return {
        code: 200,
        data: [
            {
                icon: "form",
                id: "1000",
                keepAlive: "0",
                label: "表彰管理",
                name: "表彰管理",
                parentId: "-1",
                path: "/commend-management",
                permission: null,
                routeName: "commend-management",
                sortOrder: 1000,
                type: "0",
                weight: 1000,
                children: [
                    {
                        icon: null,
                        id: "1010",
                        keepAlive: "0",
                        label: "新增表彰",
                        name: "新增表彰",
                        parentId: "1000",
                        path: "/commend-management/add",
                        permission: "commend_add",
                        routeName: "commend-management-add",
                        sortOrder: 1010,
                        type: "1",
                        weight: 1010,
                    },
                    {
                        icon: null,
                        id: "1020",
                        keepAlive: "0",
                        label: "编辑表彰",
                        name: "编辑表彰",
                        parentId: "1000",
                        path: "/commend-management/edit",
                        permission: "commend_edit",
                        routeName: "commend-management-edit",
                        sortOrder: 1020,
                        type: "1",
                        weight: 1020,
                    },
                    {
                        icon: null,
                        id: "1030",
                        keepAlive: "0",
                        label: "表彰明细",
                        name: "表彰明细",
                        parentId: "1000",
                        path: "/commend-management/detail",
                        permission: "commend_detail",
                        routeName: "commend-management-detail",
                        sortOrder: 1030,
                        type: "1",
                        weight: 1030,
                    }
                ]
            },
            {
                icon: "organization",
                id: "2000",
                keepAlive: "0",
                label: "组织管理",
                name: "组织管理",
                parentId: "-1",
                path: "/organization-management",
                permission: null,
                routeName: "organization",
                sortOrder: 2000,
                type: "0",
                weight: 2000,
                children: [
                    
                ]
            }
        ],
        msg: 'OK'
    }
}

export async function login(params){
    const { username, password } = params
    if(username === 'admin' && password === '123456'){
        return {
            access_token: "c9e2641a-44c4-4de3-89a2-0ed4ba5eab39",
            clientId: "app_person_user",
            expires_in: 7199,
            refresh_token: "b05a6508-8a28-4270-bf71-68ae5af042f1",
            user_info: {
                accountNonExpired: true,
                accountNonLocked: true,
                authorities: [],
                credentialsNonExpired: true,
                enabled: true,
                id: "5",
                parentOid: null,
                password: null,
                phone: "15572151179",
                username: "15572151179",
            }
        }
    }
    return null
}

export async function logout(){
    return {
        code: 200,
        data: null,
        msg: 'OK'
    }
}

// export async function getUserInfo(){
//     return {
//         code: 200,
//         data: {
//             appUser: {
//                 createBy: null,
//                 createTime: "2022-02-21 15:51:11",
//                 delFlag: 0,
//                 idCard: "F4416C73D202CEB99D22E9B54C3D46F80D7EDEA75BE76BE0F08057B1FEBDDC98",
//                 lockFlag: 0,
//                 name: "王海",
//                 password: "",
//                 phone: "15572151179",
//                 sex: 1,
//                 updateBy: null,
//                 updateTime: "2022-03-23 15:48:18",
//                 userId: "5",
//             },
//             permissions: null
//         },
//         msg: 'OK'
//     }
// }