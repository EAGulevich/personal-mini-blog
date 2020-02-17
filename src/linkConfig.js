import Home from "home/public/img/home.svg";
import Create from "home/public/img/create.svg";
import Settings from "home/public/img/settings.svg";
import Chart from "home/public/img/chart.svg";

const LINKS = [
  { name: "Главная", to: "/", image: Home },
  { name: "Создать пост", to: "/edit", image: Create },
  { name: "Настройки", to: "/settings", image: Settings },
  { name: "Статистика", to: "/stats", image: Chart }
];

export default LINKS;
