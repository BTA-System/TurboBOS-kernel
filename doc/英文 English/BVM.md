# BVM Instruction Set Documentation

## Instruction Format Description
- **6-byte instruction**: `[opcode] [dest] [src]` (2 bytes per field)
- **4-byte instruction**: `[opcode] [addr]` (jump, single-operand instructions)
- **2-byte instruction**: `[opcode]` (no operand)

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
| 0017 | 23 | 0000 0000 0001 0111 | PUSH | 4 |
| 0018 | 24 | 0000 0000 0001 1000 | POP | 4 |

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
| SP | 0007 | Read/Write |
| AdR | 0008 | Read/Write |
| AC | 0009 | Read-Only |
| AE | 000A | Read-Only |
| AZ | 000B | Read-Only |
| ERR | 000C | Read-Only |
| ERC | 000D | Read-Only |
| PC | 000E | Read/Write (can be indirectly modified via JMP) |

*The PC register is decimal in the Kernel; the value obtained when actually passed to BVM/programs is binary*

---

## Register Bit Widths

| Register | Bit Width |
| :--- | :--- |
| AR | 16 |
| BR | 16 |
| CR | 16 |
| DR | 16 |
| ER | 16 |
| FR | 16 |
| GR | 16 |
| SP | 16 |
| Adr | 16 |
| AC | 1 |
| AE | 1 |
| AZ | 1 |
| ERR | 1 |
| ERC | 16 |
| PC | 16 |

*AR–GR are general-purpose registers, AC, AE, AZ, and ERR are flag registers, and AdR and SP are pointer registers (SP is the stack pointer, and AdR is a general-purpose pointer register). ERR and ERC are both system call register flags*

---

## Special Registers (Invisible to BVM Programs, Kernel Constants)
| Register | Bit Width | Remarks |
| :--- | :--- | :--- |
| SD | 16 | Start Data, the start address of the DATA segment; minus 1 is the end of the TEXT segment |
| SS | 16 | Start Stack, the start address of the Stack segment; minus 1 is the end of the DATA segment |
| ES | 16 | End Stack, the end address of the Stack segment; plus 1 is the start address of the HEAP segment |
| BASE | 16 | RAM start address, constant maintained at 0x0000 |
| LIMIT | 16 | RAM end address, constant maintained at 0xFFFF |

*For the LIMIT register, we will look into whether to add more address lines in the future, and the bit width of this register will change. It is for kernel use only*

---

Last Updated: 2026-10-25 | Author: qpwq1 (XaoDingx)
