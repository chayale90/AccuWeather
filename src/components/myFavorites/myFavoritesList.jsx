// import React from 'react'
import { useMemo } from "react";
import { useSelector } from "react-redux";
import FavoriteItem from "./FavoriteItem";
import { theme } from '@/services/theme'

const MyFavoritesList = () => {
  const { arrFavorites } = useSelector((myStore) => myStore.featuresSlice);

  //darkMode
  const { darkMode } = useSelector(myStore => myStore.featuresSlice);
  const modeBackground = useMemo(() => {
    if (darkMode)
      return theme.palette.darkMode.main
    return theme.palette.success.main
  }, [darkMode]);

  return (

    <div className="container rounded" style={{ backgroundColor: modeBackground, minHeight: "400px" }}>
      <div className="row g-4 justify-content-center mt-5 ">
        {arrFavorites.map((item, i) => {
          return (
            <FavoriteItem
              key={item.id}
              index={i}
              item={item}
            />
          );
        })}
        {arrFavorites.length < 1 &&
          <h5 className="text-center p-4">You don't have favorites items yet</h5>
        }

      </div>

    </div>
  )
}

export default MyFavoritesList