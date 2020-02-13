import Vue from 'vue'
import { uid } from 'quasar'
import { firebaseDb, firebaseAuth } from '../boot/firebase';

const state = {
    tasks: {
        // 'ID1': {
        //     name: 'Go to shop',
        //     completed: false,
        //     dueDate: '20/05/2019',
        //     dueTime: '18:30'
        // },
        // 'ID2': {
        //     name: 'Get bananas',
        //     completed: false,
        //     dueDate: '22/05/2019',
        //     dueTime: '14:00'
        // },
        // 'ID3': {
        //     name: 'Get apples',
        //     completed: false,
        //     dueDate: '26/05/2019',
        //     dueTime: '16:00'
        // }
    },
    search: '',
    sort: 'name'
};

const mutations = {
    updateTask(state, payload) {
        Object.assign(state.tasks[payload.id], payload.updates)
    },

    deleteTask(state, id) {
        Vue.delete(state.tasks, id)
    },

    addTask(state, payload) {
        Vue.set(state.tasks, payload.id, payload.task)
    },

    setSearch(state, value) {
        state.search = value
    },

    setSort(state, value) {
        state.sort = value
    }

};

const actions = {
    updateTask({ commit }, payload) {
        commit('updateTask', payload)
    },

    deleteTask({commit}, id) {
        commit('deleteTask', id)
    },

    addTasks({ commit }, task) {
        let taskId = uid();
        let payload = {
            id: taskId,
            task: task
        };
        commit('addTask', payload)
    },
    setSearch({commit}, value) {
        commit('setSearch', value)
    },
    setSort({commit}, value) {
        commit('setSort', value)
    },

    fbReadData({commit}) {
        let userID = firebaseAuth.currentUser.uid;
        let userTasks = firebaseDb.ref('tasks/' + userID);

        userTasks.on('child_added', snapshot => {
            let task = snapshot.val();
            let payload = {
                id: snapshot.key,
                task: task
            };
            commit('addTask', payload)
        })

    }
};

const getters = {
    tasksSorted: (state) => {
        let tasksSorted = {},
            keysOrdered = Object.keys(state.tasks);

        keysOrdered.sort((a, b) => {
            let taskAprop = state.tasks[a][state.sort].toLowerCase();
            let taskBprop = state.tasks[b][state.sort].toLowerCase();

            if (taskAprop > taskBprop) return 1;
            else if (taskAprop < taskBprop) return -1;
            else return 0
        });

        keysOrdered.forEach((key) => {
            tasksSorted[key] = state.tasks[key]
        });

        return tasksSorted
    },
    tasksFiltered: (state, getters) => {
        let tasksSorted = getters.tasksSorted;
        let tasksFiltered = {};
        if (state.search) {

            Object.keys(tasksSorted).forEach((key) => {
                let task = tasksSorted[key],
                    taskNameLowerCase = task.name.toLowerCase(),
                    searchLowerCase = state.search.toLowerCase();
                if (taskNameLowerCase.includes(searchLowerCase)) {
                    tasksFiltered[key] = task;
                }
            });

            return tasksFiltered
        }
        return tasksSorted
    },
    tasksTodo: (state, getters) => {
        let tasksFiltered = getters.tasksFiltered;
        let tasks = {};
        Object.keys(tasksFiltered).forEach((key) => {
            let task = tasksFiltered[key];
            if (!task.completed) tasks[key] = task
        }) ;
        return tasks
    },
    tasksCompleted: (state, getters) => {
        let tasksFiltered = getters.tasksFiltered;
        let tasks = {};
        Object.keys(tasksFiltered).forEach((key) => {
            let task = tasksFiltered[key];
            if (task.completed) tasks[key] = task
        }) ;
        return tasks
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}
