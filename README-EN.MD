# TurboBOS

**TurboBOS** is an operating system kernel simulation project running on TurboWarp, featuring memory management, process scheduling, a file system, system calls, and a custom scripting language (BM). It is a core component of the **BTA ecosystem** (BOS Software Technology Aggregate).

> This project is an **educational and demonstrative** operating system kernel simulation. It is **not** a real operating system that can boot on bare metal.

---

## Can it run software?

Yes, but it is still work in progress.

We have designed the ISA (Instruction Set Architecture) for BVM and implemented some of the instructions. The project is currently in a **semi-finished state**. We will continue to develop the compiler (BMC) and scheduler (CFS) in the future.

---

## How to download and run?

### Directory Structure
```
TurboBOS-kernel/
├── kernel/ # Kernel blocks (JSON export)
├── Expand/ # iframe and SCIO subsystem implementation
├── docs/ # Documentation (Chinese & English)
├── README.md # This file (Chinese)
├── README-EN.md # English README
└── LICENSE # GPL-3.0 License
```

### Download

Please download the latest version from [Releases](https://github.com/BTA-System/TurboBOS-kernel/releases). **Avoid downloading old or unstable versions.**

### How to run

1. Visit [TurboWarp](https://turbowarp.org)
2. Click "Load from your computer" in the top-left toolbar and select the downloaded `.sb3` file
3. If you downloaded the `.sprite3` format, click "See inside" first, then upload the `.sprite3` file via the bottom-right button

---

## How is it different from other ScratchOS?

TurboBOS and other ScratchOS projects are **not about who is better** — they have different focuses:

| Aspect | TurboBOS | Other ScratchOS |
|--------|----------|-----------------|
| Core Goal | Simulate operating system kernel behavior | Build graphical interfaces and interactive experiences |
| Main Challenge | Memory management, instruction sets, scheduling | UI design, animations, event handling |
| Focus | Education and kernel implementation | Visuals and user experience |

Both are engineering explorations within the Scratch/TurboWarp ecosystem.

---

## Why can't I use it out of the box?

TurboBOS is a **kernel**. It does not include a desktop environment, command-line tools, or applications by itself. These will be provided by other components of the BTA ecosystem, such as:

- **Bsh**: Command-line interface
- **BMC**: BM language compiler
- **BOSP**: Official distribution (BOS Open Source Project)

We will begin developing these components once the kernel is close to completion.

---

## Design Philosophy

### Everything I Make

Use extensions as little as possible. External capabilities are only used when absolutely necessary.

### Everything Decoupled

Modules are clearly layered, and each module solves only one problem. For example:

- BVM's instruction interpreter, fetch loop, and CFS scheduler are independent of each other
- Each module does one thing only

> Note: There is significant coupling between BOS and BVM, and they are currently difficult to fully separate. This reflects the current architectural reality.

---

## License

This project is licensed under the **GPL-3.0** License. See the `LICENSE` file for details.

---

## Related Links

- [BTA Ecosystem](https://github.com/BTA-System)
- [BOS Official Website](https://bta-system.github.io/TurboBOS-kernel/)
- [BOS GitHub Repository](https://github.com/BTA-System/TurboBOS-kernel)
