(function(Scratch) {
    'use strict';

    if (!Scratch.extensions.unsandboxed) {
        throw new Error('BOS Keyboard 扩展必须在非沙盒模式下运行');
    }

    class BOSKeyboard {
        constructor() {
            this._keyCode = 0;
            this._keyName = '';
            this._pressedKeys = [];
        }

        getInfo() {
            return {
                id: 'boskeyboard',
                name: 'BOS Keyboard',
                blocks: [
                    {
                        opcode: 'whenKeyEvent',
                        blockType: Scratch.BlockType.EVENT,
                        text: '当有键盘事件触发时',
                        isEdgeActivated: false
                    },
                    {
                        opcode: 'getKeyCode',
                        blockType: Scratch.BlockType.REPORTER,
                        text: '键号'
                    },
                    {
                        opcode: 'getKeyName',
                        blockType: Scratch.BlockType.REPORTER,
                        text: '键名'
                    },
                    {
                        opcode: 'getCombinationKey1',
                        blockType: Scratch.BlockType.REPORTER,
                        text: '组合键 1'
                    },
                    {
                        opcode: 'getCombinationKey2',
                        blockType: Scratch.BlockType.REPORTER,
                        text: '组合键 2'
                    },
                    {
                        opcode: 'getCombinationKey3',
                        blockType: Scratch.BlockType.REPORTER,
                        text: '组合键 3'
                    }
                ]
            };
        }

        getKeyCode() {
            return this._keyCode || 0;
        }

        getKeyName() {
            return this._keyName || '';
        }

        getCombinationKey1() {
            return this._pressedKeys[0] || '';
        }

        getCombinationKey2() {
            return this._pressedKeys[1] || '';
        }

        getCombinationKey3() {
            return this._pressedKeys[2] || '';
        }

        _updatePressedKeys(e) {
            const keyName = e.key || e.code || '';
            if (!this._pressedKeys.includes(keyName)) {
                this._pressedKeys.push(keyName);
            }
            this._keyCode = e.keyCode || e.which;
            this._keyName = keyName;
            Scratch.vm.runtime.startHats('boskeyboard_whenKeyEvent');
        }

        _removePressedKey(e) {
            const keyName = e.key || e.code || '';
            const index = this._pressedKeys.indexOf(keyName);
            if (index !== -1) {
                this._pressedKeys.splice(index, 1);
            }
        }
    }

    const extension = new BOSKeyboard();
    Scratch.extensions.register(extension);

    function isInputElement(target) {
        const tag = target.tagName.toLowerCase();
        return tag === 'input' || tag === 'textarea' || target.isContentEditable;
    }

    document.addEventListener('keydown', function(e) {
        // 只有非输入框才阻止默认行为（保留输入框的正常输入）
        if (!isInputElement(e.target)) {
            e.preventDefault();
        }
        extension._updatePressedKeys(e);
    }, true);

    document.addEventListener('keyup', function(e) {
        // 只有非输入框才阻止默认行为
        if (!isInputElement(e.target)) {
            e.preventDefault();
        }
        extension._removePressedKey(e);
    }, true);

})(Scratch);
