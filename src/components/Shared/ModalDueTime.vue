<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <div class="row q-mb-sm">
        <q-input class="col" label="Due Time" outlined :value="dueTime">
            <template v-slot:append="">
                <q-icon v-if="dueTime"
                        @input="$emit('update:dueTime', $event)"
                        name="close"
                        @click="$emit('update:dueTime', '')"
                        class="cursor-pointer"
                ></q-icon>
                <q-icon name="access_time" class="cursor-pointer">
                    <q-popup-proxy transition-show="scale" transition-hide="scale">
                        <q-time now-btn format24h :value="dueTime"
                        @input="$emit('update:dueTime', $event)"></q-time>
                    </q-popup-proxy>
                </q-icon>
            </template>
        </q-input>
    </div>
</template>

<script>
    export default {
        props: ['dueTime']
    }
</script>

<style>

</style>
