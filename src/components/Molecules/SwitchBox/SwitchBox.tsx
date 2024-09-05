import { Dispatch, SetStateAction } from 'react';
import style from './SwitchBox.module.scss';
import Switch from '@/components/Atom/Switch/Switch';

interface SwitchBoxProps {
  label: string;
  value: boolean;
  setValue: Dispatch<SetStateAction<boolean>>;
}

const SwitchBox = ({ label, value, setValue }: SwitchBoxProps) => {
  return (
    <div className={style.switchBox}>
      <label className={style.label}>{label}</label>
      <Switch active={value} setActive={setValue} />
    </div>
  );
};

export default SwitchBox;
