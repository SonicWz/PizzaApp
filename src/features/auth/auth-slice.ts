import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from 'firebase/auth';

interface IAuth {
  email: string,
  password: string,
}

export const signIn = createAsyncThunk(
  '@@product/signIn',
  async ({ email, password }: IAuth, thunkAPI) => {
    const auth = getAuth();
    let user = {} as IAuthSlice;

    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      user = {
        email: response.user.email,
        token: response.user.refreshToken,
        id: response.user.uid
      };
      return user;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
)
export const signUp = createAsyncThunk(
  '@@product/signUp',
  async ({ email, password }: IAuth, thunkAPI) => {
    const auth = getAuth();
    let user = {} as IAuthSlice;

    try {
      const response = await createUserWithEmailAndPassword(auth, email, password);
      user = {
        email: response.user.email,
        token: response.user.refreshToken,
        id: response.user.uid
      };
      return user;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
)

interface IAuthSlice {
  email: null | string,
  token: null | string,
  id: null | string,
  isLoading?: boolean;
  error?: string | undefined,
}

const initialState: IAuthSlice = {
  email: null,
  token: null,
  id: null,
  isLoading: false,
  error: undefined
};

export const authSlice = createSlice({
  name: '@@auth',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<IAuthSlice>) {
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.id = action.payload.id;
    },
    logOut(state) {
      return initialState;
    },
    clearError(state) {
      state.error = undefined;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(signIn.fulfilled, (state, action) => {
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.id = action.payload.id;
      state.isLoading = false;
      state.error = '';
    });
    builder.addCase(signIn.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(signIn.rejected, (state, action: any) => {
      state.isLoading = false;
      
      let error = '';
      switch (action.payload.code) {
        case ('auth/missing-password'): { error = 'Неправильный логин/пароль'; break; }
        case ('auth/wrong-password'): { error = 'Неправильный логин/пароль'; break; }
        case ('auth/invalid-email'): { error = 'Неправильный логин/пароль'; break; }
        case ('auth/weak-password'): { error = 'Неправильный логин/пароль'; break; }
        default: { break; }
      }
      state.error = error;  
      debugger
    });

    builder.addCase(signUp.fulfilled, (state, action) => {
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.id = action.payload.id;
      state.isLoading = false;
      state.error = '';
    });
    builder.addCase(signUp.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(signUp.rejected, (state, action: any) => {
      state.isLoading = false;
      let error = '';
      switch (action.payload.code) {
        case 'auth/missing-password': { error = 'Не указан пароль'; break; }
        case 'auth/invalid-email': { error = 'Недопустимый email'; break; }
        case 'auth/weak-password': { error = 'Пароль должен быть не менее 6 символов'; break; }
        default: { break; }
      }
      state.error = error;
      debugger
    });
  },
});

export const authReducer = authSlice.reducer;

export const {
  setUser,
  logOut,
  clearError,
} = authSlice.actions;
