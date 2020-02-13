<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <q-input outlined
             @keyup.esc="searchField=''"
             class="col"
             v-model="searchField"
             label="Search"
             v-select-all>
        <template v-slot:append="">
            <q-icon v-if="searchField !== ''" name="close" @click="searchField = ''" class="cursor-pointer"></q-icon>
            <q-icon name="search"></q-icon>
        </template>
    </q-input>
</template>

<script>
    import { selectAll } from "src/directives/directive-select-all";
    import { mapState, mapActions } from 'vuex'

    export default {
        computed: {
            ...mapState('tasks', ['search']),
            searchField: {
                get() {
                    return this.search
                },
                set(value) {
                    this.setSearch(value)
                }
            }
        },
        methods: {
            ...mapActions('tasks', ['setSearch'])
        },
        directives: {
            selectAll
        }
    }
</script>

<style>

</style>
