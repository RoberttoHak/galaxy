<template>
  <div class="blog-wrapper">
    <div class="full-container">
      <h2 class="header-h">{{ $t("landing.blogTitle") }}</h2>

      <div class="content">
        <div
          v-for="(blog, index) in blogs.slice(0, 3)"
          :key="`blog_${index}`"
          class="blog-item"
        >
          <a target="_blank" :href="blog.url">
            <span class="display-f">
              <img :src="blogImage(blog.thumbnail)" class="blog-img" />
            </span>
            <div class="info">
              <p class="text-m-bold no-color-link mtb">
                {{ formatDate(blog.blog_date) }}
              </p>
              <p class="header-title1 no-color-link mtb">
                {{ blog.title }}
              </p>
              <span class="divider"></span>
              <div class="action">
                <span class="text-m-bold no-color-link">{{
                  $t("landing.readArticle")
                }}</span>
                <span>
                  <img
                    src="~/assets/img/icons/arrow-up-right.svg"
                    alt="arrow-up-right"
                  />
                </span>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Blog",
  props: {
    blogs: {
      type: Array,
      required: true,
    },
  },
  computed: {
    formatDate() {
      return (date) => {
        const options = {
          year: "2-digit",
          day: "2-digit",
          month: "2-digit",
        };
        const d = new Date(date).toLocaleString("en", options);
        return String(d).split(",")[0];
      };
    },
    blogImage() {
      return (image) => {
        if (image.includes("cdn-images")) {
          return image;
        }
        return require("~/assets/img/default-blog-img.png");
      };
    },
  },
};
</script>

<style lang="scss" scoped>
@import "assets/scss/components/landing/blog";
</style>
