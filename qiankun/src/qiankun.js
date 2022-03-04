import { rewriteRouter } from "./rewrite-router";

// 实现一个魏乾坤 
let _apps = []

export const getApps = ()=>_apps;

export const registerMicroApps = (apps) =>{
  _apps = apps;
}

export const start = ()=>{
  // 微前端的运行原理
  // 1、监听路由的变化 
  // 2、匹配子应用
  // 3、加载子应用
  // 4、渲染子应用

  // 1、监听路由的变化 
  // hash 路由 window.location.hash
  // history 路由
    // history.go() history.back() history.forward() 使用的是 popstate 事件，window.onpopstate= function(){}
    // pushState \replaceState 需要通过重写函数的方式进行劫持
  // 路由前进后端的时候
   rewriteRouter()
   // 初始化的时候也要处理路由
   handleRouter()

}