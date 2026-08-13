# BVM Instruction Set Documentation

## Instruction Format Description
- **6‑byte instruction**: `[opcode] [dest] [src]` (2 bytes per field)
- **4‑byte instruction**: `[opcode] [addr]` (jump, single‑operand instructions)
- **2‑byte instruction**: `[opcode]` (no operand)

## Instruction Opcode Table
| Opcode Hexadecimal | Opcode Decimal | Opcode Binary | Mnemonic | Length |
| --- | --- | --- | --- | --- |
| 0000 | 0 | 0000 0000 0000 0000 | MOV | 6 |
| 0001 | 1 | 0000 0000 0000 0001 | ADD | 6 |
| 0002 | 2 | 0000 0000 0000 0010 | SUB | 6 |
| 0003 | 3 | 0000 0000 0000 0011 | MUL | 6 |
| 0004 | 4 | 0000 0000 0000 0100 | DIV | 6 |
| 0005 | 5 | 0000 0000 0000 0101 | SYSCALL | 2 |
| 0006 | 6 | 0000 0000 0000 0110 | JMP | 4 |
| 0007 | 7 | 0000 0000 0000 0111 | JZ | 4 |
| 0008 | 8 | 0000 0000 0000 1000 | JNZ | 4 |
| 0009 | 9 | 0000 0000 0000 1001 | JE | 4 |
| 000A | 10 | 0000 0000 0000 1010 | JNE | 4 |
| 000B | 11 | 0000 0000 0000 1011 | JC | 4 |
| 000C | 12 | 0000 0000 0000 1100 | JNC | 4 |
| 000D | 13 | 0000 0000 0000 1101 | SHL | 6 |
| 000E | 14 | 0000 0000 0000 1110 | SHR | 6 |
| 000F | 15 | 0000 0000 0000 1111 | CMP | 6 |
| 0010 | 16 | 0000 0000 0001 0000 | AND | 6 |
| 0011 | 17 | 0000 0000 0001 0001 | OR | 6 |
| 0012 | 18 | 0000 0000 0001 0010 | NOT | 4 |
| 0013 | 19 | 0000 0000 0001 0011 | MOVR | 6 |
| 0014 | 20 | 0000 0000 0001 0100 | NOP | 2 |
| 0015 | 21 | 0000 0000 0001 0101 | XOR | 6 |
| 0016 | 22 | 0000 0000 0001 0110 | XNOR | 6 |
| 0017 | 23 | 0000 0000 0001 0111 | GETPC | 2 |
| 0018 | 24 | 0000 0000 0001 1000 | PUSH | 4 |
| 0018 | 25 | 0000 0000 0001 1001 | POP | 4 |

---

## Register Encoding Table

| Register | Number (Hexadecimal) | Read/Write |
| :--- | :--- | :--- |
| AR | 0000 | Read/Write |
| BR | 0001 | Read/Write |
| CR | 0002 | Read/Write |
| DR | 0003 | Read/Write |
| ER | 0004 | Read/Write |
| FR | 0005 | Read/Write |
| GR | 0006 | Read/Write |
| ERR | 0007 | Read‑Only |
| ERC | 0008 | Read‑Only |
| AZ | 0009 | Read‑Only |
| AE | 000A | Read‑Only |
| AC | 000B | Read‑Only |
| SP | 000C | Read/Write |
| AdR | 000E | Read/Write |

---

Last Updated: 2026-8-13 | Author: qpwq1 (XaoDingx)