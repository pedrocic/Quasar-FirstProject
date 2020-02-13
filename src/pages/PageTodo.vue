<template>
    <q-page>
        <div class="q-pa-md absolute full-width full-height column">
            <div class="row q-mb-lg">
                <search></search>
                <sort></sort>
            </div>

            <p v-if="search && !Object.keys(tasksTodo).length && !Object.keys(tasksCompleted).length">
                No search results.
            </p>
            <q-scroll-area class="q-scroll-area-tasks">
                <no-tasks
                        v-if="!Object.keys(tasksTodo).length && !search
                            && !settings.showTasksInOneList"
                        @showAddTask="showAddTask = true"
                >
                </no-tasks>

                <tasks-todo :tasksTodo="tasksTodo" v-if="Object.keys(tasksTodo).length"></tasks-todo>
                <tasks-completed :tasksCompleted="tasksCompleted"
                                 class="q-mb-xl"
                                 v-if="Object.keys(tasksCompleted).length"></tasks-completed>
            </q-scroll-area>

            <div class="absolute-bottom text-center q-mb-lg no-pointer-events">
                <q-btn  @click="showAddTask = true"
                        round
                        color="primary"
                        size="24px"
                        icon="add"
                        class="all-pointer-events"
                ></q-btn>
            </div>
        </div>

        <q-dialog v-model="showAddTask">
            <add-task @close="showAddTask = false"></add-task>
        </q-dialog>

    </q-page>
</template>

<script>
    import { mapGetters, mapState } from 'vuex'

    export default {
        data() {
            return {
                showAddTask: false
            }
        },
        computed: {
            ...mapGetters('tasks', ['tasksTodo', 'tasksCompleted']),
            ...mapGetters('settings', ['settings']),
            ...mapState('tasks', ['search'])
        },
        components: {
            'task': require('components/Tasks/Task.vue').
                default,
            'add-task' : require('components/Tasks/Modals/' +
                'AddTask.vue').default,
            'tasks-todo' : require('components/Tasks/TasksTodo.vue').default,
            'tasks-completed' : require('components/Tasks/' +
                'TasksCompleted.vue').default,
            'no-tasks' : require('components/Tasks/' +
                'NoTasks.vue').default,
            'search' : require('components/Tasks/' +
                'Tools/Search.vue').default,
            'sort' : require('components/Tasks/' +
                'Tools/Sort.vue').default
        }
    }
</script>

<style>
    .q-scroll-area-tasks {
        display: flex;
        flex-grow: 1;
    }
</style>
