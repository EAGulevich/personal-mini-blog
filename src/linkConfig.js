import Home from "home/public/img/home.svg";
import Create from "home/public/img/create.svg";
import Settings from "home/public/img/settings.svg";

const LINKS = [
  { name: "Главная", to: "/", image: Home },
  { name: "Создать пост", to: "/edit", image: Create },
  { name: "Настройки", to: "/settings", image: Settings }
];

export default LINKS;
