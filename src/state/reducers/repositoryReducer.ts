import { ActionType } from "../action-types";
import { Action } from "../actions";

interface RepositoryState {
  loading: boolean;
  error: string | null;
  data: string[]
}

const INIT_STATE = {
  loading: false,
  error: null,
  data: []
}

const reducer = (state: RepositoryState = INIT_STATE, action: Action): RepositoryState => {
  switch (action.type) {
    case ActionType.SEARCH_REPO:
      return {
        loading: true,
        error: null,
        data: []
      }
    case ActionType.SEARCH_REPO_SUCCESS:
      return {
        loading: false,
        error: null,
        data: action.payload
      }

    case ActionType.SEARCH_REPO_ERROR:
      return {
        loading: false,
        error: action.payload,
        data: []
      }
    default:
      return state;
  }
}

export default reducer;