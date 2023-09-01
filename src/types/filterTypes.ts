export interface IFilterState {
  sort: string,
  searchQuery: string,
  type: string,
  activeTypeFilter: string,
  isSortPopupIsVisible: boolean
}
export type sortOptionsType = {
  value: string,
  title: string,
  icon: JSX.Element
}