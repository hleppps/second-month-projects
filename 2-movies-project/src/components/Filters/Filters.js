import React, { useCallback, useMemo } from "react";
import styles from "./Filters.module.scss";
import Genres from "./Genres";
import Pagination from "./Pagination";
import ReleaseYear from "./ReleaseYear";
import ResetFilters from "./ResetFilters";
import SortBy from "./SortBy";
import * as CONSTANTS from "../../utils/constants";

const Filters = React.memo(
  ({ totalPages, defaultFiltersState, setFilters, filters, ...props }) => {
    // Functions to modify app.js filters state

    const setPage = useCallback(
      (changeType, prevPage) => {
        let newPage;
        if (changeType === CONSTANTS.PAGINATION_INCREASE) {
          newPage = prevPage === totalPages ? totalPages : ++prevPage;
        }

        if (changeType === CONSTANTS.PAGINATION_DECREASE) {
          newPage = prevPage === 1 ? 1 : --prevPage;
        }

        return { page: newPage };
      },
      [totalPages]
    );

    const setYear = useCallback((year) => {
      return { year, page: 1 };
    }, []);

    const setSorting = useCallback((sorting) => {
      return { sorting, page: 1 };
    }, []);

    const setGenres = useCallback((genres) => {
      return { genres, page: 1 };
    }, []);

    const resetFilters = useCallback(() => {
      return defaultFiltersState;
    }, [defaultFiltersState]);

    // Selecting the desired function

    const setFunctions = useMemo(() => {
      return {
        PAGE: setPage,
        YEAR: setYear,
        SORT: setSorting,
        GENRES: setGenres,
        RESET: resetFilters,
      };
    }, [resetFilters, setGenres, setSorting, setYear, setPage]);

    const setFiltersHandler = useCallback(
      (filterType, ...args) => {
        const propertiesToFilter = setFunctions[filterType](...args);

        setFilters((prevState) => {
          return { ...prevState, ...propertiesToFilter };
        });
      },
      [setFilters, setFunctions]
    );

    // Filter handlers with preset types

    const setGenresFilterHandler = useCallback(
      (selectedGenres) => {
        setFiltersHandler("GENRES", selectedGenres);
      },
      [setFiltersHandler]
    );

    const setSortingFilterHandler = (sortingValue) => {
      setFiltersHandler("SORT", sortingValue);
    };

    const setYearFilterHandler = (releaseYear) => {
      setFiltersHandler("YEAR", releaseYear);
    };

    const setPageFilterHandler = (changeType, curPage) => {
      setFiltersHandler("PAGE", changeType, curPage);
    };

    const resetFiltersHandler = () => {
      setFiltersHandler("RESET");
    };

    return (
      <div data-testid="filters" className={styles.filters}>
        <h2>Filters:</h2>

        <>
          <ResetFilters resetFilters={resetFiltersHandler} />
          <SortBy
            setSortingFilter={setSortingFilterHandler}
            filteredSorting={filters.sorting}
          />
          <ReleaseYear
            setYearFilter={setYearFilterHandler}
            filteredYear={filters.year}
          />
          <Genres
            allGenresList={props.allGenresList.genres}
            selectedGenresList={filters.genres}
            setGenresFilter={setGenresFilterHandler}
          />
          <Pagination
            totalPages={totalPages}
            setPageFilter={setPageFilterHandler}
            filteredPage={filters.page}
          />
        </>
      </div>
    );
  }
);

export default Filters;
