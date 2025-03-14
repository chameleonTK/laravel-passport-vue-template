<template>
    <section class="bg-gray">
        <div class="page-error d-flex align-items-center justify-content-center flex-column  p-5" style="height: 80vh;">
            <h1 class="mb-3" style="font-size: 100px;">404</h1>
            <p class="h5 fw-normal text-center text-color-2 mb-0">ไม่พบหน้าที่คุณค้นหา<br>กรุณาติดต่อแอดมิน</p>
        </div>
    </section>
</template>

<script>
    export default {
        data () {
            return {
            }
        },
        created() {
            document.body.classList.remove("bg-primary");
            document.body.classList.add("bg-gray");
        },
        destroyed() {
            // document.body.classList.add("bg-primary");
            // document.body.classList.remove("bg-gray");
        },
        mounted() {
			this.rerender();
		},
        watch: { 
            
        },
        methods: {
            scrollToTop() {
                window.scrollTo({
                    top: 0,
                    left: 0,
                    behavior: 'smooth'
                })
            },


			rerender() {
                
            }
        },
        components: {
        }
    }
</script>