import { createApp } from "vue";
import { initMocks } from "./mockData";
import App from "./App.vue";

createApp(App).mount("#app");
initMocks();
