// BOS Upload Extension v1.0
(function(Scratch) {
    'use strict';

    class BOSUpload {
        constructor() {
            this._fileName = '';
            this._fileExt = '';
            this._fileText = '';
            this._fileBinary = '';
            this._fileSelected = false;
        }

        getInfo() {
            return {
                id: 'bosupload',
                name: 'BOS Upload',
                blocks: [
                    {
                        opcode: 'selectFile',
                        blockType: Scratch.BlockType.COMMAND,
                        text: '选择文件'
                    },
                    {
                        opcode: 'whenFileSelected',
                        blockType: Scratch.BlockType.HAT,
                        text: '当文件被选择时',
                        isEdgeActivated: false
                    },
                    {
                        opcode: 'getFileName',
                        blockType: Scratch.BlockType.REPORTER,
                        text: '文件名'
                    },
                    {
                        opcode: 'getFileExt',
                        blockType: Scratch.BlockType.REPORTER,
                        text: '文件扩展名'
                    },
                    {
                        opcode: 'getFileText',
                        blockType: Scratch.BlockType.REPORTER,
                        text: '文件文本'
                    },
                    {
                        opcode: 'getFileBinary',
                        blockType: Scratch.BlockType.REPORTER,
                        text: '文件二进制'
                    }
                ]
            };
        }

        // 选择文件
        selectFile() {
            const input = document.createElement('input');
            input.type = 'file';
            input.style.display = 'none';
            document.body.appendChild(input);

            input.addEventListener('change', (e) => {
                const file = input.files[0];
                if (!file) {
                    document.body.removeChild(input);
                    return;
                }

                const fullName = file.name;
                const ext = fullName.includes('.') ? fullName.split('.').pop().toLowerCase() : '';
                this._fileName = fullName;
                this._fileExt = ext;
                this._fileSelected = true;

                // 读取文件为 ArrayBuffer
                const reader = new FileReader();
                reader.onload = (event) => {
                    const buffer = event.target.result;
                    const bytes = new Uint8Array(buffer);

                    // 转换为二进制字符串（每个字节对齐16位）
                    let binaryStr = '';
                    for (let i = 0; i < bytes.length; i++) {
                        const byte = bytes[i];
                        // 8位二进制，然后前面补0到16位
                        const bin8 = byte.toString(2).padStart(8, '0');
                        binaryStr += '00000000' + bin8; // 16位
                        if (i < bytes.length - 1) binaryStr += ' '; // 空格分隔
                    }
                    this._fileBinary = binaryStr;

                    // 对于特定扩展名，尝试读取文本内容
                    const textExts = ['bm', 'bmc', 'bsh'];
                    if (textExts.includes(ext)) {
                        // 读取文本内容
                        const textReader = new FileReader();
                        textReader.onload = (ev) => {
                            this._fileText = ev.target.result;
                            this._fireHat();
                            document.body.removeChild(input);
                        };
                        textReader.readAsText(file);
                    } else {
                        // 其他文件，文本内容设为空
                        this._fileText = '';
                        this._fireHat();
                        document.body.removeChild(input);
                    }
                };
                reader.readAsArrayBuffer(file);
            });

            input.click();
        }

        // 触发帽子积木
        _fireHat() {
            Scratch.vm.runtime.startHats('bosupload_whenFileSelected');
        }

        // 帽子积木（无实际实现）
        whenFileSelected() {}

        // 报告器：文件名
        getFileName() {
            return this._fileName || '';
        }

        // 报告器：扩展名
        getFileExt() {
            return this._fileExt || '';
        }

        // 报告器：文件文本（仅当扩展名为 .bm/.bmc/.bsh 时有效）
        getFileText() {
            return this._fileText || '';
        }

        // 报告器：文件二进制（所有文件，每个字节16位，空格分隔）
        getFileBinary() {
            return this._fileBinary || '';
        }
    }

    Scratch.extensions.register(new BOSUpload());
})(Scratch);
