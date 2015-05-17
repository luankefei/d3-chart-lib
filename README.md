# 基于d3的图表组件


整个组件库由数据和绘图两部分组成


##阅读顺序

main.js -> core.js -> dom.js -> http.js -> chart.js -> interactive.js -> extend.js

##模块概要

main模块负责声明命名空间，提供一个基础的amd加载模块。

core提供组件库的核心接口，如init

dom模块负责解析页面的chart标签及子标签

http模块负责加载

chart是整个图表的基类，作为绘图入口

interactive定义了基础的几种交互类型，与页面的interactive标签配合使用，通过data-type来指定

extend负责暴露api到组件对象

##绘图组件

axis坐标轴

grid网格

legend图例

timeline时间轴

title标题

tooltip提示气泡

##关于组件库的设计


一、 模块加载

模块化的设计，目的是减少全局污染、隐藏私有对象和多人协同开发。

目前想到的可行方案：
1. 命名空间方式 namespace.util、namespace.http
2. 闭包 var moduleA = (function() { return 'A' })
3. 自己实现amd，核心api是define、require和use
4. 使用node将amd、cmd和commonjs规范的代码编译成浏览器端可用的js



二、如何使用

设计思路是将整个图表包装成一个web组件，灵感来源于jquery插件和angular的directive
这与当前流行的web compoent组件化思路一致，未来切换到shadow dom也会很顺利

一个图表由3部分组成，html代码段，js和样式。在使用默认样式的情况下，代码大致如下：

```html
<chart id="map" data-name="worldMap">
    <data src="data/world.json"></data>
    <config src="data/style.js"></config>
    <event data-name="hover" data-type="highlight"></event>
    <component data-name="axis"></component>
</chart>
```

```javascript
var map = document.getElementById('map')
Y.init(map)
```


三、事件绑定

事件绑定分两种，一种是通过event标签绑定，默认支持约10种事件。另一种是通过重写事件来进行扩展绑定。这里主要介绍扩展绑定。

```javascript
var map = T.find('#map')

// 以下事件均为延迟绑定
map.country = {}
map.country.click = function(d, i, obj) {

  obj = d3.select(obj)
  obj.style('fill', 'red')
}
```


四、扩展

1.增加图表。将js文件放置在src/js/chart下即可。

2.增加组件。将js文件放置在src/js/compoent下即可。

3.增加事件。将js文件放置在src/js/events下即可。



五、与图易的结合

1.生成div

2.生成图表模板

3.调用组件初始化函数

done!
