<template>
    <form-note type="create" @submit="submit"/>
</template>

<script>
    import Form from "@/components/Form";
    import {mapMutations, mapActions} from 'vuex';

    export default {
        name: "Create",
        components: {
            'form-note': Form
        },
        methods: {
            ...mapMutations(['pushNote']),
            ...mapActions(['writeStorage']),
            submit(note) {
                this.pushNote(note);
                this.writeStorage();

                this.$router.push({name: 'home'})
            }
        }
    }
</script>

<style scoped>

</style>