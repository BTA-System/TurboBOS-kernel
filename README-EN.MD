`The Chinese version of README.MD is located at ./README.md`

# TurboBOS

**TurboBOS** is an operating-system kernel simulation project running on TurboWarp; the full name is Turbo Basic Operating System. It includes memory management, process scheduling, a file system, system calls, and a self-developed scripting language (BM). It is one of the core components of the BTA system (BOS Software Technology Aggregate).

> This project is an educational and demonstrative OS kernel simulation, not a real operating system that can boot bare metal.

---

## Can it run software?

Yes, but it is still under development.

We have designed the instruction set architecture (ISA) for the BVM and implemented part of the instruction set. The project is currently in a semi-finished state; we will continue developing the compiler (BMC) and the scheduler (CFS).

---

## How to download and run

### Directory structure
```
TurboBOS-kernel/
├── kernel/       # kernel building blocks (JSON export)
├── Expand/       # various JS extensions required by BOS
├── docs/         # documentation (Chinese & English)
├── README.md     # this file
├── README-EN.md  # English README
└── LICENSE       # GPL-3.0 license
```

### Download

Please download the latest release from the [Releases](https://github.com/BTA-System/TurboBOS-kernel/releases) page; avoid downloading older or unstable versions.

### How to run

1. Visit [TurboWarp](https://turbowarp.org).  
2. Click "Open from your computer" in the top-left toolbar and choose the downloaded `.sb3` file.  
3. If you downloaded a `.sprite3` file, click "See source" first, then upload it using the bottom-right upload control.

---

## Differences from other ScratchOS projects

TurboBOS and other ScratchOS projects are not inherently better or worse—just different in focus:

| Direction | TurboBOS | Other ScratchOS |
|----------:|:--------:|----------------:|
| Primary goal | Simulate OS kernel behavior | Build graphical interfaces and interactive experiences |
| Main challenges | Memory management, instruction set, scheduling | UI design, animation, event handling |
| Focus | Education and kernel implementation | Visuals and user experience |

Both are engineering explorations within the Scratch/TurboWarp ecosystem.

---

## Why isn't it "ready out of the box"?

TurboBOS is a kernel and does not include a desktop environment, command-line tools, or applications. Those will be provided by other components in the BTA system, for example:

- **Bsh**: command-line interface  
- **BMC**: BM language compiler  
- **BOSP**: official distribution (BOS Open Source Project)

We will begin developing these components as the kernel nears completion.

---

## Design philosophy

### Do things in-house when possible

Minimize the use of external extensions. External capabilities are used only when absolutely necessary.

### Decouple everything

Modules are clearly layered; each module addresses a single practical problem. For example:

- The BVM instruction interpreter, fetch-execute loop, and the CFS scheduler are independent of one another.  
- Each module should do only one thing.

> Note: There is significant coupling between BOS and BVM, and it is currently difficult to completely separate them. This is the current reality of the architecture.

---

## License

This project is licensed under **GPL-3.0**. See `LICENSE` for details.

---

## Related links

- [BTA system](https://github.com/BTA-System)  
- [BOS website](https://bta-system.github.io/TurboBOS-kernel/)  
- [BOS GitHub repository](https://github.com/BTA-System/TurboBOS-kernel)
