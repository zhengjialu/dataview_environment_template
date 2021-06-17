# React 数据可视化开发 Template 环境

> 框架 React：https://react.docschina.org/  
> UI 库 Ant Design：https://ant.design/index-cn  
> 路由 React-router：https://reactrouter.com/  
> 状态管理 Mobx：https://cn.mobx.js.org/

```
├── README.md
├── config                         环境配置目录
│   ├── project.config.js          开发环境配置项
│   └── webpack.config.js          webpack 配置
├── mock                           mock 数据配置目录
│   └── mock-hello.json
├── postcss.config.js              CSS 预处理配置
├── package.json
├── .babelrc                       babel 配置项
├── .nycrc                         单元测试配置项
├── .gitignore
├── .eslintignore
├── .eslintrc.js                   代码检查配置项
├── .prettierignore
├── .prettierrc.js                 代码格式化配置项
├── src                            页面开发
│   ├── assets                     项目资源
│   │   ├── icons                  项目 icon 资源
│   │   └── images                 项目 image 资源
│   ├── common                     公共方法
│   │   ├── request-io.js          IO 请求工具
│   │   └── utils.js               自定义工具函数
│   │   └── artboard.jsx           大屏排版容器
│   │   └── box.jsx                大屏内容元素容器
│   │   └── flexbox.styl           弹性布局样式表
│   │   └── grid.jsx               大屏布局参考网格
│   │   └── my-content.jsx         React Context 特性
│   ├── components                 页面组件
│   ├── layout                     项目页面布局
│   │   ├── frame                  项目全局框架
│   │   │   ├── frame.jsx
│   │   │   ├── frame.styl
│   │   │   ├── index.js
│   │   │   └── nav.jsx
│   ├── pages                      前端页面
│   │   ├── index.jsx              路由渲染定义
│   │   └── page-hello             项目模块
│   |       ├── index.ejs          当前页面 HTML 模版
│   │       ├── hello.styl         模块样式
│   │       ├── index.js           模块资源入口文件
│   │       ├── io.js              页面 IO 定义
│   │       ├── page-hello.jsx     模块开发内容
│   │       └── store.js           状态管理
│   └── router                     路由地址配置
│       └── index.js               路由跳转定义
├── test                           单元测试
│   └── *.test.js                  单元测试文件
└── react-project-tree
```
