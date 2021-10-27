import { useCallback, useReducer } from "react";
import * as CONSTANTS from "../utils/constants";

const defaultMoviesState = {
  data: {
    results: [],
    total_pages: 0,
  },
  error: null,
  status: "pending",
};

const moviesReducer = (state, action) => {
  if (action.type === CONSTANTS.ACTION_SEND) {
    return {
      ...defaultMoviesState,
      data: { ...state.data },
    };
  }

  if (action.type === CONSTANTS.ACTION_SUCCESS) {
    return {
      data: { ...state.data, ...action.responseData },
      error: null,
      status: "completed",
    };
  }

  if (action.type === CONSTANTS.ACTION_ERROR) {
    return {
      ...defaultMoviesState,
      error: action.errorMessage,
      status: "completed",
    };
  }

  return state;
};

const useMovies = (requestFunction, filters) => {
  const [moviesState, dispatch] = useReducer(moviesReducer, defaultMoviesState);

  const { page, year, sorting, genres } = filters;

  const sendRequest = useCallback(
    async function () {
      dispatch({ type: CONSTANTS.ACTION_SEND });
      try {
        const responseData = await requestFunction(
          page,
          year,
          sorting,
          genres
        );
        dispatch({
          type: CONSTANTS.ACTION_SUCCESS,
          responseData: {
            results: responseData.results,
            total_pages: responseData.total_pages,
          },
        });
      } catch (error) {
        dispatch({
          type: CONSTANTS.ACTION_ERROR,
          errorMessage: error.message || "Something went wrong!",
        });
      }
    },
    [requestFunction, page, year, sorting, genres]
  );

  return {
    sendRequest,
    ...moviesState,
  };
};

export default useMovies;
