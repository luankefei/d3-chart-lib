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




