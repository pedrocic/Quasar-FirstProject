<template>
    <div id="q-app">
        <router-view></router-view>
    </div>
</template>

<script>
    import { mapActions } from 'vuex'

    export default {
        methods: {
            ...mapActions('settings', ['getSettings']),
            ...mapActions('auth', ['handleAuthSateChange'])
        },
        mounted() {
            this.getSettings()
            this.handleAuthSateChange()
        }
    }
</script>

<style>
    .text-strikethrough {
        text-decoration: line-through;
    }
</style>
