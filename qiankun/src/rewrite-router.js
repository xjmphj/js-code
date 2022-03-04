import { handleRouter } from "./handle-router"

let preRoute = '' // 上一个路由
let nextRoute = window.location.pathname
// 获取导航前的函数
export const getPreRoute = ()=>{return preRoute}
// 获取导航后的函数
export const getNextRoute = ()=>{return nextRoute}

export function rewriteRouter(){
  // 这里比较特殊，就是 进入 popstate 的时候，导航已经变为最新的导航了，但是这里不影响
  window.addEventListener('popstate',function(){
    prvRoute = nextRoute
    nextRoute = window.location.pathname
    console.log('popstate')
    // 加载路由变化后的内容
    handleRouter()
   })


   const rawPushState = window.history.pushState
   // 重写 window.history.pushState
   window.history.pushState = function(...args){
      // 导航前
     preRoute = window.location.pathname
     rawPushState.apply(window.history, args)
     // 导航后
     nextRoute = window.location.pathname

     // console.log('监视到pushState 的变化了')
     // 加载路由变化后的内容
     handleRouter()
   }

   // 重写 window.history.replaceState
    const rawReplaceState = window.history.replaceState
    window.history.replaceState = function(...args){
       // 导航前
      preRoute = window.location.pathname
      rawReplaceState.apply(window.history, args)
      // 导航后
      nextRoute = window.location.pathname
      // console.log('监视到replaceState 的变化了')
      // 加载路由变化后的内容
      handleRouter()
    }
}