<template>
    <div class="form-wrapper">
        <div class="form-header">
            <h5>{{ isCreate ? 'Создание заметки' : 'Редактирование заметки' }}</h5>
        </div>
        <div class="form-body">
            <label class="form-label">
                <h5>Название заметки:</h5>
                <input placeholder="Введите название заметки"
                       v-model="name"
                       class="input">
            </label>
            <div class="todo-list">
                <list :todo="todo"
                      @rename="rename"
                      @deleted="deleted"
                      @completed="completed"/>
                <label class="form-label">
                    <h5>Название задачи:</h5>
                    <input placeholder="Введите название задачи"
                           v-model="todo_name"
                           class="input"
                           @keyup.enter="addTodo">
                    <button @click="addTodo">Добавить</button>
                </label>
            </div>
        </div>
        <div class="form-footer">
            <button @click="submit" :disabled="!isValidate">
                {{ isCreate ? 'Создать заметку' : 'Сохранить заметку' }}
            </button>
            <template v-if="isEdit">
                <button @click="cancel">Отменить</button>
                <button @click="remove">Удалить</button>
            </template>
        </div>
    </div>
</template>

<script>
    import List from "./List";
    import {mapActions, mapGetters, mapMutations} from 'vuex';

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
            ...mapGetters(['getNoteData']),
            isCreate(){
                return this.type === 'create';
            },
            isEdit() {
                return this.type === 'edit';
            },
            isValidate() {
                return this.name.length > 2;
            }
        },
        methods: {
            ...mapMutations(['removeNote']),
            ...mapActions(['writeStorage']),
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
            /**
             * Добавление задачи
             */
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
                    const note = {
                        name: this.name,
                        todo: this.todo
                    };

                    if(this.isEdit)
                        note.id = +this.$route.params.id;

                    this.$emit('submit', note);
                }
            },
            /**
             * Перенаправления на домашнюю старницу
             */
            redirectHome() {
                this.$modal.hide('dialog');
                this.$router.push({name: 'home'});
            },
            /**
             * Отмена редактирования
             */
            cancel() {
                this.$modal.show('dialog', {
                    title: 'Отмена редактирования!',
                    text: 'Вы действительно хотите отменить редактирования заметки?',
                    buttons: [
                        {
                            title: 'Отмена'
                        },
                        {
                            title: 'Подтвердить',
                            handler: () => this.redirectHome()
                        }
                    ]
                })
            },
            /**
             * Удаление заметки
             */
            remove() {
                this.$modal.show('dialog', {
                    title: 'Удаление заметки!',
                    text: 'Вы действительно хотите удалить заметку?',
                    buttons: [
                        {
                            title: 'Отмена'
                        },
                        {
                            title: 'Удалить',
                            handler: () => {
                                this.removeNote(this.$route.params.id);
                                this.writeStorage();
                                this.redirectHome();
                            }
                        }
                    ]
                })
            }
        },
        mounted() {
            this.editName = this.isCreate;

            if(this.isEdit){
                const data = this.getNoteData(+this.$route.params.id);

                if(data){
                    this.name = data.name;
                    this.todo = data.todo;
                }
            }
        }
    }
</script>

<style lang="scss">
    .form-wrapper {
        margin: 0 30%;
        border: 1px solid #eee;
        text-align: left;

        .form-header {
            display: flex;
            align-content: center;
            background: #333;
            color: #f9f9f9;
            padding: 10px;
            border-bottom: 1px solid #eee;

            h5 {
                margin: 5px 0;
                flex: 1;
                text-transform: uppercase;
            }
        }

        .form-label {
            display: flex;
            align-content: center;
            border-bottom: 1px solid #eee;
            padding: 10px;

            &:not(:first-child){
                border-top: 1px solid #eee;
            }

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
            display: flex;
            justify-content: center;
            padding: 10px;
        }
    }
</style>