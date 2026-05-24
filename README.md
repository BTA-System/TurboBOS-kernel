## BOS — New Version Kernel
# BOS是什么？
BOS 是一个运行在 TurboWarp 上的**操作系统内核**，具备完整的内存管理、进程管理、文件系统、系统调用和脚本语言（BM），并设计了一套简单但可扩展的消息协议（SCIO）。


设计哲学

- **宏内核**：UI 和应用交给发行版。
- **异步消息**：SCIO/BM 作为唯一内核入口，负责路由和解释器调度。

---

运行环境

- TurboWarp Desktop或[TurboWarp 网页版](https://turbowarp.org)
- 加载.sb3或.sprite3文件即可运行

基础BM 示例
```bm
// 内存分配与写入
BM::MEM(NEW buf = SIZE(10));
BM::MEM(WRITE buf:0x0 = FF);

// 系统额外库
BM::SYS(INFO);

// 进程通信

BM::PM(START game.html -mygame -1);
BM::PM(SEND "hello" -mygame);
// 进制转换

BM::CPU(CONVERT 16, 10, FF);

---
```
参考：
[早期SCIO 协议设想](https://www.bilibili.com/opus/1164306032705404933)
[比较正式的SCIO 协议设想](https://www.bilibili.com/opus/1187999017941860372)
## 注：本项目的SCIO运行环境基于 TURBOWARP 的 iframe 扩展二次深度定制开发
    原项目地址：https://github.com/TurboWarp/extensions
    原作者：TurboWarp
    改编维护：XaoDingx
