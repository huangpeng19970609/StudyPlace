## Git

#### 0 初次配置
1. git config --global user.name 'huangpeng'
2. git config --global user.email '指定邮箱'

番外使用GitHub来托管代码
  1. 创建SSH Key

     请注意这里要输入密码！

    ssh-keygen -t rsa -C "你的邮箱账号"
  2. Github网站

    Account setting => Add SSH Key 添加公钥111

删除关系： 远程库
  git remote -v 查看远程库信息
  git remote rm <name> 删除本地与远程关系

#### 1 克隆并关联

1. 克隆
  ```Shell
  git clone git://git.kernel.org/pub/scm/git/git.git
  ```

2. 关联
    查看远程库信息 git remote -v
    删除本地与远程库的关系 git remote rm <name>
  ```Shell
    git remote add origin https://github.com/huangpeng19970609/StudyPlace.git

    【orgin】 远程库，默认是orgin 约定俗成
  ```

3. 推送(-u是默认关联，以后push默认为该origin master)
  ```Shell
    git push -u origin master
  ```


#### 2 提交文件
>工作区 (add)=> 暂存区 (commit)=> 本地git库 (push)=> 远程库  
1. git add [参数]  [--] <路径>
   ```Shell
    git add <文件名> 
    将修改操作的文件和未跟踪新添加的文件添加到git系统的暂存区，注意不包括删除
   ```

    git add -u <文件名> 
    【-u 即 --update, 更新那些被跟踪的文件】
    表示将已跟踪文件中的修改和删除的文件添加到暂存区，不包括新增加的文件
    注意这些被删除的文件被加入到暂存区再被提交并推送到服务器的版本库之后这个文件就会从git系统中消失了


    git add -A 
    【-A == --all 】
    表示将所有的已跟踪的文件的修改与删除和新增的未跟踪的文件都添加到暂存区。
   ``` 
2.  git commit
   ```Shell
    git commit -m [message]
    将暂存区内容添加到本地仓库中

    git commit [file1] [file2] ... -m [message]
    提交暂存区的指定文件到仓库区
   ```
3. git push 
用于从将本地的分支版本上传到远程并合并。
   ```Shell
    git push <远程主机名> <本地分支名>:<远程分支名>
    例如: git push origin master:master

    如果本地分支名与远程分支名相同，则可以省略冒号：
    git push origin master
   ```
其他：
  1. git status命令表示：文件（文件夹）在 工作区 与 暂存区的状态


#### 3 放弃工作区修改 回滚版本 查看不同
1.  git checkout -- [fileName]
  + 当你提交了缓存区以后， 后续又一次修改（此时未add）
    你使用git status命令 会显示如下
    git add(追踪它) || git checkout -- xxx（废弃它）

```shell
  类似回滚检出最近一次的 add 或者 commit。
  git checkout -- readMe.md
```

2. 当然你也可以直接回滚
  ```shell
    【查看历史记录， 确定自己想要回滚的版本】
    git reflog => 查看所有历史
    git log    => 查看提交历史
  
    git reset --hard Head^   ===> 回到上一版本
    git reset --hard 1094a   ===> 回到指定版本
  ```
3. git diff
   ```shell
    git diff --cached          暂存区 与 本地版本库
    git diff                   工作区 与 暂存区
    git diff Head --fileName   工作区 和 版本库     
   ```
#### 4 分支管理
+ Head指向的是当前分支！我们切换分支时候也是切换的是Head指向
+ 如分支【master】

1. 创建与合并分支
 `创建分支`即指向与当前分支【相同的修改节点】,且新创建的分支是独立的。
 ```shell
  git branch       // 查看当前分支
  git branch dev   // 创建新的分支
  git checkout dev // 切换到新的分支
 ```

2. `合并分支`
 ```shell
  git merge dev // 即当前的分支， 与dev这条分支进行【快速模式】的合并。
 ```

3. `删除分支`
 ```shell
  git branch -d dev // 删除分支
  git branch        // 查看当前分支信息
 ```

4. `切换分支`
 ```shell
 git checkout <branch> // 但此命令容易与 git checkout -- <fileName>混淆

 故2.23版本提供了更加合适的命令

 git switch master
 ```
5. `冲突时， 合并分支`
   当我们合并两个分支的时候可能遇到这样的问题
  ```js
    <<<<<<<<<<<< 
      hello  当前分支的内容
    ============
      master 分支内容
    >>>>>>>>>>>>>
  ```
  此时请手动处理他们


6. 不使用【快速模式】的合并
   ```shell
    git merge --no-ff -m "不是快速合并的合并" dev
    最大的区别便是这相当于一次commit
   ```

#### 5 Bug分支 

1. bug分支的原因
    需求:       我们修要来修复bug, 仅针对于master的bug修复，但dev分支上仍有正在开发的代码;
             故此时我们要检出新的分支. 故我们要在dev分支 切换至 bug分支上， 
    导致问题:   但dev分支不干净，无法切换怎么办？

解决: `git stash`


#### Bug分支 
## Git