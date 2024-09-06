import { useContext } from 'react';
import { AppContext } from '../context/AppContext';

export const useAppState = () => {
  const { state, setState } = useContext(AppContext);

  const updateState = (key, value) => {
    setState((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  return { state, updateState };
};
