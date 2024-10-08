import Button from "@/components/Atom/Button/Button";
import style from "./Header.module.scss";

interface HeaderProps {
  title: string;
}

const Header = (props: HeaderProps) => {
  const { title } = props;

  return (
    <div className={style.main}>
      <h1>{title}</h1>
      <Button label="Login" />
    </div>
  );
};

export default Header;