# BookRecommend

**此处为前端仓库**

## 项目说明
- 项目使用[material-tailwind-dashboard-react](https://github.com/creativetimofficial/material-tailwind-dashboard-react)为基础模板
- [模板的相关文档](https://www.material-tailwind.com/docs/react/theming)
- 运行
  ```bash
  npm install
  npm run dev
  ```


## 小组成员
- 吴铕达
- 孙一函
- 汪周阳
- 刘焦雨

## 多人协作时的流程(可供参考)
```bash
# 请将代码中出现的中文根据实际情况进行替换
#确定好本次代码开发所要完成的任务，开好远程分支x，相关信息(分支名称，描述，关联工作项）要注明好
git pull #确保代码、分支是最新的
git checkout -b 本地分支名 origin/远程分支名   #检出远程分支到本地
# 代码开发
git add .
git commit -m"适当的批注"
git push #将代码推送到远程分支，开发过程中这个操作可以频繁点，好处是：代码备份和版本管理
# 完成本次代码开发所要完成的任务后（请确定功能实现，本地调试没问题）
# 接下来进行分支的合并
# 在华为云中新建合并请求（可设置检视人，评审人，让别人帮忙看看）
# 合并完成后（默认设置是分支合并后，源分支是删除的）
git remote prune origin #当华为云上显示远程分支已经删除，但git branch -r仍然看到所删除的分支，执行该命令
git checkout main #切回main分支（一次任务完成后，建议切回main分支，这样pull的时候可以避免自己写的代码丢失的问题）
git branch -d 本地分支名 #删除本次任务所用的本地分支（也可以不删，当作备份）
```

## 824记录
- 界面
  1. 用户主界面
     - 搜索框
     - 猜你想看（已登录）
     - 新书速递
     - 热门图书
     - 标签 （右侧栏）
     - 书评、吐槽
  2. 管理员主界面
     - 管理员跳转按钮设置在个人主页
     - 侧边栏
       - 用户管理
       - 书籍管理
       - 书评管理
     - 书籍增删改查
     - 用户编辑
     - 书评的隐藏和删除
     - 网站数据 （有时间就做）
  3. 图书详情页（参考zlibrary）
     - 封面
     - 基本信息
     - 标签
     - 想读、在读、读过
     - 评价
     - 相似推荐
     -
  4. 搜索后的跳转页
     - 搜索不到->这些书与您的搜索查询不完全匹配，但它们非常相似。
     - 搜得到 ->
  5. 个人主页
     - 信息通知 （续有时间就做）
       - 书评的点赞、回复（后续有时间就做）
       - 关注 （后续有时间就做）
       - 被管理信息通知
     - 时光机
       - 想看、在看、看过
       - 我的书评 （包含在想看、在看、看过的详细页面中）
  6. 登录、注册界面
  7. 无法完全显示的内容页

## 825设计
### 用户表(Users)
- 用户ID(user_id):整数类型,自动增长,主键
- 用户名(username):字符串类型,varchar(64)
- 密码(password):字符串类型,varchar(256)
- 注册时间(register_time):日期时间类型,datetime
- 是否为管理员(is_admin): 枚举类型,tinyint(1), 1表示管理员,0表示普通用户
  
### 用户收藏表(User_Collect)
- 收藏ID(collect_id): 整数,自动增长,主键
- 收藏类型(collect_type): tinyint,1:想看，2：再看，3：看过
- 用户ID(user_id): 整数,外键关联Users表
- 书籍ID(book_id): 整数,外键关联Books表
- 收藏时间(collect_time): datetime

### 用户评分表(User_Rating)
- 评分ID(rating_id): 整数,自动增长,主键
- 用户ID(user_id): 整数,外键关联Users表
- 书籍ID(book_id): 整数,外键关联Books表
- 评分(rating): 小数类型,decimal(2,1)
- 评分时间(rating_time): datetime

### 用户评论表(User_Comment)
- 评论ID(comment_id) - integer, 主键自动增长
- 书籍ID(book_id) - integer, 外键关联书籍表
- 用户ID(user_id) - integer, 外键关联用户表
- 评论内容(content) -  varchar(500), 评论文本(字数限制在140字以内)
- 评论时间(create_time) - datetime

### 书籍表(Books)
- 书籍ID(book_id):整数,自动增长,主键
- ISBN:字符串,varchar(20),国际标准书号
- 书名(title):字符串,varchar(256)
- 作者(author):字符串,varchar(64)
- 出版社(publisher):字符串,varchar(128)
- 出版日期(publish_date):日期类型,date
- 页数(page_num):整数,int
- 分类(category):字符串,varchar(64),表示书籍类别
- 封面图片(cover_image):字符串,存储URL
- 描述(description):字符串,text类型,存储书籍简介
- 评分人数(rating_num):整数,表示评分人数
- 平均评分(rating_avg):小数,decimal(2,1),评分平均值
- 评论数(comment_count):整数,记录评论数

### 8月29日 tailwind学习


### 9月6日 修改说明
- 目前的导航栏只是为方便开发，非最终版本
- layout 设计初稿
  1. auth : 登录、注册
  2. tourist ： 游客所能看的：首页（无推荐）,图书详情页（无个人收藏、个人评论、个人评价），搜索
  3. user : 用户(特指已登录)所能看的：游客 + 个人主页、收藏夹、时光机、个人评论、个人评价

### 9月7日 token
计划在本项目中使用token

- 实现自动登录、或记住密码功能：流程
   1. 在用户登录成功时，检查 "记住密码" 复选框的状态：在用户登录时，检查用户是否选择了 "记住密码" 选项。
   2. 根据 "记住密码" 选项存储 token：如果用户选择了 "记住密码"，则将 token 存储在 localStorage 中；否则，将 token 存储在 sessionStorage 中。
   3. 在应用程序启动时检查存储中是否存在有效的 token：在你的应用程序启动时（例如，在 App.js 或主页加载时），检查 localStorage 和 sessionStorage 中是否存在有效的 token。
   4. 如果存在有效的 token，自动登录用户