<template>
  <div class="article-section">
    <div class="article">
      <h1>{{post.title}}</h1>
      <ul>
        <li>• 分类: {{postTab}}</li>
        <li>• {{post.visit_count}}次访问</li>
        <li>• 发布于: {{post.create_at | timeDifference}}</li>
        <li>• 作者：
          <router-link :to="{name: 'user', params: {name: post.author.loginname}}">
            {{post.author.loginname}}
          </router-link>
        </li>
      </ul>
      <div v-html="post.content" class="content"></div>
    </div>
    <div class="reply">
      <div v-for="(reply, index) of post.replies" class="reply-sec">
        <div class="reply-up">
          <router-link :to="{name: 'user', params: {name: reply.author.loginname}}">
            <img :src="reply.author.avatar_url">
            <span>{{reply.author.loginname}}</span>
          </router-link>
          <span>{{index + 1}}楼</span>
        </div>
        <section v-if="reply.ups.length > 0">
           <i class="fa fa-thumbs-o-up"></i>{{reply.ups.length}}
        </section>
        <div v-html="reply.content" class="reply-content"></div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'left',
    data () {
      return {
        post: {
          author: {
            loginname: 'temp',
          }
        }
      }
    },
    computed: {
      postTab () {
        const type = this.post.tab.toString()
        if (type === 'ask') {
          return '问答'
        } else if (type === 'share') {
          return '分享'
        } else if (type === 'job') {
          return '招聘'
        } else if (type === 'good') {
          return '精华'
        } else {
          return '为定义'
        }
      }
    },
    methods: {
      getData () {
        this.$ajax.get('https://cnodejs.org/api/v1/topic/' + this.$route.params.id, {
          params: {
            mdrender: true
          }
        }).then(res => {
          console.log(res)
          this.post = res.data.data
        }).catch(err => {
          console.log(err)
        })
      }
    },
    beforeMount () {
      this.getData()
    }
  }
</script>

<style>
  /* "scoped" 属性会导致CSS仅对当前组件生效，
    而HTML绑定渲染出的内容可以理解为是子组件的内容，
    子组件不会被加上对应的属性，所以不会应用CSS。
    解决方法就是把 "scoped" 属性去掉😜 */
  @import url("../../assets/markdown-github.css");

  .article-section {
    -webkit-box-sizing: border-box; /*webkit的盒子模型: 默认值, 网页预设*/
    -moz-box-sizing: border-box; /*moz的盒子模型: 默认值, 网页预设*/
    box-sizing: border-box; /*盒子模型: 默认值, 网页预设*/
    display: inline-block;
    width: 70%;
    border: 0.1rem solid #ddd;
    padding: 1.1rem 0.6rem;
    margin-left: 3%;
  }

  .article-section .content {
    padding: 3.2rem 1.6rem 3.2rem 1.6rem;
    line-height: 1.6;
    padding-bottom: 1.6rem;
  }

  .article {
    background: white;
    margin-bottom: 1rem;
    padding-left: 2rem;
    padding-top: 1rem;
  }

  .article h1 {
    font-size: 2rem;
    font-weight: 600;
  }

  .article ul li {
    display: inline-block;
    font-size: 1.1rem;
    color: #A8A3A3;
    padding-left: 0.5rem;
  }

  .article li a {
    color: inherit; /*继承父级*/
    text-decoration: none;
    border-bottom: 0.1rem solid
  }

  .reply {
    display: flex;
    flex-direction: column; /*伸缩方向: 纵队, flex-direction用于指定内部元素如何在 flex 容器中布局 */
  }

  .reply-sec {
    box-sizing: border-box;
    border-bottom: 0.1rem solid #C0CCDA;
    width: 100%;
    padding: 1.6rem;
    background: white;
  }

  .reply-sec section {
    float: right;
    color: palevioletred;
  }

  .reply-up {
    display: inline-block;
  }

  .reply-up > span {
    display: inline-block;
    vertical-align: top; /*设置元素的垂直对齐方式, top: 把元素的顶端与行中最高元素的顶端对齐*/
    margin-top: 0.7rem;
    margin-left: 0.6rem;
    font-size: 1.4rem;
    color: #806767;
  }

  .reply-up a {
    color: black;
    text-decoration: none;
    font-weight: 600;
  }

  .reply-up a span {
    margin-left: -1.4rem;
    vertical-align: super; /*设置元素的垂直对齐方式, super: 垂直对齐文本的上标*/
  }

  .reply-content {
    padding-left: 5rem;
    clear: both;
  }

  .reply-sec img {
    width: 2.4rem;
    height: 2.4rem;
    margin-right: 1.6rem;
  }

  .reply-content img {
    overflow: hidden; /*文字超出部分隐藏*/
    width: 100%;
    height: 100%;
  }
</style>
