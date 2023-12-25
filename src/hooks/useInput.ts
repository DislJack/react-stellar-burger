import {useState, useRef} from 'react';
import { TEvent } from '../utils/prop-types';

function useInput(inputValue: string) {
  const [value, setValue] = useState({
    name: inputValue,
    boolean: false
  });
  const valueRef = useRef<HTMLInputElement | any>(null);
  const onChange = (e: TEvent) => {
    setValue({
      ...value,
      name: e.target.value
    });
  }
  const onIconClick = () => {
    setValue({
      ...value,
      boolean: !value.boolean
    });
    setTimeout(() => valueRef.current.focus(), 0);
  }
  return {value, valueRef, onChange, onIconClick, setValue}
}

export {useInput}