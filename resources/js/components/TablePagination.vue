<!-- 
<div >
    <nav aria-label="Page navigation example">
        <ul class="pagination justify-content-center mb-0">
            <li class="page-item active"><a class="page-link" href="#">1</a></li>
            <li class="page-item"><a class="page-link" href="#">2</a></li>
            <li class="page-item"><a class="page-link" href="#">3</a></li>
            <li class="page-item"><a class="page-link" href="#">4</a></li>
            <li class="page-item"><a class="page-link" href="#">5</a></li>
        </ul>
    </nav>
</div> -->
<template>
    <nav class="p-3" aria-label="Page navigation">
        <ul class="pagination justify-content-center mb-0">
            <!-- <li class="page-item mx-1" :class="{'disabled':page==1}" @click="onPageChanged(page-1)">
                <a class="page-link" tabindex="-1" aria-disabled="true"><i
                        class="fa-solid fa-chevron-left"></i></a>
            </li> -->
            <li class="page-item mx-1" 
                v-for="(pidx, eidx) in page_list" 
                :key="'pidx'+eidx" 
                :class="{'active': pidx==page, 'null': pidx==null}"  
                @click="onPageChanged(pidx)">
                <span class="page-link" v-show="pidx!=null">{{pidx}}</span>
                <span class="page-link" v-show="pidx==null">...</span>
            </li>
            <!-- <li class="page-item mx-1" :class="{'disabled':page==npage}" @click="onPageChanged(page+1)">
                <a class="page-link"><i class="fa-solid fa-chevron-right"></i></a>
            </li> -->
        </ul>
    </nav>
</template>
<style scoped>
    .pagination .page-item {
        cursor: pointer;
        min-width: 36px;
    }

    .pagination .page-item.disabled {
        cursor: initial;
    }

    .pagination .page-item .page-link {
        text-align: center;
    }

    .pagination .page-item.null .page-link{
        background-color: inherit !important;
    }

    .pagination .page-item .page-link:hover{
        background-color: #f6f6f6;
    }
</style>
<script>
    export default {
        props: {
            "page": {
                // type: Number,
                default: 1
            },
            "ntotal": {
                type: Number,
                default: 0
            },
            "per_page": {
                type: Number,
                default: 0
            },
        },
        data () {
            return {
                page_window: 1,
                // page_window_limit: 1,
            }
        },
        computed: {
            npage: function() {
                const npage = Math.ceil(this.ntotal*1.0/this.per_page);
                return npage;
            },

            page_list: function() {
                // [n-page_window, ..., n-2, n-1], n, [n+1, n+2, ..., n+page_window], 
                const nwindow = (2*this.page_window+1);

                // [1, 2, 3, ... page_window_limit], ..., nwindow, ..., [npage-page_window_limit-1, ..., npage-2, npage-1, npage], 
                // if (this.npage < nwindow + 2*page_window_limit + 2)
                if (this.npage < nwindow + 4) {
                    return _.range(1, this.npage+1);
                }


                if (this.page <= 3) {
                    // nwindow +2 (to offset the fixed first two items)
                    // nwindow +1 (to include the last one from _.range function)
                    return _.concat(_.range(1, nwindow+2+1), [null, this.npage]);
                }

                if (this.page > this.npage-nwindow) {
                    return _.concat([1, null], _.range(this.npage-nwindow-1, this.npage+1));
                }

                return _.concat([1, null], _.range(this.page-this.page_window, this.page+this.page_window+1), [null, this.npage]);

                // let start_idx = Math.max(this.page - this.page_window, 1);
                // let end_idx = Math.min(this.page + this.page_window, this.npage);
                // // console.log("page_list", this.page, this.npage, this.ntotal, this.per_page, _.range(start_idx, end_idx+1));

                // return _.range(start_idx, end_idx+1);
            }
         },
        // watch: {},
        methods: {
            onPageChanged(newpage) {
                if (newpage <= 0) {
                    return false;
                }

                if (newpage > this.npage) {
                    return false;
                }

                this.$emit("table-pagination-page-changed", newpage)
            }

        },
        created() {
            // console.log(this.auth.user);
        }
    }
</script>