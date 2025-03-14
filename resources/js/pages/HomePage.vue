<template>
    <div class="main-wrapper main-wrapper-1">
        
    </div>
</template>


<script>
    // import Navbar from '../components/Navbar.vue';
    // import Sidebar from '../components/Sidebar.vue';
    // import EventBus from "../EventBus.js";


    export default {
        data () {
            return {
                me: {},
            }
        },
        created() {
            
        },
        destroyed() {
            
        },
        mounted() {
            
        },
        beforeDestroy() {
            
        },

        watch: { 
            '$store.state.auth.me': {
                handler: function (val, oldVal) {
                    if (_.isNull(val)) {
                        return;
                    }

                    this.me = val;
                },
                deep: true,
                immediate: true,
            },
        },
        methods: {
            scrollToTop() {
                window.scrollTo({
                    top: 0,
                    left: 0,
                    behavior: 'smooth'
                })
            },

        },
        components: {
            // Navbar,
            // Sidebar
        }
    }
</script>