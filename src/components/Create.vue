<template>
    <form-note type="create" @submit="submit"/>
</template>

<script>
    import Form from "@/components/Form";

    export default {
        name: "Create",
        components: {
            'form-note': Form
        },
        methods: {
            submit(params) {
                console.log(params)
            }
        }
    }
</script>

<style scoped>

</style>