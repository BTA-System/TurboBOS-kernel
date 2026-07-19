// BOS Upload Extension v1.1 (无空格)
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

                    // 转换为二进制字符串（连续，无空格）
                    let binaryStr = '';
                    for (let i = 0; i < bytes.length; i++) {
                        const byte = bytes[i];
                        const bin8 = byte.toString(2).padStart(8, '0');
                        // 补0到16位
                        binaryStr += '00000000' + bin8;
                    }
                    this._fileBinary = binaryStr;

                    // 对于特定扩展名，读取文本内容
                    const textExts = ['bm', 'bmc', 'bsh'];
                    if (textExts.includes(ext)) {
                        const textReader = new FileReader();
                        textReader.onload = (ev) => {
                            this._fileText = ev.target.result;
                            this._fireHat();
                            document.body.removeChild(input);
                        };
                        textReader.readAsText(file);
                    } else {
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

        // 帽子积木
        whenFileSelected() {}

        // 报告器
        getFileName() {
            return this._fileName || '';
        }

        getFileExt() {
            return this._fileExt || '';
        }

        getFileText() {
            return this._fileText || '';
        }

        getFileBinary() {
            return this._fileBinary || '';
        }
    }

    Scratch.extensions.register(new BOSUpload());
})(Scratch);
