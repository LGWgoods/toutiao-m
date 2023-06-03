<template>
  <div class="login-container">
    <van-nav-bar title="登录/注册" class="page-nav-bar" />
    <van-form @submit="onSubmit" ref="loginForm">
      <van-field
        v-model="user.mobile"
        name="mobile"
        placeholder="请输入手机号"
        type="number"
        :rules="userFormRules.mobile"
      >
        <template #left-icon>
          <i class="toutiao toutiao-shouji"></i>
        </template>
      </van-field>
      <van-field
        v-model="user.code"
        name="验证码"
        placeholder="请输入验证码"
        :rules="userFormRules.code"
      >
        <template #left-icon>
          <i class="toutiao toutiao-yanzhengma"></i>
        </template>
        <template #button>
          <van-count-down
            :time="1000 * 5"
            format="ss s"
            v-if="isCountDownShow"
            @finish="isCountDownShow = false"
          />
          <van-button
            v-else
            size="small"
            type="default"
            round
            class="send-sms-btn"
            native-type="button"
            @click="onSendSms"
            >发送验证码</van-button
          >
        </template>
      </van-field>
      <div class="login-btn--wrap">
        <van-button block type="info" native-type="submit" class=""
          >登录</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { login, getSmsCode } from "@/api/user.js";
export default {
  name: "LoginIndex",
  components: {},
  props: {},
  data() {
    return {
      user: {
        mobile: "", // 手机号
        code: "", // 验证码
      },
      userFormRules: {
        mobile: [
          {
            required: true,
            message: "手机号不能为空",
          },
          {
            pattern: /^1[3|5|7|8]\d{9}$/,
            message: "手机号格式错误",
          },
        ],
        code: [
          {
            required: true,
            message: "验证码不能为空",
          },
          {
            pattern: /^\d{6}$/,
            message: "验证码格式错误",
          },
        ],
      },
      isCountDownShow: false, // 倒计时
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    // 登录
    async onSubmit() {
      this.$toast.loading({
        message: "登录中...",
        forbidClick: true,
        duration: 0,
      });
      try {
        const res = await login(this.user);
        this.$store.commit("setUser", res.data.data); // 调用vuex中mutations中的方法存储token值
        console.log("登录成功", res);
        this.$toast.success("登录成功");
      } catch (err) {
        if (err.response.status === 400) {
          this.$toast.fail("手机号或验证码错误");
        } else {
          this.$toast.fail("登录失败，请稍后重试", err);
        }
      }
    },
    // 验证码校验函数
    async onSendSms() {
      console.log("onSendSms");
      // 校验手机号
      // 验证通过，显示倒计时
      try {
        // 验证表单，支持传入 name 来验证单个或部分表单项
        console.log(this.$refs.loginForm.validate);
        await this.$refs.loginForm.validate("mobile");
        this.isCountDownShow = true;
      } catch (err) {
        return console.log("验证失败", err);
      }
      // 请求发送验证码
      try {
        await getSmsCode(this.user.mobile);
        this.$toast("发送成功");
      } catch (err) {
        this.isCountDownShow = false;
        if (err.response.status === 429) {
          this.$toast("发送太频繁了，请稍后重试");
        } else this.$toast("发送失败，请稍后重试");
      }
    },
  },
};
</script>

<style scoped lang="less">
.login-container {
  .toutiao {
    font-size: 37px;
  }
  .send-sms-btn {
    height: 46px;
    line-height: 46px;
    background-color: #ededed;
    font-size: 22px;
    color: #666;
  }
  .login-btn--wrap {
    padding: 53px 33px;
    .login-btn {
      background-color: #6db4fb;
      border: none;
    }
  }
}
</style>
