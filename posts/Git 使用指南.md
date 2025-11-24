# Git 使用指南

Git 是一个分布式版本控制系统，用于管理代码和文档的版本。它可以帮助开发者高效协作、追踪历史记录、管理分支与合并代码。本文将详细介绍 Git 的使用方法、远程仓库操作、分支管理及其工作原理。

---

## 目录
1. [Git 基础概念](#git-基础概念)
2. [Git 安装与配置](#git-安装与配置)
3. [Git 常用命令](#git-常用命令)
4. [远程仓库操作](#远程仓库操作)
5. [分支管理](#分支管理)
6. [Git 工作原理](#git-工作原理)
7. [常见操作示例](#常见操作示例)

---

## Git 基础概念

- **工作区（Working Directory）**  
  本地可见的文件目录，用于编辑和修改代码。
  
- **暂存区（Staging Area / Index）**  
  临时存储已修改但未提交的文件，可控制哪些修改进入下一次提交。
  
- **本地仓库（Local Repository）**  
  保存完整版本历史的仓库，位于 `.git` 目录下。
  
- **远程仓库（Remote Repository）**  
  托管在服务器上的仓库，如 GitHub、GitLab、Gitee，可与本地仓库同步。

---

## Git 安装与配置

### 安装 Git

- Windows: [Git 官网下载](https://git-scm.com/download/win)
- macOS: `brew install git`
- Linux: `sudo apt install git` 或 `sudo yum install git`

### 基本配置

```bash
git config --global user.name "你的名字"
git config --global user.email "你的邮箱"
git config --global core.editor "vim"  # 可选，设置默认编辑器
git config --list  # 查看当前配置
```

### Git 常用命令

#### 仓库操作

```bash
git init           # 初始化本地仓库
git clone <url>    # 克隆远程仓库到本地
```

#### 文件操作

```bash
git status         # 查看文件状态
git add <file>     # 添加文件到暂存区
git add .          # 添加所有修改文件
git commit -m "提交说明"  # 提交到本地仓库
git diff           # 查看未暂存的修改
git log            # 查看提交历史
git rm -r --cache fileName/foldName #--cached 参数：从git索引中移除，但是保留本地文件
```

#### 远程仓库操作

```bash
git remote add origin <url>   # 添加远程仓库
git remote -v                 # 查看远程仓库地址
git push -u origin main       # 推送本地分支到远程
git pull origin main          # 拉取远程更新并合并
git fetch origin              # 获取远程更新但不合并
```

### 分支管理

#### 创建与切换

```bash
git branch <branch-name>      # 创建分支
git checkout <branch-name>    # 切换分支
git switch <branch-name>      # 新命令切换分支
git checkout -b <branch-name> # 创建并切换分支
```

#### 分支合并与删除

```bash
git merge <branch-name>       # 将指定分支branch-name合并到当前分支
git branch -d <branch-name>   # 删除本地分支
git push origin --delete <branch-name>  # 删除远程分支
```

#### 查看分支

```bash
git branch            # 查看本地分支
git branch -r         # 查看远程分支
git branch -a         # 查看所有分支
```

