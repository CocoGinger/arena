<template>
  <div id="dashboard">
    <transition name="fade">
      <CommentModal
        v-if="showCommentModal"
        :post="selectedPost"
        @close="toggleCommentModal()"
      ></CommentModal>
    </transition>
    <section>
      <div class="row">
        <div v-if="userProfile.name != null" class="col-lg col-sm col-md col1">
          <div class="profile">
            <h5>{{ userProfile.name }}</h5>
            <p>{{ userProfile.title }}</p>
            <div class="create-post">
              <p>Post Job</p>
              <form @submit.prevent>
                <textarea v-model.trim="post.content"></textarea>

                <button
                  @click="createPost()"
                  :disabled="post.content === ''"
                  class="button"
                >
                  Create
                </button>
              </form>
            </div>
          </div>
        </div>
        <div class="col-lg col-sm col-md col2">
          <div class="post">
            <div class="container">
              <!-- Full-width images with number text -->
              <div class="mySlides">
                <div class="numbertext">1 / 6</div>
                <img src="../assets/images/1.png" style="width: 100%" />
              </div>

              <div class="mySlides">
                <div class="numbertext">2 / 6</div>
                <img src="img_5terre_wide.jpg" style="width: 100%" />
              </div>

              <div class="mySlides">
                <div class="numbertext">3 / 6</div>
                <img src="img_mountains_wide.jpg" style="width: 100%" />
              </div>

              <div class="mySlides">
                <div class="numbertext">4 / 6</div>
                <img src="img_lights_wide.jpg" style="width: 100%" />
              </div>

              <div class="mySlides">
                <div class="numbertext">5 / 6</div>
                <img src="img_nature_wide.jpg" style="width: 100%" />
              </div>

              <div class="mySlides">
                <div class="numbertext">6 / 6</div>
                <img src="img_snow_wide.jpg" style="width: 100%" />
              </div>

              <!-- Next and previous buttons -->
              <a class="prev" onclick="plusSlides(-1)">&#10094;</a>
              <a class="next" onclick="plusSlides(1)">&#10095;</a>

              <!-- Image text -->
              <div class="caption-container">
                <p id="caption"></p>
              </div>
            </div>
          </div>
          <div v-if="posts.length">
            <div v-for="post in posts" :key="post.id" class="post">
              <h5>{{ post.userName }}</h5>
              <span>{{ post.createdOn | formatDate }}</span>
              <p>{{ post.content | trimLength }}</p>
              <ul>
                <li>
                  <a @click="toggleCommentModal(post)"
                    >Bids {{ post.comments }}</a
                  >
                </li>
                <li>
                  <a @click="likePost(post.id, post.likes)"
                    >Likes {{ post.likes }}</a
                  >
                </li>
                <li><a @click="viewPost(post)">View Job</a></li>
              </ul>
            </div>
          </div>
          <div v-else>
            <p class="no-results">There are currently no jobs available</p>
          </div>
        </div>
      </div>
    </section>

    <!-- full post modal -->
    <transition name="fade">
      <div v-if="showPostModal" class="p-modal">
        <div class="p-container">
          <a @click="closePostModal()" class="close">close</a>
          <div class="post">
            <h5>{{ fullPost.userName }}</h5>
            <span>{{ fullPost.createdOn | formatDate }}</span>

            <p>{{ fullPost.content }}</p>
            <ul>
              <li>
                <a>Bids {{ fullPost.comments }}</a>
              </li>
              <li>
                <a>Likes {{ fullPost.likes }}</a>
              </li>
            </ul>
          </div>
          <div v-show="postComments.length" class="comments">
            <div
              v-for="comment in postComments"
              :key="comment.id"
              class="comment"
            >
              <p>{{ comment.userName }}</p>
              <span>{{ comment.createdOn | formatDate }}</span>
              <p>{{ comment.content }}</p>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { commentsCollection } from "@/firebase";
import { mapState } from "vuex";
import moment from "moment";
import CommentModal from "@/components/CommentModal";
import { Carousel, Slide } from "vue-carousel";
export default {
  components: {
    CommentModal,
  },
  data() {
    return {
      post: {
        content: "",
        title: "",
      },
      showCommentModal: false,
      selectedPost: {},
      showPostModal: false,
      fullPost: {},
      postComments: [],
    };
  },
  computed: {
    ...mapState(["userProfile", "posts"]),
  },
  methods: {
    createPost() {
      this.$store.dispatch("createPost", {
        content: this.post.content,
      });
      this.post.content = "";
    },
    toggleCommentModal(post) {
      this.showCommentModal = !this.showCommentModal;

      // if opening modal set selectedPost, else clear
      if (this.showCommentModal) {
        this.selectedPost = post;
      } else {
        this.selectedPost = {};
      }
    },
    likePost(id, likesCount) {
      this.$store.dispatch("likePost", { id, likesCount });
    },
    async viewPost(post) {
      const docs = await commentsCollection
        .where("postId", "==", post.id)
        .get();

      docs.forEach((doc) => {
        let comment = doc.data();
        comment.id = doc.id;
        this.postComments.push(comment);
      });

      this.fullPost = post;
      this.showPostModal = true;
    },
    closePostModal() {
      this.postComments = [];
      this.showPostModal = false;
    },
  },
  filters: {
    formatDate(val) {
      if (!val) {
        return "-";
      }

      let date = val.toDate();
      return moment(date).fromNow();
    },
    trimLength(val) {
      if (val.length < 200) {
        return val;
      }
      return `${val.substring(0, 200)}...`;
    },
  },
};
</script>

<style lang="scss" scoped></style>
