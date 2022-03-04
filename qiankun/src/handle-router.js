import { importTHML } from "./impot-html"
import { getApps } from "./qiankum"
import { getNextRoute, getPreRoute } from "./rewrite-router"

export const handleRouter = async()=>{
  const apps = getApps()


  // 卸载上一个路由
  const preApp = apps.find(app=>{
    return getPreRoute().startsWith(app.activeRule)
  })
 
  // 获取下一个应用路由
  const app = apps.find(item =>getNextRoute().startsWith(item.activeRule))
  if(preApp){
    await unmount(preApp)
  }

  if(!app){
    return 
  }

  // 3、加载对应子应用
  const {template, getExternalScripts, excScripts} = await importTHML(app.entry)
  const container = document.querySelector(app.container)
  container.appendChild(template)

  // 配置全局环境变量
  window.__POWERED_BY_QIANKUN__ = true
  window.__INJECT_PUBLIC_PATH_BY_QIANKUN__ = app.entry +'/'

  const appExports = await excScripts()

  // 获取子元素的声明周期
  app.bootstrap = appExports.bootstrap
  app.mount = appExports.mount
  app.unmount = appExports.unmount

  await bootstrap(app)
  await mount(app)
  await unmount(app)
}

async function bootstrap(app){
  app.bootstrap && await app.bootstrap()
}
function mount(app){
  app.mount && await app.mount({
    container: document.querySelector(app.container)
  })
}
function unmount(app){
  app.unmount && await app.unmount()
}

