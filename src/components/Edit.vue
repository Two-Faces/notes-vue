<template>
    <form-note type="edit" @submit="submit"/>
</template>

<script>
    import Form from './Form';
    import {mapActions, mapMutations} from "vuex";

    export default {
        name: "edit",
        components: {
            'form-note': Form
        },
        methods: {
            ...mapMutations(['updateNote']),
            ...mapActions(['writeStorage']),
            submit(note) {
                this.updateNote(note);
                this.writeStorage();

                this.$router.push({name: 'home'});
            }
        }
    }
</script>