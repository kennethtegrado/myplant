import { useEffect } from 'react';

type VoidFunction = () => void;

const UseMountEffect = async (fn: VoidFunction) => {
    return useEffect(fn, []);
};

export default UseMountEffect;
