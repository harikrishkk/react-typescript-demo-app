import axios from 'axios';
import { ActionType } from '../action-types';
import { Dispatch } from 'redux';
import { Action } from '../actions';

export const searchRepos = (term: string) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.SEARCH_REPO
    })
    try {
      const { data } = await axios.get(`https://registry.npmjs.org/-/v1/search`, {
        params: {
          text: term
        }
      })

      const names = data.objects.map((result: any) => {
        return result.package.name
      })

      dispatch({
        type: ActionType.SEARCH_REPO_SUCCESS,
        payload: names
      })

    } catch (error) {
      if (error instanceof Error) {
        dispatch({
          type: ActionType.SEARCH_REPO_ERROR,
          payload: error.message
        })
      }
    }
  }
}