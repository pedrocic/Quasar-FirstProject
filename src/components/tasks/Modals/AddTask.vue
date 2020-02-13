<template>
    <q-card>

        <modal-header>Add Task</modal-header>

        <q-form @submit.prevent="submitForm">
            <q-card-section>

                <modal-task-name
                        :name.sync="taskToSubmit.name"
                        ref="modalTaskName">
                </modal-task-name>

                <modal-due-date
                        :dueDate.sync="taskToSubmit.dueDate"
                        @clear="clearDueDate">
                </modal-due-date>

                <modal-due-time
                        v-if="taskToSubmit.dueDate"
                        :dueTime.sync="taskToSubmit.dueTime">
                </modal-due-time>
            </q-card-section>
            <modal-buttons></modal-buttons>
        </q-form>

    </q-card>
</template>

<script>
    import { mapActions } from 'vuex'
    import mixinAddEditTask from 'src/mixins/mixin-add-edit-task'

    export default {
        mixins: [mixinAddEditTask],
        data() {
            return {
                taskToSubmit: {
                    name: '',
                    dueDate: '',
                    dueTime: '',
                    completed: false
                }
            }
        },
        methods: {
            ...mapActions('tasks', ['addTasks']),
            submitTask() {
                this.addTasks(this.taskToSubmit);
                this.$emit('close')
            },
        }
    }
</script>

<style>

</style>
