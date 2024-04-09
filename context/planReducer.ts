import { Action, Books, State } from "@/types/types";

const Reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_BOOKS':
      return { ...state, books: action.payload, filteredBooks: null };
    case 'FILTER_BOOKS':
      const filtered = state.books?.filter(book =>
        book.title.toLowerCase().includes(action.payload.toLowerCase())
      );
      const obj = { ...state, filteredBooks: filtered }
      return obj;
    case 'CLEAR_FILTER':
      const object = { ...state, filteredBooks: null };
      return object;

    case 'ADD_ELEMENT':
      const element = action.payload;
      element.status = "PLAN";
      const addedValue = { ...state, books: [...state.books || [], element] };
      return addedValue

    case 'REMOVE_ELEMENT':
      return { ...state, books: state.books.filter(e => e._id !== action.payload) };

    case 'SORT_ELEMENTS':
      return {
        ...state, books: state.books?.sort((a, b) => {
          if (a.title.toLowerCase() < b.title.toLowerCase()) {
            return action.payload === "asc" ? -1 : 1;
          }
          if (a.title.toLowerCase() > b.title.toLowerCase()) {
            return action.payload === "asc" ? 1 : -1;
          }
          return 0;
        })
      }

    default:
      return state;
  }
};

export default Reducer