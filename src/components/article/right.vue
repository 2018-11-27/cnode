<template>
  <div class="sidebar">
    <div class="autherinfo">
      <div class="authersummay">
        <div>作者</div>
        <router-link :to="{name: 'user', params: {name: userinfo.loginname}}">
          <img :src="userinfo.avatar_url">
          <span>{{userinfo.loginname}}</span>
          <span class="fa fa-dedent" title></span>
        </router-link>
        <section>积分: {{userinfo.score}}</section>
      </div>
      <div class="recent_topics">
        <div>作者最近主题</div>
        <ul>
          <li v-for="item of topicsLimitBy5">
            <router-link
              :to="{name: 'post_content', params: {id: item.id, name: item.author.loginname}}"
              :title="item.title">
              {{item.title}}
            </router-link>
          </li>
        </ul>
      </div>
      <div class="recent_replies">
        <div>作者最近回复</div>
        <ul>
          <li v-for="item of userinfo.recent_replies">
            <router-link
              :to="{name: 'post_content', params: {id: item.id, name: item.author.loginname}}"
              :title="item.title">
              {{item.title}}
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import {watchRoute} from './index'

  let getUserinfo = {
    methods: {
      getData () {
        this.$ajax({
          url: 'https://cnodejs.org/api/v1/user/' + this.$route.params.name,
          method: 'get'
        }).then(res => {
          if (res.data.success) {
            this.userinfo = res.data.data
          }
        }).catch(err => {
          console.log(err)
        })
      }
    },
    beforeMount () {
      this.getData()
    }
  }

  export default {
    name: 'right',
    mixins: [watchRoute, getUserinfo],
    data () {
      return {
        userinfo: {
          // 设置默认值，用于避免Vue在axios未被调用前报错
          loginname: '',
          recent_topics: []
        },
      }
    },
    computed: {
      topicsLimitBy5 () {
        return this.userinfo.recent_topics.slice(0, 5)
      }
    }
  }

  // 在UserInfo组件中复用getUserinfo
  export {getUserinfo}
</script>

<style scoped>
  .sidebar {
    float: right;
    width: 24%;
    box-sizing: border-box; /*盒子模型: 默认值, 网页预设*/
    margin-right: 3%;
    padding: 1.2rem 0.6rem;
    margin-top: 0.1rem;
  }

  .sidebar .autherinfo {
    background: white;
  }

  /*div:nth-of-type(1): 第1个div标签*/
  .autherinfo > div > div:nth-of-type(1) {
    font-size: 1rem;
    padding: 1.2rem 0 1.2rem 1.2rem;
    background-color: rgba(212, 205, 205, 0.17)
  }

  .autherinfo img {
    width: 5rem;
    display: inline-block;
    padding: 0 0 0 0.6rem;
    border-radius: 0.3rem;
  }

  .autherinfo a {
    text-decoration: none;
    color: #A8A3A3;
  }

  .autherinfo .authersummay a {
    display: inline-block;
    padding: 1.2rem 0 0 0.6rem;
    vertical-align: top;
  }

  .autherinfo .authersummay a span {
    margin-top: 2rem;
    margin-left: 0.2rem;
  }

  /*span[title]: 带有title属性的span标签*/
  .autherinfo .authersummay a span[title] {
    color: green;
    font-size: 0.2rem;
  }

  .autherinfo section {
    padding: 1.2rem 0 1.2rem 1.2rem;
    font-size: 1rem;
  }

  .autherinfo li {
    list-style: none;
  }

  .recent_topics,
  .recent_replies {
    font-size: 1rem;
    border-top: 1rem #DDDDDD solid;
  }

  .recent_topics li,
  .recent_replies li {
    padding: 0.4rem 0 0 1.2rem;
    color: #C0CCDA;
    white-space: nowrap;
  }

  .recent_topics ul,
  .recent_replies ul {
    padding: 1rem 0 1rem 0;
  }

  .recent_topics li a,
  .recent_replies li a {
    text-overflow: ellipsis; /*将隐藏的文字替换为省略符*/
    overflow: hidden; /*文字超出部分隐藏*/
    max-width: 95%;
    display: inline-block;
  }

</style>
