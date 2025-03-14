<template>
    <section class="section">
        <div class="container mt-5">
            <div class="row">
                <div class="col-12 col-sm-8 offset-sm-2 col-md-6 offset-md-3 col-lg-6 offset-lg-3 col-xl-4 offset-xl-4">
                    <div class="login-brand">
                        <h3>หวังโต๊ะกังเยาวราช</h3>
                    </div>

                    <div class="card card-primary card-login">
                        <div class="card-header"><h4>เข้าสู่ระบบ</h4></div>

                        <div class="card-body">
                            <form method="POST" @submit.prevent="login" class="needs-validation" novalidate="">
                                
                                <div class="mb-3">
                                    <label for="username" class="form-label">ชื่อผู้ใช้งาน</label>
                                    <input 
                                        v-model="form.username"
                                        id="username" 
                                        type="email" 
                                        :class="{'form-control': true, 'is-invalid': invalidInputs['username']}" 
                                        name="username" 
                                        required autofocus autocomplete="username">
                                    
                                    <span class="invalid-feedback" role="alert" v-show="invalidInputs['username']">
                                        กรุณากรอกชื่อผู้ใช้งาน
                                    </span>
                                
                                </div>

                                <div class="mb-3">
                                    <label for="password" class="form-label">รหัสผ่าน</label>
                                    <input 
                                        v-model="form.password"
                                        id="password" 
                                        type="password" 
                                        :class="{'form-control': true, 'is-invalid': invalidInputs['password']}" 
                                        name="password" 
                                        required autocomplete="current-password">
                                    <span class="invalid-feedback" role="alert" v-show="invalidInputs['password']">
                                        กรุณากรอกรหัสผ่าน
                                    </span>
                                </div>

                                <div class="form-check mb-3">
                                    <input class="form-check-input" type="checkbox" name="remember" id="remember">
                                    <label class="form-check-label" for="remember">
                                        จดจำการเข้าสู่ระบบ
                                    </label>
                                </div>

                                <div class="form-group">
                                    <!-- <a href="{{route('home')}}" class="btn btn-primary btn-lg d-block">เข้าสู่ระบบ</a> -->
                                    <button type="submit" class="btn btn-primary btn-lg btn-block" tabindex="4" :disabled="!valid">
                                        เข้าสู่ระบบ
                                    </button>
                                </div>
                            </form>

                        </div>
                    </div>
                    <div class="simple-footer">
                        Copyright © 2022 หวังโต๊ะกังเยาวราช
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>


<script>
    import AuthService from '../services/AuthService.js';
    
    export default {
        data () {
            return {
                valid: false,
                form: {
                    username: '',
                    password: '',
                },

                invalidInputs: {
                    username: false,
                    password: false,
                },

                tuchedInputs: {
                    username: false,
                    password: false,
                }

                
            }
        },
        created() {
            

            

            
        },
        destroyed() {
            
        },
        mounted() {
		},
        watch: { 
            form: {
                handler: function (val, oldVal) {
                    this.validate();
                },
                deep: true,
                immediate: true,
            }
        },
        methods: {
            scrollToTop() {
                window.scrollTo({
                    top: 0,
                    left: 0,
                    behavior: 'smooth'
                })
            },

            validate() {
                let valid = true;
				const form = this.form;

                const required_fields = ["username", "password"];
                _.each(required_fields, (field) => {
                    if (_.isNil(form[field]) || form[field]=="") {
                        this.invalidInputs[field] = true;
                        valid = false;
                    } else {
                        this.invalidInputs[field] = false;
                        this.tuchedInputs[field] = true;
                    }

                    // Ignore validation if form is not yet touched;
                    if (!this.tuchedInputs[field]) {
                        this.invalidInputs[field] = false;
                    }

                });

                this.valid = valid;   
                return this.valid;
            },

            login() {
                this.$store.dispatch("loader/show");
                
                AuthService.login(this.form)
                .then(({data}) => {

                    
                    AuthService.setToken(data?.access_token, data?.refresh_token, data?.user || {}); //set local storage
                    this.$router.push({ name: "Home" })
                    this.form.username = ""
                    this.form.password = ""
                })
                .catch((error) => {
                    console.log(error)
                    const e = (error?.response?.data?.message || "Error");
                    this.$toast.error(e);
                }).finally(() => {
                    this.$store.dispatch("loader/hide");;
                });
            },
        },
        components: {
        }
    }
</script>