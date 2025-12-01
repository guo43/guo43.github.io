---
title: UGUI
date: 2025-11-25
excerpt: IMGUI(GUI、通常用来制作内置编辑器) -> NGUI ->UGUI->UIElements(开发内置编辑器功能)
---

IMGUI(GUI、通常用来制作内置编辑器) -> NGUI ->UGUI->UIElements(开发内置编辑器功能)

UGUI是unity内置的UI开发工具

## 1. 六大基础组件

Rect Transform：UI对象位置锚点控制组件

Canvas：画布组件，用于渲染UI控件

Canvas Scaler：画布分辨率自适应

Graphic Raycaster：射线事件交互组件

EventSystem：玩家输入事件响应系统

Standalone Input Module：独立输入模块组件



## 2.图集

1. 安装`2D Sprite`包
2. 在Project setting\Editor中， 设置Sprite Packer

注意：

- 打包UI图集时，不要勾选allow Rotation，Tight Packing

## 3.事件监听

[常用事件]: https://docs.unity.cn/cn/2020.3/Manual/SupportedEvents.html	""常用事件""

#### 第一种方式 (继承实现接口方法)



#### 第二种方式（添加EventTrigger组件）

EventTrigger是接口方法的一个整合类，可以通过拖拽的方式添加事件方法，也可以通过代码动态添加事件。

```cs
EventTrigger et;
trigger = new EventTrigger.Entry();
trigger.eventID = EventTriggerType.Drag;
trigger.callback.AddListener(moveGO);
et.triggers.Add(trigger);
```

注意：

- **Drag事件**只在鼠标/手指**移动时**触发
- 当鼠标/手指**静止不动**时，Drag事件**不再被调用**

## 3. RectTransformUtility

- 屏幕坐标/世界坐标的转换

跟随物体移动

```cs
public class Wheel : MonoBehaviour
{
    public RectTransform rectTransform;
    private RectTransform rt;
    public GameObject target;
    public EventTrigger et;
    public Vector3 direction;
    public bool isDrag;

    private void Start()
    {
        rt = GetComponent<RectTransform>();
        EventTrigger.Entry entry = new EventTrigger.Entry();
        entry.eventID = EventTriggerType.Drag;
        entry.callback.AddListener(movePos);
        et.triggers.Add(entry);

        rt.anchoredPosition = Vector2.zero;
    }

    private void Update()
    {
        if (isDrag)
        {
            target.transform.rotation = Quaternion.LookRotation(direction);
            target.transform.Translate(target.transform.forward * 50 * Time.deltaTime, Space.World);
        }
    }

    private void movePos(BaseEventData eventData)
    {
        isDrag = true;
        Vector2 currentPos = Vector2.zero;
        PointerEventData data = eventData as PointerEventData;
        RectTransformUtility.ScreenPointToLocalPointInRectangle(rectTransform, data.position, data.enterEventCamera, out currentPos);

        rt.anchoredPosition += data.delta;
        if (rt.anchoredPosition.magnitude > 100)
        {
            rt.anchoredPosition = rt.anchoredPosition.normalized * 100;
        }
        Debug.Log(rt.anchoredPosition);
        direction = new Vector3(currentPos.normalized.x, 0, currentPos.normalized.y);
    }
}

```

