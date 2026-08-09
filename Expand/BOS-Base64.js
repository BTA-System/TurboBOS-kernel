// BOS-Base64 扩展 - 支持超长文本的 Base64 编解码
(function(Scratch) {
    'use strict';

    class BOSBase64 {
        getInfo() {
            return {
                id: 'bosbase64',
                name: 'BOS-Base64',
                blocks: [
                    {
                        opcode: 'encode',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'Base64 编码 [TEXT]',
                        arguments: {
                            TEXT: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'Hello, BOS!'
                            }
                        }
                    },
                    {
                        opcode: 'decode',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'Base64 解码 [TEXT]',
                        arguments: {
                            TEXT: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'SGVsbG8sIEJPUyE='
                            }
                        }
                    }
                ]
            };
        }

        /**
         * Base64 编码
         * 将任意 UTF-8 文本转换为 Base64 字符串
         */
        encode(args) {
            const text = args.TEXT;
            if (typeof text !== 'string' || text.length === 0) {
                return '';
            }

            try {
                // 1. 将文本编码为 UTF-8 字节序列
                const encoder = new TextEncoder();
                const data = encoder.encode(text);

                // 2. 将 Uint8Array 转换为二进制字符串（btoa 需要）
                let binary = '';
                for (let i = 0; i < data.length; i++) {
                    binary += String.fromCharCode(data[i]);
                }

                // 3. 使用 btoa 进行 Base64 编码
                return btoa(binary);
            } catch (e) {
                // 如果文本过大导致错误，返回空字符串并记录警告
                console.warn('Base64 编码失败:', e.message);
                return '';
            }
        }

        /**
         * Base64 解码
         * 将 Base64 字符串还原为原始 UTF-8 文本
         */
        decode(args) {
            const base64 = args.TEXT;
            if (typeof base64 !== 'string' || base64.length === 0) {
                return '';
            }

            try {
                // 1. 使用 atob 解码 Base64 为二进制字符串
                const binary = atob(base64);

                // 2. 将二进制字符串转换为 Uint8Array
                const len = binary.length;
                const bytes = new Uint8Array(len);
                for (let i = 0; i < len; i++) {
                    bytes[i] = binary.charCodeAt(i);
                }

                // 3. 使用 TextDecoder 解码为 UTF-8 字符串
                const decoder = new TextDecoder();
                return decoder.decode(bytes);
            } catch (e) {
                // 解码失败时返回空字符串
                console.warn('Base64 解码失败:', e.message);
                return '';
            }
        }
    }

    Scratch.extensions.register(new BOSBase64());
})(Scratch);
