/**
 * 存储的是 角色对应的权限名称
 */
const roleToRoute = {
    coustomer: [
        { name: "Product" },
        { name: "ProductList" },
        { name: "ProductAdd" },
    ],
    admin: [
        { name: "Product" },
        { name: "ProductList" },
        { name: "ProductAdd" },
        { name: "Category" },
    ]
}

/**
 * 过滤掉没有权限的路由
 * @param {String} role 
 * @param {Array} routes 
 */
export default function getMenuRoute(role, routes){
    const allowRoutesName = roleToRoute[role].map((item) => item.name);//  ["Product", "ProductList", "ProductAdd"]
    const resultRoutes = routes.filter((r) => {
        const obj = r;
        if(allowRoutesName.includes(r.name)){
            const { children } = obj;
            obj.children = children.filter((c) => allowRoutesName.includes(c.name))
            return true;
        }
        return false;
    })
    return resultRoutes;
}