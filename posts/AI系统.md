---
title: 游戏AI系统
date: 2025-12-05
experct:
---



## Publish-subscribe Pattern

- Event Definition
- Callback Registration ( `Invoke` )激活处理方法
- Dispatch



## 热更新 脚本语言

`c++` 编译型语言，修改后需要整个游戏重新编译一次

`scrpiting Languages` 解释性语言，可以按照修改后代码运行，不需要编译，运行在sandbox中，但是速度慢

通过编译转换成二进制语言，通过虚拟机运行



## Visual Scripting 可视化脚本（蓝图）



## 3C

- character
  - 移动 设计
- control 输入设备
- camera



## Navigation

- walkable area

如何让计算机知道哪里可以通行？

- Waypoint Network
- Grid
- Navigation Mesh

 ## Steering Movement



## 决策与感知

- 个人信息
- 环境信息
- influence Map 热力图

#### 状态机



#### 行为树

- Execute Nodes
  - Condition node
  - Action node
- Control Nodes
  - Sequence 遍历执行子节点
  - Selector 选择执行子节点
  - Parallel 并行
