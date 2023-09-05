export interface IFilterState {
  sort: string,
  order: string,
  searchQuery: string,
  type: string,
  activeTypeFilter: string,
  isSortPopupIsVisible: boolean
}
export type sortOptionsType = {
  value: {sort: string, order: string},
  title: string,
  icon: JSX.Element
}