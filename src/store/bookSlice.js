import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { logInsert } from "./reportSlice";

export const getBooks = createAsyncThunk(
  "book/getBooks",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await fetch("https://json-server-2-hgl7.onrender.com/books");
      const data = await res.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.messege);
    }
  }
);

export const insertBook = createAsyncThunk(
  "book/insertBook",
  async (bookData, thunkAPI) => {
    const { rejectWithValue, getState, dispatch } = thunkAPI;
    try {
      bookData.userName = getState().auth.name;
      //dispatch
      dispatch(deleteBook({ id: 6 }));
      const res = await fetch("https://json-server-2-hgl7.onrender.com/books", {
        method: "POST",
        body: JSON.stringify(bookData),
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
      });
      const data = await res.json();
      dispatch(logInsert({ name: "insertBook", status: "success" }));
      return data;
    } catch (error) {
      dispatch(logInsert({ name: "insertBook", status: "failed" }));
      return rejectWithValue(error.messege);
    }
  }
);

export const deleteBook = createAsyncThunk(
  "book/deleteBook",
  async (item, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await fetch(
        `https://json-server-2-hgl7.onrender.com/books/${item.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json; charset=utf-8",
          },
        }
      );
      return item;
    } catch (error) {
      return rejectWithValue(error.messege);
    }
  }
);

export const getBook = createAsyncThunk(
  "book/getBook",
  async (item, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await fetch(
        `https://json-server-2-hgl7.onrender.com/books/${item.id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json; charset=utf-8",
          },
        }
      );
      return item;
    } catch (error) {
      return rejectWithValue(error.messege);
    }
  }
);

const bookSlice = createSlice({
  name: "book",
  initialState: {
    books: [],
    isloading: false,
    error: null,
    bookInfo: null,
  },
  extraReducers: {
    //get books
    [getBooks.pending]: (state, action) => {
      state.isloading = true;
      state.error = null;
    },
    [getBooks.fulfilled]: (state, action) => {
      state.isloading = false;
      state.books = action.payload;
    },
    [getBooks.rejected]: (state, action) => {
      state.isloading = false;
      state.error = action.payload;
    },

    //insert books
    [insertBook.pending]: (state, action) => {
      state.isloading = true;
      state.error = null;
    },
    [insertBook.fulfilled]: (state, action) => {
      state.isloading = false;
      state.books.push(action.payload);
    },
    [insertBook.rejected]: (state, action) => {
      state.isloading = false;
      state.error = action.payload;
    },

    //delete books
    [deleteBook.pending]: (state, action) => {
      state.isloading = true;
      state.error = null;
    },
    [deleteBook.fulfilled]: (state, action) => {
      state.isloading = false;
      state.books = state.books.filter((el) => el.id !== action.payload.id);
    },
    [deleteBook.rejected]: (state, action) => {
      state.isloading = false;
      state.error = action.payload;
    },

    //read Books
    [deleteBook.fulfilled]: (state, action) => {
      state.isloading = false;
      state.bookInfo = action.payload;
    },
  },
});

export default bookSlice.reducer;
