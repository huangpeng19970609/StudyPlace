### 1 插件

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


