---
title: UGUI
date: 2025-11-25
excerpt: IMGUI(GUI、通常用来制作内置编辑器) -> NGUI ->UGUI->UIElements(开发内置编辑器功能)
---

IMGUI(GUI、通常用来制作内置编辑器) -> NGUI ->UGUI->UIElements(开发内置编辑器功能)

UGUI是unity内置的UI开发工具

## 1. 六大基础组件

**Rect Transform**：UI对象位置锚点控制组件

- Pivot：轴心点(0~1)，旋转、移动中心
- Anchors：

**Canvas**：画布组件，用于渲染UI控件

- 游戏场景中的物体与UI界面分别使用摄像机渲染
- UI`camera`不使用天空盒，UI空白处透明
- 想要在UI前面渲染物体时，可以把物体放在`Camera`组件的子物体下

**Canvas Scaler**：画布分辨率自适应

- UI原始尺寸：
  $$
  图片大小(像素) / pixels Per Unit / Reference Pixels Per Unit
  $$

- 图片大小与pixelsPerUnit大小成`反比`

- 与ReferencePixelsPerUnit成`正比`

**Graphic Raycaster**：射线事件交互组件

- 通过图形检测，而不是通过碰撞器检测射线

- 覆盖渲染模式无效

**EventSystem**：玩家输入事件响应系统

**Standalone Input Module**：独立输入模块组件



## 2. 三大基础控件

- Image
- Text
- Rawimage（显示大图）

`图集`

## 3. 组合控件

- Toggle
- Slider
- ...

## 4. 常用事件

[链接]: https://docs.unity3d.com/cn/current/Manual/SupportedEvents.html

对于组件中的默认事件只有点击等事件，只能设置调用函数

Unity提供的多种事件用来处理输入模块和触摸输入时间，有两种实现方式：

#### 1. 继承接口



#### 2. EventTrigger

- 拖拽

​	在物体上添加EventTrigger组件，通过拖拽触发函数实现

- 代码中实现

​	在代码中添加`EventTrigger.Entry`添加监听函数实现

```csharp
// 事件触发器组件
public EventTrigger et;

void Start()
{
    EventTrigger.Entry entry1 = new EventTrigger.Entry();
    EventTrigger.Entry entry2 = new EventTrigger.Entry();
    entry1.eventID = EventTriggerType.BeginDrag;
    entry2.eventID = EventTriggerType.EndDrag;
    entry1.callback.AddListener((BaseEventData eventData) =>
    {
        PointerEventData ed = eventData as PointerEventData;
    });
	et.triggers.Add(entry1);
}
```



## 5. RectTransformUtility工具类

将屏幕坐标/世界坐标转换



## 6. 自动布局

- Horizontial Layout
- Vertical Layout
- Grid Layout
- 内容自适应

