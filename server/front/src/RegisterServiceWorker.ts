import { register }from "register-service-worker";

/*eslint @typescript-eslint/no-unused-vars:0*/

if (process.env.NODE_ENV === "production") {
  register(`${process.env.BASE_URL}service-worker.js`, {
    ready() {
    },
    registered() {
    },
    cached() {
    },
    updatefound() {
    },
    updated() {
    },
    offline() {
    },
    error(e) {
    }
  });
}