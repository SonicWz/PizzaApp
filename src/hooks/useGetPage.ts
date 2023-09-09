import { setPage } from '../features/pagination/pagination-slice';
import { fetchProducts } from '../features/product/product-slice';
import { useAppDispatch, useAppSelector } from './redux';


export const useGetPage = () => {


  const dispatch = useAppDispatch();
  
  const { limit } = useAppSelector(state => state.pagination);
  const { filter } = useAppSelector(state => state);
  const { type } = useAppSelector(state => state.filter);

  const getPage = (page: number): void => {
    
    dispatch(setPage(page));
    dispatch(fetchProducts({ 
      limit, 
      page, 
      type,
      sort: filter.sort,
      order: filter.order,
     }));

    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  };

  return getPage
}