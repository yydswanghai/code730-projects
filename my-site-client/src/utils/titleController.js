// 标题控制：路由标题-网站标题

let routeTitle = "",
    siteTitle = "";

function setTitle(){
    if(!routeTitle && !siteTitle){// 既没有路由标题也没有网站标题
        document.title = "loading..."
    }
    else if(routeTitle && !siteTitle){// 仅有路由标题
        document.title = routeTitle;
    }
    else if(!routeTitle && siteTitle){// 仅有网站标题
        document.title = siteTitle;
    }else{
        document.title = `${routeTitle}-${siteTitle}`;
    }
}

export default {
    // 设置路由标题
    setRouteTitle(title){
        routeTitle = title;
        setTitle();
    },
    // 设置网站标题
    setSiteTitle(title){
        siteTitle = title;
        setTitle();
    }
}