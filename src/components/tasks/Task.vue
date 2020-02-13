<template>
    <q-item @click="updateTask({ id: id, updates: { completed: !task.completed } })"
            :class="!task.completed ? 'bg-orange-1' : 'bg-green-1'"
            v-touch-hold:1000.mouse="showEditTasksModal"
            clickable
            v-ripple>
        <q-item-section side top>
            <q-checkbox class="no-pointer-events" :value="task.completed"></q-checkbox>
        </q-item-section>

        <q-item-section>
            <q-item-label :class="{ 'text-strikethrough' : task.completed }"
                v-html="$options.filters.searchHighlight(task.name, search)">
                {{task.name}}
            </q-item-label>
        </q-item-section>

        <q-item-section
                v-if="task.dueDate"
                side>
            <div class="row">
                <div class="column justify-center">
                    <q-icon class="q-mr-xs" size="18px" name="event"></q-icon>
                </div>
                <div class="column">
                    <q-item-label class="row justify-end" caption>
                        {{task.dueDate | niceDate }}
                    </q-item-label>
                    <q-item-label class="row justify-end" caption>
                        <small>{{taskDueTime}}</small>
                    </q-item-label>
                </div>
            </div>
        </q-item-section>

        <q-item-section side>
            <div class="row">
                <q-btn  @click.stop="showEditTask = true"
                        dense
                        flat
                        round
                        color="primary"
                        icon="edit"
                ></q-btn>
                <q-btn  @click.stop="promptToDelete(id)"
                        dense
                        flat
                        round
                        color="red"
                        icon="delete"
                ></q-btn>
            </div>
        </q-item-section>

        <q-dialog v-model="showEditTask">
            <edit-task @close="showEditTask = false"
                       :task="task"
                       :id="id"
            >
            </edit-task>
        </q-dialog>

    </q-item>
</template>

<script>
    import date from "quasar/src/utils/date";

    const { formatDate } = date;
    import { mapActions ,mapState, mapGetters} from 'vuex'

    export default {
        data() {
            return {
                showEditTask: false
            }
        },
        props: ['task', 'id'],
        computed: {
            ...mapState('tasks', ['search']),
            ...mapGetters('settings', ['settings']),
            taskDueTime() {
                if (this.settings.show12HourTimeFormat) {
                    return formatDate(date.extractDate(this.task.dueTime,'HH:mm'), 'h:mmA')
                }
                return this.task.dueTime
            }
        },
        methods: {
            ...mapActions('tasks', ['updateTask', 'deleteTask']),
            showEditTasksModal() {
                this.showEditTask = true;
            },
            promptToDelete(id) {
                this.$q.dialog({
                    title: 'Confirm',
                    message: 'Really delete?',
                    ok: {
                        push: true
                    },
                    cancel: {
                        color: 'negative'
                    },
                    persistent: true
                }).onOk(() => {
                    this.deleteTask(id)
                })
            }
        },
        filters: {
            niceDate(value) {
                return formatDate(date.extractDate(value,'DD/MM/YYYY'), 'DD/MM/YYYY', {
                    days: 'Domingo_Segunda_Terça_Quarta_Quinta_Sexta_Sábado'.split('_'),
                    daysShort: 'Dom_Seg_Ter_Qua_Qui_Sex_Sáb'.split('_'),
                    months: 'Jeneiro_Fevereiro_Março_Abril_Maio_Junho_Julho_Agosto_Setembro_Outubro_Novembro_Dezembro'.split('_'),
                    monthsShort: 'Jan_Fev_Mar_Abr_Maio_Jun_Jul_Ago_Set_Out_Nov_Dez'.split('_'),
                    firstDayOfWeek: 1
                })
            },
            searchHighlight(value, search) {
                if (search) {
                    let searchRegExp = new RegExp(search, 'ig');
                    return value.replace(searchRegExp, (match) => {
                        return'<span class="bg-yellow-6">' + match + '</span>'
                    })
                }
                return value
            }
        },
        components: {
            'edit-task' : require('components/Tasks/Modals/' +
                'EditTask.vue').default
        }
    }
</script>

<style>

</style>
