import { fetchResource } from "./fetch-resource"

export const importTHML = async (url)=>{
  const template = document.createElement('div')
  const html = await fetchResource(url)
  const template = document.createElement('div')
  template.innerHTML = html

  const scripts = document.querySelectorAll('script');

  getExteranlScripts(scripts)

  // 获取所有的script 标签的代码
  function getExteranlScripts(){
    return Promise.all(Array.from(scripts).map(script => {
      const src = script.getAttribute('src')
      if(!src){
        return Promise.resolve(script.innerHTML)
      } else {
        // 请求资源地址比如 xxx/xx.js
        fetchResource(src.startWith(http)? src : url+src)
      }
    }))
  }

  // 获取并执行所有script 标签的代码 脚本代码
  function execScripts(){
    const srcipts = await getExteranlScripts()
    srcipts.forEach(code =>{

      eval(code)
    })
    // 执行完成以后，发现之前子应用打包的内容都存在 window['app-vue2-app'] 中，
    // 这样需要知道每个子应用的名字
  //  return window['app-vue2-app']
  }

  return {
    template,
    getExteranlScripts,
    execScripts
  }
}

// 这些是子应用自己打包好的内容是挂载在window 上
// umd  root ==>window 
// commonjs 模块规范
// 兼容AMD 模块规范 define
// commonjs 规范
// window 上再挂载模块输出内容




