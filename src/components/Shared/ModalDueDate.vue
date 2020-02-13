<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <div class="row q-mb-sm">
        <q-input label="Due Date"
                 outlined
                 :value="dueDate"
                 class="col"
                 @input="$emit('update:dueDate', $event)">
            <template v-slot:append="">
                <q-icon v-if="dueDate"
                        name="close"
                        @click="$emit('clear')"
                        class="cursor-pointer"
                ></q-icon>
                <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                        <q-date :locale="myLocale" today-btn mask="DD/MM/YYYY" :value="dueDate" @input="$emit('update:dueDate', $event)"></q-date>
                    </q-popup-proxy>
                </q-icon>
            </template>
        </q-input>
    </div>
</template>

<script>
    export default {
        props: ['dueDate'],
        data() {
            return {
                myLocale: {
                    days: 'Domingo_Segunda_Terça_Quarta_Quinta_Sexta_Sábado'.split('_'),
                    daysShort: 'Dom_Seg_Ter_Qua_Qui_Sex_Sáb'.split('_'),
                    months: 'Jeneiro_Fevereiro_Março_Abril_Maio_Junho_Julho_Agosto_Setembro_Outubro_Novembro_Dezembro'.split('_'),
                    monthsShort: 'Jan_Fev_Mar_Abr_Maio_Jun_Jul_Ago_Set_Out_Nov_Dez'.split('_'),
                    firstDayOfWeek: 1
                }
            }
        }
    }
</script>

<style>

</style>
