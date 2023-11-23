import {useState, useRef} from 'react';

function useInput(inputValue) {
  const [value, setValue] = useState({
    name: inputValue,
    boolean: false
  });
  const valueRef = useRef(null);
  const onChange = (e) => {
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