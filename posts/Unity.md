---
title: Unity
date: 2025-12-18
excerpt: 
---

## 一、Unity特殊文件夹

`Resources`：通过Resources.Load来读取

`StreamingAssets`:只读

`PersistentDataPath`:可读可写，通过Application.persistentDataPath获取路径



## 二、协程 Coroutinue

#### 1. 定义

是“假”的多线程，不是线程。

#### 2. 线程

unity 支持多线程，但是新开线程无法访问Unity相关对象的内容，无法访问`Unity API`。

作为线程可以用来运行复杂算法，将结果放在`共享内存`或者`堆`之中。

需要注意同步数据

```cs
using System.Threading;
using UnityEngine;

public class ThreadTest : MonoBehaviour {

    Thread t;

    void Start()
    {
        t = new Thread(test);
        t.Start();
    }

    void test()
    {
        while (true)
        {
            Thread.Sleep(1000);
            Debug.Log("Thread Test");
        }
            
    }
	// 销毁该线程
    void OnDestroy()
    {
        t.Abort();
        t = null;
    }
}
```

#### 3. 使用场景

异步加载，分时分步，避免卡顿

#### 4. 协程受对象和组件失活销毁的影响

游戏对象、组件销毁不执行

组件失活协程执行

#### 5. 原理

- 调度器
- 协程函数本体

协程本质是一个迭代器`IEnumrator`

使用IEnumrator.MoveNext()调用，可以通过yield return 分段



## 三、同步sync与异步async

异步是同时运行代码，用在Task中。但在异步函数中调用await是，会返回到调用函数，并开启一个线程。

await会让出当前线程

