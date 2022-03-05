// 数据类型判断
function checkType(obj){
  return Object.prototype.toString.call(obj).slic(8,-1).toLowerCase()
}
// -------------------------------------------------------------------
// 原型链继承
// function Animal(){
//    this.color = ['red','green']
//  }
//  Animal.prototype.getColor = function() {
//   return this.color
// }
 
// function Dog(){}
// Dog.prototype = new Animal()

// let dog1 = new Dog()
// dog1.color.push('yellow')
// let dog2 = new Dog()

// console.log(dog2.color)
// console.log(dog2.getColor())
// (3) ['red', 'green', 'yellow']

// 原型链继承存在的问题：
// 问题1：原型中包含的引用类型属性将被所有实例共享；
// 问题2：子类在实例化的时候不能给父类构造函数传参；
// -------------------------------------------------------------------

// 借用构造函数实现继承
// function Animal(color){
//   this.color = color
//   // 这里要是函数，才可以被借用
//   this.getColor = function(){
//     return this.color
//   }
// }

// function Dog(color){
//   Animal.call(this, color)
// }

// Dog.prototype = new Animal()

// let dog1 = new Dog(['yellow'])
// dog1.color.push('red')
// let dog2 = new Dog(['green'])

// console.log(dog1.color)
// // [ 'yellow', 'red' ]
// console.log(dog2.getColor())
// // ['green']

// 借用构造函数实现继承解决了原型链继承的 2 个问题：引用类型共享问题和不能传参数问题。
// 但是由于方法必须定义在构造函数中，所以会导致每次创建子类实例都会创建一遍方法。

// -------------------------------------------------------------------
// 组合继承
// function Animal(color){
//   this.color = color
// }
// Animal.prototype.getColor = function(){
//   return this.color
// }

// function Dog(color){
//   Animal.call(this, color)
// }
// Dog.prototype = new Animal()
// Dog.prototype.constructor = Dog
// Dog.prototype.getColor = function(){
//   return '打印信息' + this.color
// }

// let animal1 = new Animal(['红'])
// animal1.color.push('red')

// console.log(animal1.getColor())
// // ['红', 'red']

// let dog1 = new Dog(['yellow'])
// dog1.color.push('red')
// console.log(dog1.getColor())
// // 打印信息yellow,red

// let dog2 = new Dog(['green'])
// console.log(dog2.getColor())
// 打印信息green

// 组合继承结合了原型链和构造函数
// 用原型链继承原型上的属性和方法，
// 而通借用构造函数继承实例属性
// 但是调用了2次父级构造函数，解决不调用两次解决 原型链继承就好

// -------------------------------------------------------------------
// 寄生组合式继承
// function createObj(parent){
//   function F() {}
//   F.prototype = parent.prototype
//   return new F()
// }

// function Animal(color){
//   this.color = color
// }
// Animal.prototype.getColor = function(){
//   return this.color
// }

// function Dog(color,age){
//   Animal.call(this,color)
//   this.age = age
// }
// // Dog.prototype = createObj(Animal.prototype)
// // es6 ie9-ie10
// Dog.prototype = Object.create(Animal.prototype)
// Dog.prototype.constructor = Dog


// -------------------------------------------------------------------
// class 继承

//  class Animal{
//    constructor(color){
//      this.color = color
//    }
//    getColor(){
//      return this.color
//    }
//  }

//  class Dog extends Animal{
//    constructor(color,age){
//      super(color)
//      this.age = age
//    }
//  }
//  let animal1 = new Animal(['红'])
//  animal1.color.push('red')
 
//  console.log(animal1.getColor())
//  // ['红', 'red']
 
//  let dog1 = new Dog(['yellow'])
//  dog1.color.push('red')
//  console.log(dog1.getColor())
//  // ['yellow', 'red']
 
//  let dog2 = new Dog(['green'])
//  console.log(dog2.getColor())
// //  ['green']
 
// -------------------------------------------------------------
// 数组去重
{
  function unique(arr){
    const res = arr.filter((item, idx, arr)=>{
      // 利用indexof 找到返回的第一个元素，后面的元素查找到的不会返回
      return arr.indexOf(item) == idx
    })
    return res
  }
  
  const arr = ['1',2,3,3,'1',1]
  const res = unique(arr)
  // ['1', 2, 3, 1]
  
  // 另一种写法
  let res2 = new Set([...arr])
  // 集合转化为 数组
  res2 = Array.from(res2)
  // ['1', 2, 3, 1]
}

// -------------------------------------------------------------
// 数组扁平化
// const arr = [1,2,[3,4,[5,6]]]

// arr.flat(2)
// console.log("🚀 ~ file: code.js ~ line 178 ~ arr", arr.flat(2))
// [1, 2, 3, 4, 5, 6]

// function flatten(arr){
//   let result = []
//   for(let i=0;i<arr.length;i++){
//     if(Array.isArray(arr[i])){
//       // 重点在这里 result = result.concat  及 flatten(arr[i])
//       result = result.concat(flatten(arr[i]))
//     } else {
//       result.push(arr[i])
//     }
//   }
//   return result;
// }


// function flatten(arr){
//   let result = []
//   arr.forEach(element => {
//     if(Array.isArray(element)){
//       result = result.concat(flatten(element))
//     } else {
//       result.push(element)
//     }
//   });
//   return result
// }



// es6 的写法
// function flatten(arr){
//   while(arr.some(ele=>Array.isArray(ele))){
//     // 重点在解构
//     arr = [].concat(...arr)
//   }
//   return arr;
// }

// const result2 = flatten(arr)
// console.log("🚀 ~ file: code.js ~ line 220 ~ result", result2)

// -------------------------------------------------------------

function isObject(obj){
  return (typeof obj == 'object' || typeof obj == 'function') && obj != null
}
function deepclone(obj){
  // 这里用weakMap 就是为了处理 递归调用中如果引用了自身而做的处理，weakMap 会在代码完成后自动内存回收
  let map = new WeakMap()
  if (map.get(obj)) {
    return obj;
  }
  // 考虑不是对象的时候其他 Date|RegExp|Function 类型
  let reg = new RegExp("Date|RegExp|Function",'ig')
  let name = obj.constructor.name
  if(reg.test(name)){
    return new obj.constructor(obj)
  } 
  if(isObject(obj)){
    // 为已经循环引用的对象做标记
    map.set(obj, true); 
    // 先初始化一个拷贝的对象
    let newObj = Array.isArray(obj) ? []:{};
    Object.keys(obj).forEach(key => {
      if(Array.isArray(obj[key])){
        newObj[key] = [...obj[key]]
      } else{
        newObj[key] = {...obj[key]}
      }
      // 设置对象
      map.set(newObj, key, newObj[key])
    });
    return newObj
  }
}
let target = {
  a:1,
  b:[1,2,3],
  test:function(){
    console.log('123')
  }
}
const target1 = deepclone(target)
target.b.push(4)
console.log("🚀 ~ file: code.js ~ line 256 ~ target", target)
console.log("🚀 ~ file: code.js ~ line 255 ~ target1", target1)

// -----------------------------------------
// 事件总线
class EventEmitter {
  constructor(){
    this.cache = {}
  }
  on(event, fn){
    if(this.cache[event]){
      this.cache[event].push(fn)
    } else {
      // 这里注意需要把fn 放进去，因为第一次的时候如果设置为空，每次第一次创建都是空了
      this.cache[event] = [fn]
    }
    return this;
  }
  off(event,fn){
    if(!event){
      this.cache = {}
    }
    if(this.cache[event]){
      this.cache[event] = this.cache[event].filter(f=>f!=fn)
    }
    return this;
  }

  once(event,fn){
    this.emit(event,fn)
    delete this.cache[event]
  }
  emit(event,...args){
    if(this.cache[event]){
      this.cache[event].forEach(callback=>callback(...args))
    }
    return this
  }
}

let event2 = new EventEmitter()
// 注意这里要用命名函数 或者变量，匿名函数会无法注销off 操作
const fn1 = function(...args){
  console.log('点击事件1,参数'+args)
}
const fn2 = function(...args){
  console.log('点击事件2,参数'+args)
}
event2.on('click',fn1)
event2.on('click',fn2)
event2.emit('click','1')
event2.off('click',fn1)
event2.emit('click','2')
// event2.once('click','2')
// event2.emit('click','2')

// ------------------------------------------
// 获取url search值

// 前置知识  new URLSearchParams(url) 参数
// 获取url 上面的search 参数  window.location.search.slice(1)，只解析 xxx==xxx&xx=xx 这种类型的字符串
// 对于地址栏#xxx号获取不到 可以通过 window.location.hash 获取到 #xxx
// const searchParams = new URLSearchParams('q=URLUtils.searchParams&topic=api&topic=webdev')
// searchParams.append("topic", "webdev");
// const ts = searchParams.toString(); // q=URLUtils.searchParams&topic=api&topic=webdev&topic=webdev
// searchParams.get('topic') // api 第一个匹配的值获取的内容 

// function parseParam(url) {
//   // 获取url 上面的search 参数，只解析 xxx==xxx&xx=xx 这种类型的字符串
//   // 对于地址栏#xxx号获取不到
//   // URLSearchParams ie 不支持
//   const searchParams = new URLSearchParams(url)
//   let result = new Map()
//   for (let [key,value] of searchParams.entries()) {
//     if(!result.has(key)){
//         result.set(key,value)
//     } else {
//       // 对已经存在的数据做添加处理
//       result.set(key, [result.get(key)].concat(value))
//     }
//   }

//   return Object.fromEntries(result)
// }
// const search = window.location.search.slice(1)
// const resulet5 = parseParam("q=URLUtils.searchParams&topic=api&topic=webdev")
// {'q': 'URLUtils.searchParams', 'topic': ['api', 'webdev']}

// function parseParam(string){
//   let searchObj = new URLSearchParams(string)
//   let objMap = new Map()
//   for (let [key, value] of searchObj.entries()){
//     if(!objMap.has(key)){
//       objMap.set(key, value)
//     } else {
//       objMap.set(key, [objMap.get(key)].concat(value))
//     }
//   }
//   return Object.fromEntries(objMap)
// }

// const string1 = "q=URLUtils.searchParams&topic=api&topic=webdev&new"
// const result6 = parseParam(string1) 
// console.log("🚀 ~ file: code.js ~ line 367 ~ result6", result6)

//---------------------------------------------------------------
// 字符串模板
function render(template, data) {
  const reg = /\{\{(\w+)\}\}/; // 模板字符串正则
  if (reg.test(template)) { // 判断模板里是否有模板字符串
      const name = reg.exec(template)[1]; // 查找当前模板里第一个模板字符串的字段
      template = template.replace(reg, data[name]); // 将第一个模板字符串渲染
      return render(template, data); // 递归的渲染并返回渲染后的结构
  }
  return template; // 如果模板没有模板字符串直接返回
}

function render(template, data){
  const reg = /\{\{(\w+)\}\}/
  if(reg.test(template)){ // 判断模板里是否有模板字符串
    // 查找当前模板里第一个模板字符串的字段, 这样第一次替换name, 第二次替换 age, 第三次替换sex
    const name = reg.exec(template)[1];
    // 将第一个模板字符串渲染
    template = template.replace(reg,data[name])
    // '我是布兰，年龄{{age}}，性别{{sex}}'
    // '我是布兰，年龄12，性别{{sex}}'
    // '我是布兰，年龄12，性别女'
    //  递归的渲染并返回渲染后的结构,一步一步的递归
    return render(template, data);
  }
  // 返回最终的字符串
  return template
}

let template = '我是{{name}}，年龄{{age}}，性别{{sex}}';
let person = {
    name: '布兰',
    age: 12,
    sex: '女'
}
const template2 = render(template, person); // 我是布兰，年龄12，性别undefined
console.log("🚀 ~ file: code.js ~ line 409 ~ template2", template2)

//---------------------------------------------------------------------



// 获取页面的img元素
const imgList = [...document.querySelectorAll([data-src])];
let length = imgList.length;
function imgload(){
  // 初始化内容为src
  imgList.forEach(imgItem=>{
    // 初始化的时候设置值
    imgList.setAttribute('src','xxx.default.jpg')
  });

  // 可视化范围内加载
  const observer = new IntersectionObserver(function(entries){
    entries.forEach((item) => { // 遍历entries数组
      if(item.isIntersecting){ // 当前元素可见
        item.src = item.dataset.src  // 替换src
        observer.unobserve(item)  // 停止观察当前元素 避免不可见时候再次调用callback函数
      }	
    })
  });
}