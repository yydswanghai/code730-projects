/* 安装 npm i nprogress 进度条 */
import "nprogress/nprogress.css";
import { start, done, configure } from "nprogress";
import NotFound from "@/views/NotFound.vue"

configure({// 配置
    trickleSpeed: 20,// 设置进度条速度
    showSpinner: false,
})

function delay(duration) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, duration);
    })
}

function getPageComponent(pageCompResolve) {
    return async () => {
        // console.log("组件开始加载");
        start();
        if(process.env.NODE_ENV === "development"){// 开发环境   (process.env.NODE_ENV) vue-cli给注入的环境变量
            await delay(2000);
        }
        const comp = await pageCompResolve();
        // console.log("组件加载完毕");
        done();
        return comp;
    }
}

export default [
    {
        name: "Home",  // 命名路由
        path: "/",
        component: getPageComponent(() => import(/* webpackChunkName: "home" */ "@/views/Home")),
        meta: {
            title: "首页",
        }
    },
    {
        name: "About",
        path: "/about",
        component: getPageComponent(() => import(/* webpackChunkName: "about" */ "@/views/About")),
        meta: {
            title: "关于我",
        }
    },
    {
        name: "Blog",
        path: "/article",
        component: getPageComponent(() => import(/* webpackChunkName: "blog" */ "@/views/Blog")),
        meta: {
            title: "文章",
        }
    },
    {
        name: "CategoryBlog",// 博客分类
        path: "/article/cate/:categoryId", // 动态路由
        component: getPageComponent(() => import(/* webpackChunkName: "blog" */ "@/views/Blog")),
        meta: {
            title: "文章",
        }
    },
    {
        name: "BlogDetail",// 博客详情
        path: "/article/:id",
        component: getPageComponent(() => import(/* webpackChunkName: "blogdetail" */ "@/views/Blog/Detail")),
        meta: {
            title: "文章详情",
        }
    },
    {
        name: "Project",
        path: "/project",
        component: getPageComponent(() => import(/* webpackChunkName: "project" */ "@/views/Project")),
        meta: {
            title: "项目&效果",
        }
    },
    {
        name: "Message",
        path: "/message",
        component: getPageComponent(() => import(/* webpackChunkName: "message" */ "@/views/Message")),
        meta: {
            title: "留言板",
        }
    },
    {
        name: "NotFound",
        path: "*",
        component: NotFound,
    },
    {
        name: "Login",
        path: "/login",
        component: getPageComponent(() => import(/* "login" */"@/views/Login")),
        meta: {
            title: "登录",
        }
    }
];