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
- 
