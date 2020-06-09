<template>
    <section class="notes-section">
        <button class="create-note">Создать новую заметку</button>
        <div class="notes-wrapper">
            <note :todo="note.todo"
                  :name="note.name"
                  v-for="(note, key) in notes"
                  :key="key"/>
        </div>
    </section>
</template>

<script>
    import Note from "@/components/Note";
    export default {
        name: "Home",
        components: {Note},
        data: () => ({
            notes: [
                {
                    name: 'Для дома',
                    todo: [
                        {
                            name: 'Покормить собаку',
                            isChecked: false
                        },
                        {
                            name: 'Полить цветы',
                            isChecked: true
                        }
                    ]
                },
                {
                    name: 'Важное',
                    todo: []
                },
                {
                    name: 'На завтра',
                    todo: []
                }
            ]
        })
    }
</script>

<style scoped lang="scss">
    .notes-section {
        text-align: center;

        .create-note {
            border: 0;
            outline: none;
            background: darkgreen;
            color: #eee;
            cursor: pointer;
        }

        .notes-wrapper{
            display: flex;
            justify-content: center;
            margin: 30px auto;
            text-align: left;
        }
    }
</style>