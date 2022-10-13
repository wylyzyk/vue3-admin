import { defineComponent } from "vue";

export default defineComponent({
  name: "ErrorPage",
  setup() {
    return () => (
      <>
        <h2>404</h2>
      </>
    );
  }
});
