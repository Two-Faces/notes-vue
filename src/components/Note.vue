<template>
    <div class="note">
        <div class="note-header">
            <h5>{{ name }}</h5>
            <div class="actions">
                <button>Редактировать</button>
                <button>Удалить</button>
            </div>
        </div>
        <div class="note-body">
            <ul v-if="todo.length">
                <li v-for="(item, key) in todo" :key="key"
                    :class="{completed: item.isChecked}">
                    <input type="checkbox" disabled :checked="item.isChecked"/> {{ item.name }}
                </li>
            </ul>
            <i class="not-todo" v-else>
                Список задач пуст
            </i>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Note",
        props: {
            todo: {
                type: Array,
                default: () => ([])
            },
            name: {
                type: String,
                default: 'Название не указано'
            }
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
            .not-todo {
                color: #bbb;
                margin: 5px 0;
                display: block;
            }

            ul{
                list-style: none;
                padding: 0;
                margin: 5px 0;

                li {
                    margin: 3px 0;

                    &.completed {
                        text-decoration: line-through;
                    }
                }
            }
        }
    }
</style>