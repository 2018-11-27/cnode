<template>
  <div class="user-infomation">
    <section>
      <img :src="userinfo.avatar_url" :title="userinfo.loginname">
      <span>{{userinfo.loginname}}</span>
      <div>{{userinfo.score}} 积分</div>
      <div>注册时间: {{userinfo.create_at | timeDifference}}</div>
    </section>
    <div class="replies">
      <div>回复的主题</div>
      <ul>
        <li v-for="item of userinfo.recent_replies">
          <router-link
            :to="{name: 'post_content', params: {id: item.id, name: item.author.loginname}}">
            {{item.title}}
          </router-link>
        </li>
      </ul>
    </div>
    <div class="topics">
      <div>创建的主题</div>
      <ul>
        <li v-for="item in userinfo.recent_topics">
          <router-link
            :to="{name: 'post_content', params: {id: item.id, name:item.author.loginname}}">
            {{item.title}}
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import {getUserinfo} from './article/right'

  export default {
    name: 'UserInfo',
    mixins: [getUserinfo],
    data () {
      return {
        userinfo: {}
      }
    }
  }
</script>

<style scoped>
  .user-infomation {
    background: white;
    width: 75%;
    margin: 1rem auto;
  }

  .user-infomation section {
    padding: 1.2rem;
  }

  .user-infomation img {
    width: 8rem;
  }

  .user-infomation li {
    list-style: none;
  }

  .user-infomation .replies,
  .user-infomation .topics {
    font-size: 1rem;
    border-top: 1rem #DDDDDD solid;
  }

  .user-infomation > div > div:nth-of-type(1) {
    padding: 1.2rem 0 1.2rem 1.2rem;
    background-color: rgba(212, 205, 205, 0.17);
    font-size: 1rem;
  }

  .user-infomation > div > ul > li {
    padding: 0.4rem 0 0.4rem 1.2rem;
    white-space: nowrap; /*禁止文字自动换行*/
    font-size: 1rem;
    text-overflow: ellipsis; /*将隐藏的文字替换为省略符*/
    overflow: hidden; /*文字超出部分隐藏*/
    line-height: 30px;
    vertical-align: middle; /*垂直对齐: 中间;*/
  }

  .user-infomation > div > ul > li > a {
    color: #094E99;
    text-decoration: none;
  }

</style>
