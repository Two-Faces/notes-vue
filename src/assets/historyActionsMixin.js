export default {
    data: () => ({
        history: [],
        pointer: 0
    }),
    computed: {
        isRedo() {
            return this.pointer < (this.history.length - 1);
        },
        isUndo() {
            return this.pointer > 0;
        }
    },
    methods: {
        /**
         * Сохранение действия в истории
         */
        saveHistory() {
            if(this.isRedo)
                this.history = this.history.slice(0, this.pointer)

            this.pointer = this.history.length;

            this.history.push(JSON.parse(JSON.stringify(this.todo)));
        },
        /**
         * Отменить изменение
         */
        undo() {
            this.pointer--;
            this.todo = [...this.history[this.pointer]];
        },
        /**
         * Вернуть отменённое изменение
         */
        redo() {
            this.pointer++;
            this.todo = [...this.history[this.pointer]];
        }
    }
}