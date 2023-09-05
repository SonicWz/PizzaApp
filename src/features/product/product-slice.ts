import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IProduct } from '../../types';
import ProductsService, { IgetAll } from '../../API/ProductsService';

type fetchTypes = {
  limit: number,
  page: number,
  type?: string,
  sort?: string,
  order?: string,
}

export const fetchProducts = createAsyncThunk(
  '@@product/fetchProducts',
  async (options: fetchTypes, thunkAPI) => {
    const { limit, page, type, sort, order } = options;
    let fetchParams = {} as IgetAll;
    if (type === '') {
      fetchParams = {
        page: page,
        limit: limit,
        sort: sort,
        order: order,
      };
    } else {
      fetchParams = {
        page: page,
        limit: limit,
        type: type,
        sort: sort,
        order: order,
      };
    }
    try {
      const response = await ProductsService.getAll(fetchParams);
      return response;

    } catch (e) {
      return thunkAPI.rejectWithValue(`Ошибка: ${e}`);
    }
  }
)

export const fetchProductById = createAsyncThunk(
  '@@product/fetchProductById',
  async (productId: string | undefined, thunkAPI) => {
    try {
      const response = await ProductsService.getProductById(productId);
      return response;

    } catch (e) {
      return thunkAPI.rejectWithValue(`Ошибка: ${e}`);
    }
  }
);


export const fetchProductByName = createAsyncThunk(
  '@@product/fetchProductByName',
  async (productName: string | undefined, thunkAPI) => {
    try {
      const response = await ProductsService.getProductByName(productName);
      return response;

    } catch (e) {
      return thunkAPI.rejectWithValue(`Ошибка: ${e}`);
    }
  }
);

interface ProductSlice {
  products: IProduct[],
  currentProduct: IProduct,
  isLoading: boolean;
  error: string | undefined,
}

const initialState: ProductSlice = {
  products: [] as IProduct[],
  currentProduct: {} as IProduct,
  isLoading: false,
  error: '',
};

export const productsSlice = createSlice({
  name: '@@product',
  initialState,
  reducers: {
    setProducts(state, action: PayloadAction<IProduct[]>) {
      state.products = [...action.payload];
    },
    setProductsWithMoreBtn(state, action: PayloadAction<IProduct[]>) {
      state.products = [...state.products, ...action.payload];
    },
    setCurrentProduct(state, action: PayloadAction<IProduct>) {
      state.currentProduct = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = '';
      state.products = action.payload.data;
    });
    builder.addCase(fetchProducts.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });

    builder.addCase(fetchProductById.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = '';
      state.currentProduct = action.payload.data;
    });
    builder.addCase(fetchProductById.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchProductById.rejected, (state, action) => {
      state.isLoading = false;
    });

    builder.addCase(fetchProductByName.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = '';
      state.products = action.payload.data;
    });
    builder.addCase(fetchProductByName.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchProductByName.rejected, (state, action) => {
      state.isLoading = false;
    });

    
  },
});

export const productsReducer = productsSlice.reducer;

export const {
  setProducts,
  setCurrentProduct,
  setProductsWithMoreBtn,
} = productsSlice.actions;
