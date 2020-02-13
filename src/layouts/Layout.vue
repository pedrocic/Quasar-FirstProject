<template>
    <q-layout view="hHh lpR fFf">
        <q-header elevated>
            <q-toolbar>
                <!--
                <q-btn
                        flat
                        dense
                        round
                        @click="leftDrawerOpen = !leftDrawerOpen"
                        icon="menu"
                        aria-label="Menu">

                </q-btn>
                -->

                <q-toolbar-title class="absolute-center">
                    Awesome Todo
                </q-toolbar-title>

                <q-btn flat
                       v-if="!loggedIn"
                       to="/auth"
                       icon-right="account_circle"
                       class="absolute-right"
                       label="Login">
                </q-btn>

                <q-btn flat
                       v-else
                       @click="logoutUser"
                       icon-right="account_circle"
                       class="absolute-right"
                       label="Logout">
                </q-btn>
            </q-toolbar>
        </q-header>

        <q-footer>
            <q-tabs>
                <q-route-tab
                v-for="nav in navs"
                :key="nav.title"
                :to="nav.link"
                :icon="nav.icon"
                :label="nav.title">
                </q-route-tab>
            </q-tabs>
        </q-footer>

        <q-drawer
                v-model="leftDrawerOpen"
                show-if-above
                :breakpoint="767"
                :width="250"
                bordered
                content-class="bg-primary"
        >
            <q-list dark>
                <q-item-label header>Navigation</q-item-label>
                <Navigation
                        v-for="nav in navs"
                        :key="nav.title"
                        v-bind="nav"
                />
            </q-list>
        </q-drawer>

        <q-page-container>
            <router-view></router-view>
        </q-page-container>
    </q-layout>
</template>

<script>
    import { mapState, mapActions } from 'vuex'
    import Navigation from 'components/Navigation'

    export default {
        methods: {
            ...mapActions('auth', ['logoutUser'])
        },
        components: {
            Navigation
        },
        computed: {
            ...mapState('auth', ['loggedIn'])
        },
        data () {
            return {
                leftDrawerOpen: false,
                navs: [
                    {
                        title: 'Todo',
                        caption: 'quasar.dev',
                        icon: 'list',
                        link: '/'
                    },
                    {
                        title: 'Settings',
                        caption: 'quasar.dev',
                        icon: 'settings',
                        link: '/settings'
                    }
                ]
            }
        }
    }
</script>

<style lang="scss">
    @media screen and (min-width: 768px) {
        .q-footer {
            display: none;
        }
    }

    .q-drawer {
        .q-router-link--exact-active {
            color: white !important;
        }
    }
</style>
