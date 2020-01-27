import React, { useState } from "react";

import "./style.scss";
import CG from "home/utils/CG";
import Header from "home/components/Header";

/** Заглушка, если страница не найдена */

function NotFound(props) {
  const [isShowMenu, setIsShowMenu] = useState(false);

  return (
    <div className={CG("not-found", "", [isShowMenu ? "with-menu" : ""])}>
      <Header title={"Тупичок"} />
      <h1>404</h1>
      <h2>Вы все сломали...</h2>
      {!isShowMenu && (
        <button onClick={setIsShowMenu.bind(null, true)}>Показать меню</button>
      )}
      <img src="img/404.jpg" />
    </div>
  );
}

export default NotFound;
