---
title: NGUI
date: 2025-11-17
excerpt: NGUI学习、实践小项目
---

<<<<<<< HEAD
## 使用指南

​	在项目中，通过xml文件持久化存储数据，使用NGUI搭建UI界面

![](..\Img\NGUIImg.png)

> 数据封装成类对象

面板中的数据通过`UIDataMgr`单例对象进行管理，访问`UIDataMgr`实例对象读取、修改数据。在`UIDataMgr`中通过`XmlDataMgr`访问并修改硬盘中的数据。

```cs
public abstract class BasePanel:MonoBehivor
{
    protected void Start()
    {
        InitPanel();
    }
    
    // 在父类中声明InitPanel()函数，并在Start中调用，则基类中只需要实现InitPanel，无需重写Start生命函数。
    protected abstract void InitPanel();
}
```

> UI和场景对象分别渲染

通过多个`camera`分别渲染不同层级的对象

## 使用问题
=======
------

**界面2D/3D的切换**
>>>>>>> blog/master

​	NGUI的界面有两种事件类型为`2D UI`和`3D UI`，转换UI类型时，需要改变`Event type`，同时要改变按钮的碰撞器类型(2d/3d)，否则界面显示出现问题。

------

