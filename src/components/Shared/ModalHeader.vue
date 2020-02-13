<template>
    <q-card-section class="row">
        <div class="text-h6"><slot></slot></div>
        <q-space></q-space>
        <q-btn flat
               round
               dense
               v-close-popup
               icon="close"
        ></q-btn>
    </q-card-section>
</template>

<script>

</script>

<style>

</style>
