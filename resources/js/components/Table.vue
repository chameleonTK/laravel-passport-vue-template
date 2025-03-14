<template>
    <fragment>
        <div class="" :style="table_container_style">
            <table class="table table-bordered border-gray" :style="table_style">
                <thead>
                    <tr>
                        <th v-if="has_checkbox" class="text-center" style="width: 35px;">
                            <input 
                                class="form-check-input" 
                                type="checkbox" 
                                @change="checkboxHeaderChange()"
                                :checked="checkboxHeaderStatus=='checked'"
                                :indeterminate.prop="checkboxHeaderStatus=='indeterminate'">
                        </th>

                        <th v-for="col in columns" :key="col.name" :style="col.style" :class="{...col.class}" @click="header_click(col)">
                            <!-- <span v-html="col.label"></span> -->
                            <component :is="dynamicComponent(col.label)" />
                        </th>

                        <th v-if="has_actions" class="text-white" style="min-width: 50px;width: 50px;">
                            จัดการ
                        </th>
                    </tr>
                </thead>

                <tbody>
                    <tr v-for="(row, idx) in records" :key="''+idx+'_'+row.id" v-show="!row.deleted">
                        <td class="text-center" v-if="has_checkbox">
                            <input 
                                class="form-check-input" 
                                type="checkbox" 
                                v-model="row.selected" 
                                :disabled="row.disabled"
                                @change="checkboxChange(row)">
                        </td>
                        

                        <td v-for="col in columns" :key="col.name" @click="row_click(col, row, idx)" :class="row_class(col, row, idx)">
                             <!-- <div  v-if="!col?.render"
                                :style="row_style(col, row, idx)"
                                v-html="row_text(col, row, idx)">
                            </div> -->
                            <component :is="row_text(col, row, idx)" v-if="!col?.render" :style="row_style(col, row, idx)" />
                        </td>

                        <td v-if="has_actions" class="text-center">
                            <div class="dropdown" v-show="!hide_all_actions(row, idx)">
                                <a href="#" class="ps-2 pe-2" data-bs-toggle="dropdown"><i class="fa-regular fa-ellipsis-vertical"></i></a>
                                <ul class="dropdown-menu dropdown-menu-end">
                                    <fragment v-for="ac in actions" :key="ac.name">
                                        <router-link v-if="ac.is_link" :to="ac.link(row, idx)" :style="ac.style" :class="['dropdown-item', ac.class]" :alt="ac.alt" v-show="!action_disabled(ac, row, idx)">
                                            <i :class="['me-2', ac.icon]"></i> {{ac.label}}
                                        </router-link>

                                        <span v-if="!ac.is_link" :style="ac.style" :class="['dropdown-item', ac.class]" :alt="ac.alt" @click="ac.click(row, idx)" v-show="!action_disabled(ac, row, idx)">
                                            <i :class="['me-2', ac.icon]"></i> {{ac.label}}
                                        </span>
                                    </fragment>
                                </ul>
                            </div>

                            
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <TablePagination 
            v-show="show_pagination"
            :page="page"
            :ntotal="ntotal"
            :per_page="per_page"
            v-on:table-pagination-page-changed="onPageChanged">
        </TablePagination>
    </fragment>
</template>

<style>
    .form-check-input:disabled {
        background-color: #aaa;
    }

    .form-check-input[type=checkbox]:indeterminate {
        background-color: #9d6b3d;
        border-color: #9d6b3d;   
    }
    
</style>
<script>

    // Todo: support dynamic component
    // see: https://stackoverflow.com/questions/44998790/how-to-load-a-component-from-a-variable-name-in-vue-js
    import TablePagination from "./TablePagination.vue";
    import { Fragment } from 'vue-fragment'

    export default {
        props: {
            'table_container_style': {
                type: Object,
                default: () => {
                    return {
                        
                    };
                }
            },
            'table_style': {
                type: Object,
                default: () => {
                    return {
                        
                    };
                }
            },
            'show_pagination': {
                type: Boolean,
                default: true
            },
            'has_checkbox': {
                type: Boolean,
                default: false
            },
            'checkbox_type': {
                type: String,
                default: 'checkbox'
            },
            "has_actions": {
                type: Boolean,
                default: false
            },

            'columns': Array,
            'records': Array,
            'actions': Array,
            "action_label": {
                type: String,
                default: 'Actions'
            },
            "hide_all_actions": {
                type: Function,
                default: (record, idx) => {
                    return false;
                }
            },

            "page": {
                // type: Number,
                default: 0
            },
            "ntotal": {
                type: Number,
                default: 0
            },
            "per_page": {
                type: Number,
                default: 0
            }
        },
        data () {
            return {
                // checked, unchecked, indeterminate
                checkboxHeaderStatus: "unchecked",
            }
        },
        created() {},
        computed: {},
        
        methods: {
            dynamicComponent(value) {
                if (!_.isObjectLike(value)) {
                    return {
                        template: `<span>${value}</span>`,
                        methods: {}
                    }    
                }
                
                return {
                    template: value?.template || "",
                    methods: value?.methods || {},
                }
            },
            header_click(col) {
                if (_.has(col, "header_click")) {
                    col.header_click(col);

                    this.$emit("table-header-click", col)
                }
            },
            row_click(col, record, idx) {
                if (_.has(col, "row_click")) {
                    col.row_click(record, idx);
                }
            },

            row_style(col, record, idx) {
                if (_.has(col, "row_style")) {
                    return col.row_style(record, idx);
                }

                return {};
            },

            row_class(col, record, idx) {
                if (_.has(col, "row_class")) {
                    return col.row_class(record, idx);
                }

                return {};
            },

            row_text(col, record, idx) {

                let text = "";
                if (_.has(col, "row_text")) {
                    text = col.row_text(record, idx);
                }

                if (!_.isObjectLike(text)) {
                    return {
                        template: `<div>${text}</div>`,
                        methods: {}
                    }    
                }
                
                return {
                    template: text?.template || "",
                    methods: text?.methods || {},
                }
            },

            action_disabled(ac, record, idx) {
                if (_.has(ac, "disabled")) {
                    return ac.disabled(record, idx);
                }

                return false;
            },

            onPageChanged(event) {
                this.$emit("table-page-changed", event)
            },
            
            checkboxHeaderChange() {
                if (this.checkboxHeaderStatus=="checked") {
                    this.checkboxHeaderStatus = "unchecked";
                } else {
                    this.checkboxHeaderStatus = "checked";
                }

                this.$emit("table-page-select-all", this.checkboxHeaderStatus)
            },
            checkboxChange(row) {
                this.checkboxHeaderStatus = "indeterminate";
                this.$emit("table-page-select", row)
                
            },
        },

        components: {
            TablePagination,
            Fragment
        }
    }
</script>