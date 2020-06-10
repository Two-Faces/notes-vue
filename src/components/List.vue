<template>
    <ul v-if="todo.length">
        <li v-for="(item, key) in todo" :key="key"
            :class="{completed: item.isChecked}">
            <label v-if="edit === key">
                {{ key + 1 }}. <input v-model="name"
                                      @keyup.enter="save"
                                      @keyup.esc="cancel"
                                      placeholder="Введите название задачи"
                                      class="input">
            </label>
            <label :class="{completed: item.isChecked}" v-else>
                {{ key + 1 }}. <input type="checkbox"
                       :disabled="disabled"
                       :checked="item.isChecked"
                       @input="completed($event.target.checked, key)"/> {{ item.name }}
            </label>
            <template v-if="!disabled">
                <div class="actions" v-if="edit !== key">
                    <button @click="edited(key)">Редактировать</button>
                    <button @click="deleted(key)" class="error">Удалить</button>
                </div>
                <div class="actions" v-else>
                    <button @click="save">Сохранить</button>
                    <button @click="cancel">Отменить</button>
                </div>
            </template>
        </li>
    </ul>
    <i class="not-todo" v-else>
        Список задач пуст
    </i>
</template>

<script>
    export default {
        name: "List",
        data: () => ({
            edit: false,
            name: ''
        }),
        props: {
            todo: {
                type: Array,
                default: () => ([])
            },
            disabled: {
                type: Boolean,
                default: false
            }
        },
        methods: {
            /**
             * Отменить задачу, как выполненную/невыполненную
             * @param value
             * @param key
             */
            completed(value, key) {
                this.$emit('completed', value, key);
            },
            /**
             * Удалить задачу из списка
             * @param key
             */
            deleted(key) {
                this.$emit('deleted', key);

                if(this.edit === key)
                    this.edit = false;
            },
            /**
             * Редактирование названия задачи
             * @param key
             */
            edited(key) {
                this.edit = key;
                this.name = this.todo[key].name;
            },
            /**
             * Отмена редактирования задачи
             */
            cancel() {
                this.edit = false;
                this.name = '';
            },
            /**
             * Сохранение нового названия задачи
             */
            save() {
                this.$emit('rename', this.name, this.edit);

                this.cancel();
            }
        }
    }
</script>

<style scoped lang="scss">
    .not-todo {
        color: #bbb;
        padding: 10px;
        display: block;
    }

    ul{
        list-style: none;
        padding: 10px;
        margin: 0;

        li {
            display: flex;
            align-items: center;
            margin: 3px 0;

            label{
                flex: 1;
            }

            &.completed {
                text-decoration: line-through;
            }
        }
    }
</style>