<template>
    <div :class="input_class">
        <div ref="dateTimePicker" class="input-with-icon right input-with-icon-sm rangepicker" :id="id">
            <input :disabled="disabled" type="text" class="form-control input-sm py-2" :id="'input_'+id" :name="name" :placeholder="placeholder" data-input>
            <i class="fa-light fa-delete-left text-color-2" style="right: 40px;" data-clear></i>
            <i class="fa-light fa-calendar-days text-color-2" data-toggle></i>
        </div>
    </div>
</template> 
<style>
    /* .rangepicker > input[type="text"] {
        height: 42px;
    }

    .rangepicker.input-with-icon.right i {
        top: 13px;
    } */

</style>
<script>

    export default {
        props: {
            value: {
                required: true
            },

            name: {
                type: String,
                required: true
            },
            placeholder: {
                type: String,
                default: ""
            },
            id: {
                type: String,
                required: true
            },
            input_class: {
                type: Object,
                default: () => {
                    return {
                        "mb-3": true
                    }
                }
            },
            options: {
                type: Object,
                default: () => {
                    return {
                        mode: "single", 
                        displayFormat: 'Y-m-d', //for display on UI (php format)
                        enableTime: false, 
                        noCalendar: false,
                        outputFormat: "YYYY-MM-DD HH:mm:ss",
                        minDate: null,
                        maxDate: null,
                    }
                }
            },
            disabled: {
                type: Boolean,
                default: false
            }
        },
        computed: {

        },
        data () {
            return {
                datepicker: null,
            }
        },
        mounted() {
            this.rerender(this.value || null);
        },
        watch: {
            value: {
                handler: function (val, oldVal) {
                    // console.log("WATCH", val)
                    // this.$emit('input', this.form)
                },
                deep: true,
                immediate: true,
            }
        },
        created() {
        },
        methods: {
            
            rerender(initValue) {
                const {
                    mode, 
                    enableTime, 
                    displayFormat,
                    noCalendar,
                    outputFormat,
                    minDate,
                    maxDate,
                } = this.options;
                
            
                this.$nextTick(() => {
                    const dom = this.$refs.dateTimePicker;

                    
                    const datepickerConfig = {
                        wrap: true,
                        locale: 'th',
                        dateFormat: displayFormat || 'Y-m-d',
                        allowInput: true,
                        mode: mode || "single",
                        minDate: minDate,
                        maxDate: maxDate,
                        noCalendar: noCalendar || false,
                        enableTime: enableTime || false,
                        enableSeconds: enableTime || false,
                        onOpen: function(selectedDates, dateStr, instance) {
                            // instance.altInput.readOnly = true;
                        },
                        onClose: function(selectedDates, dateStr, instance) {
                            // instance.altInput.readOnly = false;
                            // instance.altInput.blur();
                        },
                        onChange: function(selectedDates, dateStr, instance) {
                            if (selectedDates.length==0) {
                                this.$emit('input', null);
                            }

                            if (mode=="single") {
                                if (_.isNil(selectedDates[0])) {
                                    this.$emit('input', null)
                                } else {
                                    this.$emit('input', this.$moment(selectedDates[0]).format(outputFormat))
                                }
                                
                            } else {
                                this.$emit('input', selectedDates.map(d => this.$moment(d).format(outputFormat)))
                            }
                        }.bind(this)
                    };


                    if (!_.isNil(initValue)) {
                        
                        if (mode=="single") {
                            const initDate = this.$moment(initValue, outputFormat)
                            const mmDisplayFormat = this.phpFormatToMomentFormat(displayFormat || 'Y-m-d');

                            datepickerConfig.defaultDate = initDate.format(mmDisplayFormat)
                            datepickerConfig.defaultHour = initDate.format("HH")
                            datepickerConfig.defaultMinute = initDate.format("mm")
                        } else {

                            const mmDisplayFormat = this.phpFormatToMomentFormat(displayFormat || 'Y-m-d');

                            const initDate = _.map(initValue, (v) => {
                                return this.$moment(v, outputFormat).format(mmDisplayFormat)
                            })

                            const initHour = _.map(initValue, (v) => {
                                return this.$moment(v, outputFormat).format("HH")
                            })

                            const initMinute = _.map(initValue, (v) => {
                                return this.$moment(v, outputFormat).format("mm")
                            })
                            

                            datepickerConfig.defaultDate = initDate
                            datepickerConfig.defaultHour = initHour
                            datepickerConfig.defaultMinute = initMinute
                        }
                        

                        // console.log(initDate, initDate.format(outputFormat || "YYYY-MM-DD HH:mm:ss"));
                        // console.log(datepickerConfig.defaultDate, datepickerConfig.defaultHour, datepickerConfig.defaultMinute);
                    }

                    if (_.isNil(this.datepicker)) {
                        this.datepicker = flatpickr(dom, datepickerConfig)
                    } else {
                        if (!_.isNil(initValue)) {
                            if (mode=="single") {
                                this.datepicker.setDate([datepickerConfig.defaultDate], false, displayFormat || 'Y-m-d')
                                
                            } else {
                                this.datepicker.setDate(datepickerConfig.defaultDate, false, displayFormat || 'Y-m-d')
                            }
                            
                        } else {
                            this.datepicker.setDate(null, false, displayFormat || 'Y-m-d')
                        }
                    }
                    
                });
            },

            phpFormatToMomentFormat(format) {
                const replacements = {
                    'd': 'DD',
                    'D': 'ddd',
                    'j': 'D',
                    'l': 'dddd',
                    'N': 'E',
                    'S': 'o',
                    'w': 'e',
                    'z': 'DDD',
                    'W': 'W',
                    'F': 'MMMM',
                    'm': 'MM',
                    'M': 'MMM',
                    'n': 'M',
                    't': '', // no equivalent
                    'L': '', // no equivalent
                    'o': 'YYYY',
                    'Y': 'YYYY',
                    'y': 'YY',
                    'a': 'a',
                    'A': 'A',
                    'B': '', // no equivalent
                    'g': 'h',
                    'G': 'H',
                    'h': 'hh',
                    'H': 'HH',
                    'i': 'mm',
                    's': 'ss',
                    'u': 'SSS',
                    'e': 'zz', // deprecated since version 1.6.0 of moment.js
                    'I': '', // no equivalent
                    'O': '', // no equivalent
                    'P': '', // no equivalent
                    'T': '', // no equivalent
                    'Z': '', // no equivalent
                    'c': '', // no equivalent
                    'r': '', // no equivalent
                    'U': 'X',
                }

                let newformat = "";
                _.each(format, (c) => {
                    if (_.has(replacements, c)) {
                        newformat += replacements[c];
                    } else {
                        newformat += c;
                    }
                })

                return newformat;
            },
        },
        components: {
        }
    }
</script>