<template>
    <div :class="input_class">
        <file-upload
            class="d-block border-1 rounded-2 text-center p-3 mb-4"
            :name="name"
            ref="upload"
            v-model="files"
            :custom-action="upload"
            :extensions="extensions"
            :accept="accept" 
            :multiple="multiple" 
            :size="size" 

            :drop="true"
            :disabled="disabled"
            @input-file="inputFile"
            @input-filter="inputFilter">

            <div>
                <div :class="{'file-container': true, 'mb-3': (!disabled && noFiles)}">
                    <div class="icon-upload m-auto" v-show="noFiles">
                        <i class="fa-regular fa-cloud-arrow-up"></i>
                    </div>

                    <div :class="{'icon-uploaded border-1 rounded-2 mb-3':true, 'd-flex': !file.hide, 'd-none': file.hide}" v-for="file in existingFiles"> 
                        <div class="icon-upload icon-file">
                            <i :class="file_icon"></i>
                        </div>
                        <p class="mb-0 px-2 file-name" v-on:dblclick="showNameInput(file)" v-show="!file.edit">{{file.name}}</p>
                        <p class="mb-0 p-2 file-name file-name-input" v-show="file.edit">
                            <input type="text" v-on:keydown.enter="updateName(file)" class="form-control flex-grow-1" placeholder="ชื่อไฟล์" v-model="file.name">
                        </p>

                        <p class="mb-0 px-2" 
                            style="line-height: 60px;margin-left: auto;" 
                            @click.prevent="cancelFile(file)" 
                            v-show="!file.hide && !disabled">
                            <button type="button" class="btn btn-link" >
                                Cancel
                            </button>
                        </p>

                    </div>

                    <div :class="{'icon-uploaded border-1 rounded-2 mb-3':true, 'd-flex': (!file.hide && !!file.response), 'd-none': (file.hide || !file.response)}" v-for="file in files"> 
                        <div class="icon-upload icon-file">
                            <i :class="file_icon"></i>
                            
                        </div>
                        <p class="mb-0 px-2 file-name" v-on:dblclick="showNameInput(file)" v-show="!file.edit">{{file.name}}</p>
                        <p class="mb-0 p-2 file-name file-name-input" v-show="file.edit">
                            <input type="text" v-on:keydown.enter="updateName(file)" class="form-control flex-grow-1" placeholder="ชื่อไฟล์" v-model="file.name">
                        </p>

                        <p class="mb-0 px-2" style="line-height: 60px;margin-left: auto;" v-show="!file.hide && !file.success">
                            <!-- <button type="button" class="btn btn-link" >
                                Uploading...
                            </button> -->
                            <pulse-loader :loading="true" :color="'#2038c4'" :size="'10px'"></pulse-loader>
                        </p>

                        <p class="mb-0 px-2" 
                            style="line-height: 60px;margin-left: auto;" 
                            @click.prevent="cancelFile(file)" 
                            v-show="!file.hide && file.success">
                            <button type="button" class="btn btn-link" >
                                Cancel
                            </button>
                        </p>

                    </div>
                </div>
                
                <p class="mb-0" v-html="placeholder" v-show="!disabled && noFiles"></p>
                <p class="mb-0" v-show="!disabled && noFiles">{{ extensionsLabel }}</p>
            </div>
        </file-upload>
    </div>
</template> 
<style>
    .btn.btn-link {
        color: var(--bs-primary) !important;
        text-decoration: none; 
        font-weight: 400;
    }

    .file-uploads > label {
        z-index: 80;
        position: relative;
    }

    .file-uploads .file-container .icon-uploaded {
        z-index: 100;
        position: relative;
    }

    .file-uploads .file-container .icon-uploaded:last-child {
        margin-bottom: 0px !important;
    }

    .icon-uploaded .v-spinner {
        height: 60px;
        padding: 10px 15px;
        margin-top: -5px;
    }

    .file-container .file-name {
        line-height: 60px;
        max-width: 260px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        cursor: pointer;
    }

    .file-container .file-name.file-name-input{
        width: 100%;
        max-width: none;
        padding: .5rem;   
    }

    .file-container .file-name.file-name-input > input[type="text"] {
        width: 100% !important;
        position: relative;
        opacity: 1;
        height: inherit;
        background: inherit;
        z-index: inherit;
    }

    .file-container .icon-upload.icon-uploaded-image {
        width: 60px;
        height: 60px;
        background-size: cover;
        background-position: center;
        display: inline-block;
        position: relative;
    }                    
    
    .file-container .icon-upload.icon-uploaded-image .fa-close{
        position: absolute;
        top: -5px;
        left: 35px;
        font-size: 10px;
        background-color: #888;
        color: #fff;
        border-radius: 10px;
        padding: 3px 5px;
        width: 16px;
        height: 16px;
    }
</style>
<script>
    import FileService from "../services/FileService";
    import PulseLoader from 'vue-spinner/src/PulseLoader.vue'

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
                default: `<span class="text-primary">คลิกเพื่อเลือกรูปโลโก้</span> หรือ ลากรูปโลโก้`
            },
            id: {
                type: String,
                required: true
            },

            file_name: {
                type: String,
                required: false,
                default: null,
            },

            file_type: {
                type: String,
                required: true,
            },

            reference_id: {
                type: String,
                required: false,
                default: null,
            },

            input_class: {
                type: Object,
                default: () => {
                    return {
                        "mb-3": true
                    }
                }
            },
            extensions: {
                type: Array,
                default: () => {
                    return ['jpg', 'jpeg', 'png']
                }
            },
            accept: {
                type: String,
                default: "image/*"
            },
            multiple: {
                type: Boolean,
                default: true
            },
            ediable_name: {
                type: Boolean,
                default: false
            },
            size: {
                type: Number,
                default: 1024*1024*5 //5MB
            },
            file_icon: {
                type: String,
                default: "fa fa-regular fa-file-image"
            },
            disabled: {
                type: Boolean,
                default: false
            },
            custom_upload: {
                type: Function,
                default: (formData) => {
                    return FileService.upload(formData);
                }
            }
        },
        computed: {
            extensionsLabel: function() {
                return _.map(this.extensions, (ext) => "."+ext).join(", ");
            },

            noFiles: function() {
                if (this.files.length<=0 && this.existingFiles.length<=0) {
                    return true;
                }

                let exists = false;
                this.files.forEach(file => {
                    if (!file.hide && !!file.response) {
                        exists = true;
                    }
                });

                this.existingFiles.forEach(file => {
                    if (!file.hide) {
                        exists = true;
                    }
                });
                
                return !exists;
            }
        },
        data () {
            return {
                files: [],
                existingFiles: [],
                uploadedFiles: [],
            }
        },
        mounted() {
            
        },
        watch: {
            // "$refs.upload.uploaded": {
            //     handler: function (val, oldVal) {
            //         // console.log("WATCH", val)
            //         console.log("WATCH", val)
            //         // this.$emit('input', this.form)
            //     },
            //     deep: true,
            //     immediate: true,
            // }
        },
        created() {
        },
        methods: {
            
            rerender(initFiles) {
                this.existingFiles = initFiles.map(file => {
                    return {
                        id: file.id,
                        path: file.file_path,
                        name: file.file_name,
                        original_file_name: file.file_name,
                        hide: false,
                        active: true,
                        success: true,
                        edit: false,
                    }
                });
            },

            // If the newFile value is undefined, it is deleted 
            // If the oldFile value is undefined, it is added 
            // If the newFile, oldFile are both not undefined, it is updated
            inputFile(newFile, oldFile) {
                // clear existing files
                this.existingFiles = [];

                if (newFile) {
                    newFile.active = true;
                    newFile.hide = false;
                    newFile.edit = false;
                }
            },

            inputFilter (newFile, oldFile, prevent) {
                if (!_.isNil(newFile)) {
                    if (!_.some(this.extensions, (ext) => newFile.name.endsWith("."+ext))) {
                        this.$toast.error(`Not allow this file extension: ${newFile.name}`);
                        return prevent()
                    }

                    if (newFile.size > this.size || newFile.error == "size") {
                        this.$toast.error(`File size is too large`);
                        return prevent()
                    }

                    if (newFile.error != "") {
                        // console.log("aa", newFile.error, newFile.error=="")
                        this.$toast.error(`Cannot upload this file [${newFile.error}]: ${newFile.name}`);
                        return prevent()
                    }
                }

                // // Create a blob field
                // newFile.blob = ''
                // let URL = window.URL || window.webkitURL
                // if (URL && URL.createObjectURL) {
                //     newFile.blob = URL.createObjectURL(newFile.file)
                // }
            },

            cancelFile(file) {
                file.active = false;
                file.hide = true;
                file.edit = false;
                this.triggerInputEvent();
            },

            async upload(file) {
                file.hide = false;
                
                const formData = new FormData();
                formData.append("file_name", file.name);
                formData.append("file", file.file);
                formData.append("file_type", this.file_type);
                formData.append("reference_id", this.reference_id);

                const resp = await this.custom_upload(formData).catch(error => {
                    return null;
                });
                
                if (_.isNil(resp)) {
                    this.$toast.error(`Cannot upload this file: ${file.name}`);
                    file.response = null;
                    return null;
                }

                file.response = resp;
                file.original_file_name = file.name;

                this.triggerInputEvent();

                return resp;
            },

            showNameInput(file) {
                if (!this.ediable_name) {
                    return;
                }

                file.edit = true;
            },

            async updateName(file, existing=false) {
                if (!this.ediable_name) {
                    return;
                }

                file.edit = false;

                let file_id = file?.response?.data?.data?.id || file.id || null;
                
                if (_.isNil(file_id)) {
                    this.$toast.error(`Cannot update this file: ${file.original_file_name}`);
                    return;
                }

                const sp = (file?.original_file_name || "").split('.');
                const fileext = (sp.length>1)? "."+sp.pop(): "";
                
                let filename = file.name;
                if (!_.endsWith(filename, fileext)) {
                    filename = filename + fileext;
                }
                
                const resp = await FileService.update(file_id, {
                    file_name: filename
                }).catch(error => {
                    return null;
                });

                if (_.isNil(resp)) {
                    this.$toast.error(`Cannot update this file: ${file.original_file_name}`);
                    file.name = file.original_file_name;
                    return null;
                }

                file.name = filename;
                file.response = resp;



                this.triggerInputEvent();                
            },

            triggerInputEvent() {

                // must have file_path, file_name, id;
                const fileoutputs = this.files.filter(file => {
                    return !_.isNil(file?.response?.data?.data);
                })
                .filter(file => {
                    return !file.hide || !file.success;
                })
                .map(file => {
                    const data = file?.response?.data?.data || {};
                    return {
                        file_path: data.file_path,
                        file_name: data.file_name,
                        id: data.id,
                    };
                })

                const exisitingfileoutputs = this.existingFiles
                .filter(file => {
                    return !file.hide;
                })
                .map(file => {
                    return {
                        file_path: file.path,
                        file_name: file.name,
                        id: file.id,
                    };
                })

                
                this.$emit('input', _.concat(fileoutputs, exisitingfileoutputs));
            },
        },
        components: {
            PulseLoader
        }
    }
</script>