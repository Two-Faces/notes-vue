<template>
    <div class="note">
        <div class="note-header">
            <h5>{{ name }}</h5>
            <div class="actions">
                <router-link :to="{name: 'edit', params: {id: id}}" tag="button">Редактировать</router-link>
                <button class="button" @click="remove">Удалить</button>
            </div>
        </div>
        <div class="note-body">
            <list :todo="todo" :disabled="true"/>
        </div>
    </div>
</template>

<script>
    import {mapActions, mapGetters, mapMutations} from 'vuex';
    import List from "@/components/List";

    export default {
        name: "Note",
        components: {List},
        data: () => ({
            name: 'Название не указано',
            todo: []
        }),
        props: {
            id: {
                type: Number,
                required: true
            }
        },
        computed: {
            ...mapGetters(['getNoteData'])
        },
        methods: {
            ...mapMutations(['removeNote']),
            ...mapActions(['writeStorage']),
            /**
             * Вызов модального окна для подтверждения удаления
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
                                this.removeNote(this.id);
                                this.writeStorage();
                                this.$modal.hide('dialog');
                            }
                        }
                    ]
                })
            }
        },
        mounted() {
            const data = this.getNoteData(this.id);
            this.name = data.name;
            this.todo = data.todo;
        }
    }
</script>

<style scoped lang="scss">
    .note {
        margin: 0 20px;
        color: #333;
        padding: 15px;
        box-shadow: 0 2px 7px -7px #333;
        border-radius: 4px;
        min-width: 250px;
        background: #f9f9f9;
        border: 1px solid #eee;

        .note-header {
            border-bottom: 1px solid #eee;
            padding-bottom: 5px;
            display: flex;
            align-items: center;

            h5 {
                margin: 0;
                flex: 1;
            }

            button {
                border: 0;
                outline: none;
                cursor: pointer;
                background: slategray;
                color: #eee;
                margin-left: 1px;
                transition: .3s;

                &:last-of-type {
                    background: orangered;
                }

                &:hover {
                    opacity: .8;
                }
            }
        }

        .note-body {
            margin: 5px 0;
        }
    }
</style>