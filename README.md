# GraduationProject-Counseling
毕业设计：大学生心理咨询系统

## 项目规范相关

![1547225902507](https://github.com/CharonWynn/GraduationProject-Counseling/blob/master/webui/static/framework.jpg?raw=true)

- 所有常量都提取到 const 文件下的 js 文件，一个模块一个 js 文件
- 只要在代码中，用到两次以上的都需要提取成变量
- 组件用到两处以上的，提取成公用业务组件；全局广泛使用的，提取成全局公用组件；不要在一个模块中去调用其他模块的组件
- 所有 css 代码不需要加浏览器前缀，postcss 会在编译后自动添加
- **编码风格，严格按照[vue风格指南](https://cn.vuejs.org/index.html)**

 ## Git 提交规范 

### 提交注意项

- 将项目 clone 到本地之后，在本地新建一个自己的分支；不要在 master 分支上进行开发
- 提交时，以合并请求提交，不要直接合并到 master
- 每次提交的变更不能超过 30 个文件

### 具体规则

先来看看公式：

```
<type>(<scope>): <subject>
```

- type

  - 用于说明 `commit` 的类别，只允许使用下面 7 个标识。

    ```
    feat：新功能（feature）
    fix：修补bug
    docs：文档（documentation）
    style： 格式（不影响代码运行的变动）
    refactor：重构（即不是新增功能，也不是修改bug的代码变动）
    test：增加测试
    chore：构建过程或辅助工具的变动
    ```

- scope

  - 用于说明 `commit` 影响的范围，比如数据层、控制层、视图层等等，视项目不同而不同。

- subject

  - 是 `commit` 目的的简短描述，不超过 50 个字符。

    ```
    1.以动词开头，使用第一人称现在时，比如change，而不是changed或changes
    2.第一个字母小写
    3.结尾不加句号（.）
    ```

- 阮一峰老师的文章[Commit message 和 Change log 编写指南](http://www.ruanyifeng.com/blog/2016/01/commit_message_change_log.html)

