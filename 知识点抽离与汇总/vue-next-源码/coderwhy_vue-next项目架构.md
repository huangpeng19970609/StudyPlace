## 1 开发插件

介绍以下插件

#### 01 | EditorConfig Support for Visual Studio Code

- 同时会存在这些问题

  1. 不同操作系统会导致【回车符】的风格不同。
  2. 不同的编辑器会导致不同的【tab】的空格符号是不同的。

- 了不起的VSCod插件【EditorConfig】

   创建 【.editorconfig】配置文件 

  ````js
  # http://editorconfig.org
  root = true
  # --- 针对所有文件 ---
  [*]
  # 缩进风格：空格
  indent_style = space
  # 缩进大小2
  indent_size = 2
  # 换行符lf
  end_of_line = lf
  # 字符集utf-8
  charset = utf-8
  # 是否删除行尾的空格
  trim_trailing_whitespace = true
  # 是否在文件的最后插入一个空行
  insert_final_newline = true
  
  # --- 针对md文件 ---
  [*.md]
  trim_trailing_whitespace = false
  
  # --- 针对Makefile文件 ---
  [Makefile]
  indent_style = tab
  ````

#### 02 | prettier

> 当前最流行的前端格式化工具, 安装插件 prettier- formatter Code便会自动格式化

不仅仅是vsCode格式化，而其他编辑器也可以格式化.

格式化： 在你保存的时候自动将其修改，这比 【EditorConfig 】更加强大。

1. 不仅仅是 vscode插件, 你必须安装它，才可以支持我们的配置文件

   ````js
   npm install pretter -D
   ````

2. 创建配置文件 【.prettierrc】

   * useTabs：使用tab缩进还是空格缩进，选择false；
   * tabWidth：tab是空格的情况下，是几个空格，选择2个；
   * printWidth：当行字符的长度，推荐80，也有人喜欢100或者120；
   * singleQuote：使用单引号还是双引号，选择true，使用单引号；
   * trailingComma：在多行输入的尾逗号是否添加，设置为 `none`；
   * semi：语句末尾是否要加分号，默认值true，选择false表示不加；

   ````js
   {
     "useTabs": false,
     "tabWidth": 2,
     "printWidth": 80,
     "singleQuote": true,
     "trailingComma": "none",
     "semi": false
   }
   ````

3. 创建.prettierignore忽略文件

   ````js
   /dist/*
   .local
   .output.js
   /node_modules/**
   
   **/*.svg
   **/*.sh
   
   /public/*
   ````

4. .VSCode需要安装prettier的插件， 请下载它

5. prettier的生效

   - 在代码中保存代码是否会改变？

   - 配置一次性修改的命令:

     在package.json中配置一个scripts

     ````js
     "prettier": "prettier --write ."
     ````

#### 03 | ESLint

1. 在前面创建项目的时候，我们就选择了ESLint，所以Vue会默认帮助我们配置需要的ESLint环境。

2. VSCode需要安装ESLint插件：

3. 解决eslint和prettier冲突的问题：

   - 哪里是冲突的？ 

     【eslint中的extends】与【prettier中的配置文件】是不兼容的！

   - 如何去解决这个问题？并配置插件

     安装插件：（vue在创建项目时，如果选择prettier，那么这两个插件会自动安装）

     ````js
     npm i eslint-plugin-prettier eslint-config-prettier -D
     ````

   - 添加prettier插件便可以解决此冲突问题

      'plugin:prettier/recommended' 

   ```json
     extends: [
       "plugin:vue/vue3-essential",
       "eslint:recommended",
       "@vue/typescript/recommended",
       "@vue/prettier",
       "@vue/prettier/@typescript-eslint",
       # ⭐ 
       'plugin:prettier/recommended'
     ],
   ```


#### 03 | git Husky和eslint

> 进行 pre-commit的限制

虽然我们已经要求项目使用eslint了，但是不能保证组员提交代码之前都将eslint中的问题解决掉了：

* 也就是我们希望保证代码仓库中的代码都是符合eslint规范的；

* 那么我们需要在组员执行 `git commit ` 命令的时候对其进行校验，如果不符合eslint规范，那么自动通过规范进行修复；

那么如何做到这一点呢？可以通过Husky工具：

* husky是一个git hook工具，可以帮助我们触发git提交的各个阶段：pre-commit、commit-msg、pre-push

如何使用husky呢？

这里我们可以使用自动配置命令：

```shell
npx husky-init && npm install
```

> 请注意:  npx husky-init && npm install 中的 && 是unix中一个普通的命令符号，但可能在windos下无法识别，而遇到报错问题。若自动配置无法解决，请使用手动配置。

这里会做三件事：

1. 安装husky相关的依赖：

<img src="https://tva1.sinaimg.cn/large/008i3skNgy1gsqq0o5jxmj30bb04qwen.jpg" alt="image-20210723112648927" style="zoom:67%;" />

2. 在项目目录下创建 `.husky` 文件夹：

   ```js
   npx huksy install
   ```

<img src="https://tva1.sinaimg.cn/large/008i3skNgy1gsqq16zo75j307703mt8m.jpg" alt="image-20210723112719634" style="zoom:67%;" />

3. 在package.json中添加一个脚本：

<img src="https://tva1.sinaimg.cn/large/008i3skNgy1gsqq26phpxj30dj06fgm3.jpg" alt="image-20210723112817691" style="zoom:67%;" />

接下来，我们需要去完成一个操作：在进行commit时，执行lint脚本：

<img src="https://tva1.sinaimg.cn/large/008i3skNgy1gsqq3hn229j30nf04z74q.jpg" alt="image-20210723112932943" style="zoom:67%;" />

这个时候我们执行git commit的时候会自动对代码进行lint校验。

#### 04 |  git commit规范 - Commitizen

> 帮助我们创建 commig msg

> 通常我们的git commit会按照统一的风格来提交，这样可以快速定位每次提交的内容，方便之后对版本进行控制。比如vue源码的维护进行的提交风格非常优雅。

但是如果每次手动来编写这些是比较麻烦的事情，我们可以使用一个工具：Commitizen

Commitizen 是一个帮助我们编写规范 commit message 的工具；

1. 安装Commitizen

   ```js
   npm install commitizen -D
   ```

2. 安装cz-conventional-changelog，并且初始化cz-conventional-changelog：

   这个命令会帮助我们安装cz-conventional-changelog：

   ````js
   npx commitizen init cz-conventional-changelog --save-dev --save-exact
   ````

   并且在package.json中进行配置：

   <img src="https://tva1.sinaimg.cn/large/008i3skNgy1gsqvzftay5j30iu04k74d.jpg" style="zoom:67%;" />

3. 这个时候我们提交代码需要使用 `npx cz`：

> 现在来使用 Commitizen吧！使用 npx cz 进入终端的交互

| Type     | 作用                                                         |
| -------- | ------------------------------------------------------------ |
| feat     | 新增特性 (feature)                                           |
| fix      | 修复 Bug(bug fix)                                            |
| docs     | 修改文档 (documentation)                                     |
| style    | 代码格式修改(white-space, formatting, missing semi colons, etc) |
| refactor | 代码重构(refactor)                                           |
| perf     | 改善性能(A code change that improves performance)            |
| test     | 测试(when adding missing tests)                              |
| build    | 变更项目构建或外部依赖（例如 scopes: webpack、gulp、npm 等） |
| ci       | 更改持续集成软件的配置文件和 package 中的 scripts 命令，例如 scopes: Travis, Circle 等 |
| chore    | 变更构建流程或辅助工具(比如更改测试环境)                     |
| revert   | 代码回退                                                     |

1. 第一步是选择type，本次更新的类型第二步选择本次修改的范围（作用域）

![image-20210723150147510](https://tva1.sinaimg.cn/large/008i3skNgy1gsqw8ca15oj30r600wmx4.jpg)

* 第三步选择提交的信息  

![image-20210723150204780](https://tva1.sinaimg.cn/large/008i3skNgy1gsqw8mq3zlj60ni01hmx402.jpg)

* 第四步提交详细的描述信息

![image-20210723150223287](https://tva1.sinaimg.cn/large/008i3skNgy1gsqw8y05bjj30kt01fjrb.jpg)

* 第五步是否是一次重大的更改

![image-20210723150322122](https://tva1.sinaimg.cn/large/008i3skNgy1gsqw9z5vbij30bm00q744.jpg)

* 第六步是否影响某个open issue

![image-20210723150407822](https://tva1.sinaimg.cn/large/008i3skNgy1gsqwar8xp1j30fq00ya9x.jpg)

我们也可以在scripts中构建一个命令来执行 cz：

![image-20210723150526211](https://tva1.sinaimg.cn/large/008i3skNgy1gsqwc4gtkxj30e207174t.jpg)

#### 05 | commitlint

> eslint commit-msg

如果我们按照cz来规范了提交风格，但是依然有同事通过 `git commit` 按照不规范的格式提交应该怎么办呢？

* 我们可以通过commitlint来限制提交；

1.安装 @commitlint/config-conventional 和 @commitlint/cli

```shell
npm i @commitlint/config-conventional @commitlint/cli -D
```

2.在根目录创建commitlint.config.js文件，配置commitlint

```js
module.exports = {  extends: ['@commitlint/config-conventional']}
```

3. 使用husky生成commit-msg文件，验证提交信息：

```shell
npx husky add .husky/commit-msg "npx --no-install commitlint --edit $1"
```

## windos的终端

windos的vscode默认使用的是powershell， 你若总是遇到问题，您应该将vsCode终端改为 cmd更合适。

【git bash】似乎更是一个合适的命令行工具。



## 项目部署和DevOps

### 1.1. 传统的开发模式

在传统的开发模式中，开发的整个过程是按部就班就行：

<img src="https://tva1.sinaimg.cn/large/008i3skNgy1gtt2wf9lezj60xc0b40u102.jpg" alt="早期的开发模式" style="zoom:67%;" />

但是这种模式存在很大的弊端：

* 工作的不协调：开发人员在开发阶段，测试和运维人员其实是处于等待的状态。等到测试阶段，开发人员等待测试反馈bug，也会处于等待状态。
* 线上bug的隐患：项目准备交付时，突然出现了bug，所有人员需要加班、等待问题的处理；



### 1.2. DevOps开发模式

DevOps是Development和Operations两个词的结合，将开发和运维结合起来的模式：

![打开格局](https://tva1.sinaimg.cn/large/008i3skNgy1gtt32mnaj8j60k007ngmc02.jpg)

<img src="https://tva1.sinaimg.cn/large/008i3skNgy1gtt33f78kdj60fk0fkgmc02.jpg" alt="DevOps模式" style="zoom:67%;" />

### 1.3. 持续集成和持续交付

伴随着DevOps一起出现的两个词就是持续集成和持续交付(部署)：

* CI是Continuous Integration（持续集成）；
* CD是两种翻译：Continuous Delivery（持续交付）或Continuous Deployment（持续部署）；

持续集成CI：

<img src="https://tva1.sinaimg.cn/large/008i3skNgy1gtt3bgnnvbj60rs0c8dgu02.jpg" alt="持续集成" style="zoom:67%;" />

持续交付和持续部署：

<img src="https://tva1.sinaimg.cn/large/008i3skNgy1gtt3da1cd2j60rs0kkmz602.jpg" alt="持续交付" style="zoom:67%;" />

<img src="https://tva1.sinaimg.cn/large/008i3skNgy1gtt3dtbewsj60rs0kk76a02.jpg" alt="持续部署" style="zoom:67%;" />

### 1.4. 自动化部署流程

![自动化部署的流程](https://tva1.sinaimg.cn/large/008i3skNgy1gtt5buus2kj60wu0lgq7002.jpg)



## 购买云服务器

### 2.1. 注册阿里云的账号

云服务器我们可以有很多的选择：阿里云、腾讯云、华为云。

* 目前在公司使用比较多的是阿里云；
* 我自己之前也一直使用阿里云，也在使用腾讯云；
* 之前华为云也有找我帮忙推广他们的活动；

但是在我们的课程中，我选择目前使用更加广泛的阿里云来讲解：

我们需要注册阿里云账号

* https://aliyun.com/

* 注册即可，非常简单



### 2.2. 购买云服务器

购买云服务器其实是购买一个实例。

1.来到控制台：

![image-20201204152032769](https://tva1.sinaimg.cn/large/0081Kckwgy1glbumqekwhj31ct0p8grl.jpg)



2.创建实例，选择类型和配置

3.配置网络安全组

![image-20201203103725892](https://tva1.sinaimg.cn/large/0081Kckwgy1glagts0xxuj31at0nyq87.jpg)

4.创建实例

![image-20201203104249296](https://tva1.sinaimg.cn/large/0081Kckwgy1glagzdiwnpj31bk0o5433.jpg)



## 搭建服务器环境

### 3.1. jenkins自动化部署

#### 3.1.1. 安装Java环境

Jenkins本身是依赖Java的，所以我们需要先安装Java环境：

* 这里我安装了Java1.8的环境

```shell
dnf search java-1.8
dnf install java-1.8.0-openjdk.x86_64
```



#### 3.1.2. 安装Jenkins

因为Jenkins本身是没有在dnf的软件仓库包中的，所以我们需要连接Jenkins仓库：

* wget是Linux中下载文件的一个工具，-O表示输出到某个文件夹并且命名为什么文件；
* rpm：全称为**The RPM Package Manage**，是Linux下一个软件包管理器；

```shell
wget –O /etc/yum.repos.d/jenkins.repo http://pkg.jenkins-ci.org/redhat-stable/jenkins.repo

# 导入GPG密钥以确保您的软件合法
rpm --import https://pkg.jenkins.io/redhat/jenkins.io.key
# 或者
rpm --import http://pkg.jenkins-ci.org/redhat/jenkins-ci.org.key
```

编辑一下文件/etc/yum.repos.d/jenkins.repo

* 可以通过vim编辑

```
[jenkins]

name=Jenkins-stable

baseurl=http://pkg.jenkins.io/redhat

gpgcheck=1
```

安装Jenkins

```shell
dnf install jenkins # --nogpgcheck(可以不加)
```

启动Jenkins的服务：

```shell
systemctl start jenkins
systemctl status jenkins
systemctl enable jenkins
```

Jenkins默认使用8080端口提供服务，所以需要加入到安全组中：

![image-20201204173117359](https://tva1.sinaimg.cn/large/0081Kckwgy1glbyeoz6tqj315w0bzmzj.jpg)





#### 3.1.3. Jenkins用户

我们后面会访问centos中的某些文件夹，默认Jenkins使用的用户是 `jenkins`，可能会没有访问权限，所以我们需要修改一下它的用户：

修改文件的路径：`/etc/sysconfig/jenkins`

![image-20210825162827962](https://tva1.sinaimg.cn/large/008i3skNgy1gtt46oxg53j60n00aw75302.jpg)

之后需要重启一下Jenkins：

```shell
systemctl restart jenkins
```



#### 3.1.4. Jenkins配置

打开浏览器，输入：http://8.134.60.235:8080/

* 注意：你输入自己的IP地址

获取输入管理员密码：

* 在下面的地址中 `cat /var/lib/jenkins/secrets/initialAdminPassword`

![image-20201203173047824](../../../Users/coderwhy/Library/Application Support/typora-user-images/image-20201203173047824.png)

可以安装推荐的插件：

![安装推荐的插件](https://tva1.sinaimg.cn/large/0081Kckwgy1glbylb26ouj30fb082js7.jpg)



#### 3.1.5. Jenkins任务

**新建任务：**

![新建任务](https://tva1.sinaimg.cn/large/0081Kckwgy1glc0uinjzej30pa0fet9z.jpg)

![image-20201204185613061](https://tva1.sinaimg.cn/large/0081Kckwgy1glc0v225vaj30wl0hkn05.jpg)

**配置项目和保留策略：**

![image-20210825160744119](https://tva1.sinaimg.cn/large/008i3skNgy1gtt3l4fjm6j614p0d2dgl02.jpg)

**源码管理：**

![image-20210825160818122](https://tva1.sinaimg.cn/large/008i3skNgy1gtt3lpcvtgj614k0j8jsn02.jpg)

**构建触发器：**

这里的触发器规则是这样的：

* 定时字符串从左往右分别是：分 时 日 月 周

```js
#每半小时构建一次OR每半小时检查一次远程代码分支，有更新则构建
H/30 * * * *

#每两小时构建一次OR每两小时检查一次远程代码分支，有更新则构建
H H/2 * * *

#每天凌晨两点定时构建
H 2 * * *

#每月15号执行构建
H H 15 * *

#工作日，上午9点整执行
H 9 * * 1-5

#每周1,3,5，从8:30开始，截止19:30，每4小时30分构建一次
H/30 8-20/4 * * 1,3,5
```



![触发器](https://tva1.sinaimg.cn/large/008i3skNgy1gtt419gw6tj614g0agmy402.jpg)

**构建环境：**

注意：我们需要搭建Node的环境

* 第一步：配置Node的环境；
* 第二步：安装Node的插件；

![image-20201204190055096](https://tva1.sinaimg.cn/large/0081Kckwgy1glc0zyecd4j31ar0ecjuz.jpg)

第一步：配置Node的环境

![node环境](https://tva1.sinaimg.cn/large/008i3skNgy1gtt42elwduj614h0elwfq02.jpg)

第二步：安装Node的插件

* 这里因为我已经安装过了，所以没有搜索到；

![image-20201204185949452](https://tva1.sinaimg.cn/large/0081Kckwgy1glc0yta64bj30r907caam.jpg)



构建执行的任务：

* 查看Node的版本等是否有问题；
* 执行 `npm install` 安装项目的依赖；
* 移除原来mall_cms文件的所有内容；
* 将打包的dist文件夹内容移动到mall_cms文件夹；

```shell
pwd
node -v
npm -v

npm install 
npm run build

pwd

echo '构建成功'

ls

# 删除/root/mall_cms文件夹里所有的内容
rm -rf /root/mall_cms/* 

cp -rf ./dist/* /root/mall_cms/
```



![执行构建任务](https://tva1.sinaimg.cn/large/008i3skNgy1gtt43sz933j614o0dy0tk02.jpg)



### 3.2. nginx安装和配置

#### 3.2.1. 安装nginx

后续我们部署会使用nginx，所以需要先安装一下nginx：

```shell
dnf install nginx
```

启动nginx：

```shell
systemctl start nginx
systemctl status nginx
systemctl enable nginx
```



#### 3.2.2. 配置nginx

我们这里主要配置nginx的用户和默认访问目录：

配置用户：

![image-20210825163329209](https://tva1.sinaimg.cn/large/008i3skNgy1gtt4bwvxc4j60f30453yk02.jpg)



通过Linux命令创建文件夹和文件：

```shell
mkdir /root/mall_cms
cd /root/mall_cms
touch index.html

vi index.html
```



配置访问目录：

![image-20210825163406566](https://tva1.sinaimg.cn/large/008i3skNgy1gtt4cka6hgj60n00bwgmc02.jpg)



