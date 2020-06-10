<template>
    <section class="notes-section">
        <router-link :to="{name: 'create'}" tag="button" class="success">
            Создать новую заметку
        </router-link>
        <div class="notes-wrapper">
            <note v-for="note in notes"
                  :id="note.id"
                  :key="note.id"/>
        </div>
    </section>
</template>

<script>
    import Note from "@/components/Note";
    import {mapGetters} from 'vuex';

    export default {
        name: "Home",
        components: {Note},
        computed: {
            ...mapGetters({
                notes: 'getNotes'
            })
        }
    }
</script>

<style scoped lang="scss">
    .notes-section {
        text-align: center;

        .notes-wrapper{
            display: flex;
            justify-content: center;
            text-align: left;
            flex-wrap: wrap;
        }
    }
</style>