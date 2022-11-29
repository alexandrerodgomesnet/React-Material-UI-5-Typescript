import { useCallback, useRef } from 'react';
import { FormHandles } from '@unform/core';

export const useVForm = () => {
    const formRef = useRef<FormHandles>(null);
    const ehSalvarNovo = useRef(false);
    const ehSalvarFechar = useRef(false);

    const handleSalvar = useCallback(() => {
        ehSalvarFechar.current = false;
        ehSalvarNovo.current = false;
        formRef.current?.submitForm();
    }, []);

    const handleSalvarENovo = useCallback(() => {
        ehSalvarFechar.current = false;
        ehSalvarNovo.current = true;
        formRef.current?.submitForm();
    }, []);

    const handleSalvarEFechar = useCallback(() => {
        ehSalvarFechar.current = true;
        ehSalvarNovo.current = false;
        formRef.current?.submitForm();
    }, []);

    const handleEhSalvarENovo = useCallback(() => {
        return ehSalvarNovo.current;
    }, []);
    const handleEhSalvarEFechar = useCallback(() => {
        return ehSalvarFechar.current;
    }, []);

    return {
        formRef,
        salvar: handleSalvar,
        salvarNovo: handleSalvarENovo,
        salvarFechar: handleSalvarEFechar,
        ehSalvarNovo: handleEhSalvarENovo,
        ehSalvarFechar: handleEhSalvarEFechar,
    };
};