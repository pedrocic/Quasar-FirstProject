<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <div class="row q-mb-sm">
        <q-input class="col"
                 outlined
                 :value="name"
                 @input="$emit('update:name', $event)"
                 :rules="[val => !!val || 'Field is required']"
                 autofocus
                 v-select-all
                 ref="name"
                 label="Task name">
            <template v-slot:append="">
                <q-icon v-if="name"
                        name="close"
                        @click="$emit('update:name', '')"
                        class="cursor-pointer"
                >

                </q-icon>
            </template>
        </q-input>
    </div>
</template>

<script>
    import { selectAll } from "src/directives/directive-select-all";

    export default {
        props: ['name'],
        directives: {
            selectAll
        }
    }
</script>
