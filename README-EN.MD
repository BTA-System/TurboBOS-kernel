# TurboBOS

**TurboBOS** is an operating system kernel simulation project that runs on TurboWarp, with its full name being *Turbo Basic Operating System*. It includes memory management, process scheduling, a file system, system calls, and a self-developed scripting language (BM). It is one of the core components of the **BTA ecosystem** (BTA Software Technology Aggregate).

> This project is an **educational and demonstrative** operating system kernel simulation, not a real operating system that can be booted directly on bare metal.

---

## Can it run software?

Yes, but it is still being improved.

We have designed the instruction set architecture (ISA) for BVM and implemented some of the instructions. The project is currently in a **semi-finished state**; we will continue to develop the compiler (BMC) and the scheduler in the future.

---

## How to download and run?

### Directory Structure
```
TurboBOS-kernel/
├── kernel/ # Kernel Core .SB3 File
├── Expand/ # Various JS extensions that BOS depends on
├── doc/ # Documentation (English and Chinese)
├── README.md # This file
├── README-EN.md # English version of README
└── LICENSE # GPL-3.0 license
```
### Download

Please download the latest version from the [Releases](https://github.com/BTA-System/TurboBOS-kernel/releases) page. **Avoid downloading older or unstable versions.**

### How to Run

1. Go to [TurboWarp](https://turbowarp.org)
2. Click "Open from your computer" in the top-left toolbar and select the downloaded `.sb3` file.

---

## Differences from Other ScratchOS Projects

TurboBOS and other ScratchOS projects are **not superior or inferior** to each other; they simply have different directions:

| Aspect | TurboBOS | Other ScratchOS |
|--------|----------|-----------------|
| Core goal | Simulate operating system kernel behavior | Build graphical interfaces and interactive experiences |
| Source of difficulty | Memory management, instruction set, scheduling | UI design, animation, event handling |
| Focus | Education and kernel implementation | Visuals and user experience |

Both are engineering explorations within the Scratch/TurboWarp ecosystem.

---

## Why is it not "plug-and-play" out of the box?

TurboBOS is a **kernel**; it does not itself include a desktop environment, command-line tools, or applications. These will be provided by other components in the BTA ecosystem, such as:

- **Bsh**: command-line interface
- **BMC**: BM language compiler
- **BOSP**: official distribution (BOS Open Source Project)

We will start developing these components when the kernel is nearing completion.

---

## Contributing

Please refer to the file `CONTRIBUTING.md`

## Design Philosophy

### Everything self-made

Try to use as few extensions as possible. External capabilities are only employed when absolutely necessary.

---

## License

This project is licensed under **GPL-3.0** – see the `LICENSE` file for details.

---

## Related Links
> Sometimes you may see TurboBOS written as BOS, but this is just another shorthand way of writing BOS, and there is actually no difference between the two.

- [BTA Technology Ecosystem](https://github.com/BTA-System)
- [BOS Open Source Software Distribution (BOSP) Repository](https://github.com/BTA-System/BOSP)
- [TurboBOS GitHub Repository](https://github.com/BTA-System/TurboBOS-kernel)
- [TurboBOS Documentation](./doc/README.MD)
