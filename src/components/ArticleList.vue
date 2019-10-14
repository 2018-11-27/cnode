<template>
  <div class="posts">
    <ul>
      <li v-for="post in posts">
        <router-link :to="{ name: 'user', params: {name: post.author.loginname }}">
          <img :src="post.author.avatar_url">
        </router-link>
        <span>{{ post.reply_count }} | {{ post.visit_count }}</span>
        <router-link
          :to="{ name: 'post_content', params: { id: post.id, name: post.author.loginname }}">
          {{ post.title }}
        </router-link>
        <span class="last_reply">
          {{ post.last_reply_at | timeDifference }}
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'PostList',
    data () {
      return {
        posts: {}
      }
    },
    methods: {
      getData () {
        this.$ajax.get('https://cnodejs.org/api/v1/topics', {
          params: {
            page: 1,
            limit: 30
          }
        }).then(res => {
          if (res.data.success) {
            this.posts = res.data.data
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
</script>

<style scoped>
  .posts {
    background-color: white;
    padding: 1rem;
    margin: 0.6rem 4rem;
  }

  /* posts 类下的 li 标签 */
  .posts, li {
    list-style: none;
    margin-bottom: 14px;
    border-bottom: 1px solid #E7E7E7;
    line-height: 30px;
  }

  .posts ul li img {
    width: 2.5rem;
    height: 2.5rem;
  }

  .posts li span {
    display: inline-block;
    text-align: center;
    width: 7rem;
    font-size: 1.2rem;
    margin: 0 1rem;
  }

  .posts a {
    text-decoration: none;
    color: inherit;
    -o-text-overflow: ellipsis; /*使溢出的文本省略*/
    white-space: nowrap; /*禁止文字自动换行*/
    display: inline-block;
    vertical-align: middle; /*垂直对齐: 中间;*/
    overflow: hidden; /*文字超出部分隐藏*/
    text-overflow: ellipsis; /*将隐藏的文字替换为省略符*/
    max-width: 70%;
  }

  .posts a:visited {
    color: #858585;
  }

  .posts .last_reply {
    float: right;
    font-size: 1rem;
    margin-top: 0.6rem;
  }
</style>
