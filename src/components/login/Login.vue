<template>
    <div id="login">
        <div class="left"></div>
        <div class="center">
            <h2 class="login-title">欢迎登录WithYou</h2>
            <div class="account-div">
                <img class="account-icon" src="../../assets/login/account_icon.png"/>
                <input placeholder="邮箱 / 电话 / 昵称" @keyup.enter="login()" v-model="account" type="text"/>
            </div>
            <div class="password-div">
                <img class="account-icon" src="../../assets/login/password_icon.png"/>
                <input placeholder="密码" @keyup.enter="login()" v-model="password" type="password"/>
            </div>
            <div class="kaptcha-div">
                <img @click="refreshCode()" :src="src">
                <input @keyup.enter="login()" v-model="kaptcha" type="text"/>
            </div>
            <div class="error-notice">{{error_message}}</div>
            <div class="btn-div">
                <span class="btn btn-login" @click="login()">登录</span>
                <span class="btn btn-register"><router-link to="">注册</router-link></span>
            </div>
        </div>
        <div class="right"></div>
    </div>
</template>

<script>
    import global_ from "../config/Global"
    import Bus from "../../js/bus"

    const kaptcha_url = global_.URLS.KAPTCHA_URL;
    const login_url = global_.URLS.LOGIN_URL;
    export default {
        name: "",
        data() {
            return {
                account: "",
                password: "",
                kaptcha: "",
                error_message: "",
                src: kaptcha_url
            }
        },
        methods: {
            getUserInfo(token) {
                this.$http.get(global_.URLS.USER_INFO_URL, {
                    headers: {
                        bid: global_.FUNC.getBid(),
                        "X-HASYOU-TOKEN": token
                    }
                }).then((data) => {
                    let res = data.body;
                    if (res.code === 200) {
                        localStorage.setItem("user_info", JSON.stringify(res.data));
                        Bus.$emit('login-status', token);
                        let referer = this.$route.query.referer;
                        if (referer) {
                            this.$router.push({path: referer});
                        } else {
                            this.$router.push({path: "/"});
                        }
                    }
                });
            },
            goto() {
                this.$router.push("/register");
            },
            refreshCode() {
                let signature = global_.FUNC.getUuid();
                this.src = kaptcha_url + "?t=" + signature;
                sessionStorage.setItem("signature", signature);
            },
            checkUserState() {
                let token = localStorage.getItem("access_token");
                if (token) {
                    this.$router.push({path: "/"});
                }
            },
            login() {
                this.error_message = "";
                if (!this.validateParam()) {
                    return;
                }
                this.$http.post(login_url, {
                    account: this.account,
                    password: this.password,
                    signature: sessionStorage.getItem("signature"),
                    kaptcha: this.kaptcha
                }, {
                    headers: {
                        "bid": global_.FUNC.getBid()
                    }
                }).then(data => {
                    let res = data.body;
                    if (res.code === 5003) {
                        this.error_message = "验证码错误!";
                        return;
                    }

                    if (res.code === 5006) {
                        this.error_message = "账号或密码错误!";
                        return;
                    }

                    if (res.code === 5001) {
                        this.$router.push({path: "/register"});
                        return;
                    }

                    let token = res.data.access_token;
                    localStorage.setItem("access_token", token);
                    Bus.$emit('login-status', token);
                    let referer = this.$route.query.referer;
                    if (referer) {
                        this.$router.push({path: referer});
                    } else {
                        this.$router.push({path: "/"});
                    }
                    this.getUserInfo(token);
                });
            },
            validateParam() {
                if (!this.account) {
                    this.error_message = "账号不能为空!";
                    return false;
                }

                if (!this.password) {
                    this.error_message = "密码不能为空!";
                    return false;
                }

                if (!this.kaptcha) {
                    this.error_message = "验证码不能为空!";
                    return false;
                }
                return true;
            }
        },
        created() {
            this.refreshCode();
            this.checkUserState();
        }
    }
</script>

<style lang="scss" scoped>
    @import './css/login'
</style>
