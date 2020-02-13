<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <transition appear
                enter-active-class="animated zoomIn"
                leave-active-class="animated zoomOut absolute-top"
    >
        <q-banner class="bg-grey-3">
            <template v-slot:avatar="">
                <q-icon name="check" color="primary"></q-icon>
            </template>
            No tasks to do today!
            <template v-slot:action="">
                <q-btn  @click="$emit('showAddTask')"
                        flat color="primary"
                        label="Add Task"></q-btn>
            </template>
        </q-banner>
    </transition>
</template>

<script>
    export default {
        name: "NoTasks"
    }
</script>

<style>

</style>
