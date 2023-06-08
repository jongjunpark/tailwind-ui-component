import type { ChangeEvent, MouseEvent } from 'react';

interface SwitchProps {
  checked?: boolean;
  disabled?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onClick?: (e: MouseEvent<HTMLInputElement>) => void;
}

const Switch = ({
  checked,
  disabled,
  onChange,
  onClick,
}: SwitchProps) => {
  return (
    <div className='h-20'>
      <label className='switch'>
        <input
          type='checkbox'
          checked={checked}
          disabled={disabled}
          onChange={onChange}
          onClick={onClick}
        />
        <div />
      </label>
    </div>
  );
};

export default Switch;