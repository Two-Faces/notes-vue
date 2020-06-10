<template>
    <div class="form-wrapper">
        <div class="form-header">
            <h5 v-if="isCreate">Создание заметки</h5>
            <h5 v-else>Редактирование заметки</h5>
        </div>
        <div class="form-body">
            <label class="form-label">
                <h5>Название заметки:</h5>
                <input placeholder="Введите название заметки"
                       v-model="name"
                       v-if="editName"
                       class="input">
                <span v-else>{{ name }}</span>
            </label>
            <div class="todo-list">
                <list :todo="todo"
                      @rename="rename"
                      @deleted="deleted"
                      @completed="completed"/>
                <label class="form-label">
                    <h5>Название задачи:</h5>
                    <input placeholder="Введите название задачи" v-model="todo_name" class="input">
                    <button @click="addTodo">Добавить</button>
                </label>
            </div>
        </div>
        <div class="form-footer">
            <button v-if="isCreate" @click="submit" :disabled="!isValidate">
                {{ isCreate ? 'Создать заметку' : 'Сохранить заметку' }}
            </button>
        </div>
    </div>
</template>

<script>
    import List from "@/components/List";

    export default {
        name: "Form",
        components: {List},
        data: () => ({
            name: '',
            todo: [],
            editName: false,
            todo_name: ''
        }),
        props: {
            type: {
                type: String,
                required: true
            }
        },
        computed: {
            isCreate(){
                return this.type === 'create';
            },
            isValidate() {
                return this.name.length > 2;
            }
        },
        methods: {
            /**
             * Отметка задачи, как выполненная/невыполненная
             */
            completed(value, key) {
                this.todo[key].isChecked = value;
            },
            /**
             *  Удаление задачи
             */
            deleted(key) {
              this.todo.splice(key, 1);
            },
            /**
             * Переименование задачи
             * @param name
             * @param key
             */
            rename(name, key) {
                this.todo[key].name = name;
            },
            addTodo() {
                if(this.todo_name.length > 2) {
                    this.todo.push({
                        name: this.todo_name,
                        isChecked: false
                    });
                    this.todo_name = '';
                }
            },
            /**
             * Отправка формы
             */
            submit() {
                if(this.isValidate) {
                    this.$emit('submit', {
                        name: this.name,
                        todo: this.todo
                    });
                }
            },
        },
        mounted() {
            this.editName = this.isCreate;
        }
    }
</script>

<style lang="scss">
    .form-wrapper {
        margin: 0 30%;
        border: 1px solid #eee;
        padding: 20px;
        text-align: left;

        .form-header {
            display: flex;
            align-content: center;
            padding-bottom: 10px;
            border-bottom: 1px solid #eee;

            h5 {
                margin: 5px 0;
                flex: 1;
            }
        }

        .form-label {
            margin: 10px 0;
            display: flex;
            align-content: center;
            border-bottom: 1px solid #eee;
            padding-bottom: 10px;

            h5 {
                margin: 5px;
            }
        }

        .input {
            border: 1px solid #eee;
            border-radius: 4px;
            padding: 5px;
            color: #333;
            outline: none;
            width: 50%;
        }

        .form-footer {
            text-align: right;
        }
    }
</style>