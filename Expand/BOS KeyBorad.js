// BOS Keyboard Extension with组合键支持 - 非沙盒模式 (Unsandboxed)

(function(Scratch) {
    'use strict';

    if (!Scratch.extensions.unsandboxed) {
        throw new Error('BOS Keyboard 扩展必须在非沙盒模式下运行');
    }

    class BOSKeyboard {
        constructor() {
            // 存储当前按下的键（按按下顺序）
            this._pressedKeys = [];
            // 存储键码和键名的映射（可选）
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

        // 单个按键报告
        getKeyCode() {
            return this._currentKeyCode || 0;
        }

        getKeyName() {
            return this._currentKeyName || '';
        }

        // 组合键报告
        getCombinationKey1() {
            return this._pressedKeys[0] || '';
        }

        getCombinationKey2() {
            return this._pressedKeys[1] || '';
        }

        getCombinationKey3() {
            return this._pressedKeys[2] || '';
        }

        // 更新按下键列表
        _updatePressedKeys(e) {
            const keyName = e.key || e.code || '';
            // 避免重复添加（按住键会持续触发 keydown）
            if (!this._pressedKeys.includes(keyName)) {
                this._pressedKeys.push(keyName);
            }
            // 保存单个按键信息（最后一个按下的键）
            this._currentKeyCode = e.keyCode || e.which;
            this._currentKeyName = keyName;
        }

        // 从列表中移除按键
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

    // 键盘事件监听
    document.addEventListener('keydown', function(e) {
        // 更新组合键列表
        extension._updatePressedKeys(e);
        // 触发帽子积木
        Scratch.vm.runtime.startHats('boskeyboard_whenKeyEvent');
    });

    document.addEventListener('keyup', function(e) {
        // 从组合键列表中移除
        extension._removePressedKey(e);
        // 也可以选择在释放时触发事件，但通常不需要
        // 如需在释放时触发，可以取消注释下面一行
        // Scratch.vm.runtime.startHats('boskeyboard_whenKeyEvent');
    });

})(Scratch);