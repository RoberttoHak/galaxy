<template>
  <transition v-if="showModal" name="modal" :duration="333" mode="out-in">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <HeadingRow :title="heading" @close="close" />
          <p v-if="desc" class="text-m text-center">{{ desc }}</p>
          <slot></slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import HeadingRow from "~/components/modals/nft/HeadingRow.vue";

export default {
  name: "NftWalletModal",
  components: {
    HeadingRow,
  },
  props: {
    showModal: {
      type: Boolean,
      required: false,
      default: true,
    },
    heading: {
      type: String,
      required: true,
      default: "",
    },
    desc: {
      type: String,
      required: false,
      default: "",
    },
  },
  methods: {
    addWallet(wallet) {
      this.$emit("addWallet", wallet);
    },

    close() {
      this.$store.commit("setModal", {
        show: false,
        type: null,
      });
      this.$emit("close");
    },
  },
};
</script>

<style scoped lang="scss">
@import "~assets/scss/modals/nft/index";
</style>
