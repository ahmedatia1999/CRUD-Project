import { configureStore } from "@reduxjs/toolkit";
import books from "./bookSlice";
import auth from "./authorSlice";
import report from "./reportSlice";

export default configureStore({
  reducer: {
    books,
    auth,
    report,
  },
});
