<template>
    <div :class="input_class">
        <label 
            style="flex-direction: column;"
            :class="{'image-input': true, 'hidden': previewImage.showed, 'flex': !previewImage.showed}">
            <input 
                ref="image"
                @change="showPreview($event)" 
                type="file" 
                accept="image/*" capture="environment" class="hidden">
            <p>{{ placeholder }}</p>
            <!-- <div class="flex justify-center items-center p-4 h-[52px] border-l border-[#D0D5DD]">
                <i class="fa-solid fa-paperclip text-2xl" style="color:#9D6B3D;"></i>
            </div> -->
            <i class="fa-solid fa-camera text-3xl" style="color:#CBCBCB;"></i>
        </label>

        <!-- Image preview container -->

        
        <div :class="{'relative': true, 'hidden': !previewImage.showed, 'flex': previewImage.showed}" style="background-color: #eee;">
            <img 
                @click="openImage(previewImage)" 
                :src="previewImage.src" :class="{'image-preview': true, ...previewImage.style}" 
                alt="Image preview">
            
            
            <button 
                type="button"
                @click="clearImage()"
                class="image-icon-trash">
                <i class="fa fa-solid fa-trash text-sm bg-gray-600" style="color:#FFFF;"></i>
            </button>
        </div>

        <!-- No Image Selected Message -->
        <!-- <p  :class="{'text-gray-500 text-sm': true, 'hidden': !previewImage.showed}">No image selected</p> -->
        

    </div>
</template> 
<style scoped>

    /*text-lg font-light */

    .flex {
        display: flex;
    }

    .relative {
        position: relative;
    }

    .absolute {
        position: absolute;
    }

    .hidden {
        display: none;
    }

    .text-3xl {
        font-size: 1.875rem !important;
        line-height: 2.25rem !important;
    }

    .image-input,
    .image-preview {
        cursor: pointer;
        justify-content: center !important;
        align-items: center !important;

        min-height: 130px;
        max-height: 500px;
        max-width: 100%;
        width: 100%;

        border-width: 1px !important;
        border-color: #D0D5DD;
        border-radius: 0.75rem !important;

        /* padding-left: 1.25rem !important;
        padding-right: 1.25rem !important; */

        background-color: #eee;

    }

    .image-preview {
        --tw-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1) !important;
        --tw-shadow-colored: 0 4px 6px -1px var(--tw-shadow-color), 0 2px 4px -2px var(--tw-shadow-color) !important;
        box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow) !important;

        -o-object-fit: cover !important;
        object-fit: cover !important;

        width: auto;
        max-height: 200px;
        margin: auto;
        border-radius: 0px !important;
    }

    /* absolute top-3 right-3 flex justify-center items-center w-6 h-6 bg-gray-600 rounded-full z-10 */
    .image-icon-trash {
        position: absolute;
        
        top: 0.75rem !important;
        right: 0.75rem !important;
        
        display: flex;
        justify-content: center !important;
        align-items: center !important;

        width: 1.5rem !important;
        height: 1.5rem !important;

        background-color: rgb(75 85 99) !important;

        border-radius: 9999px !important;
        z-index: 10 !important;
    }

    .image-icon-trash .fa{
        font-size: 0.875rem !important;
        line-height: 1.25rem !important;
    }

    
    /* @media (min-width: 390px) {
        .image-input {
            width: 350px;
        }
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
                previewImage: {
                    file: null,
                    showed: false,
                    src: "#",
                    classes: {
                        "hidden": true
                    }
                }

            }
        },
        created() {

        },
        beforeDestroy() {

        },
        methods: {
            
            rerender(initValue) {
                if (!_.isNil(initValue)) {
                    this.previewImage.src = initValue;
                    this.previewImage.classes = {"hidden": false}
                    this.previewImage.showed = true;
                } else {
                    this.previewImage.src = null;
                    this.previewImage.classes = {"hidden": true}
                    this.previewImage.showed = false;
                }
            },

            clearImage() {
                this.previewImage.src = "#"; 
                this.previewImage.classes = {"hidden": true} 
                this.previewImage.showed = false;

                this.$emit('input', null);
                this.$refs.image.value = null;
            },

            showPreview($event) {
                const file = event.target.files[0]; // Get the uploaded file

                if (file && file.type.startsWith("image/")) {
                    const reader = new FileReader();

                    // Load the image file
                    reader.onload = (e) => {
                        const image_data_url = e.target.result; // Set the preview image source

                        this.previewImage.src = image_data_url;
                        this.previewImage.classes = {"hidden": false}
                        this.previewImage.showed = true;

                        this.$emit('input', image_data_url);
                    };

                    reader.readAsDataURL(file); // Read the file as a data URL to display it
                } else {
                    this.previewImage.src = "#"; 
                    this.previewImage.classes = {"hidden": true} 
                    this.previewImage.showed = false;
                    this.$refs.image.value = null;
                }
            },
            
            openImage(previewImage) {
                if (_.startsWith(previewImage.src, "http")) {
                    window.open(previewImage.src, '_blank')
                    return;
                }

                var image = new Image();
                image.src = previewImage.src;
                image.style.width = "100vw";
                var w = window.open("");
                w.document.write(image.outerHTML);
                w.document.close();
            }
        },
        components: {

        }
    }
</script>