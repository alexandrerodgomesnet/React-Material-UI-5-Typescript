import { Autocomplete, CircularProgress, TextField } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { useDebounce } from '../../../shared/hooks';
import { CidadeService } from '../../../shared/services/api/cidade/CidadeService';
import { useField } from '@unform/core';

type TAutoCompleteOption ={
    id: number;
    label: string;
}

interface AutoCompleteCidadeProps {
    isExternalLoading?: boolean;
}
export const AutoCompleteCidade: React.FC<AutoCompleteCidadeProps> = ({isExternalLoading = false}) => {
    const { fieldName, registerField, defaultValue, error, clearError } = useField('cidadeId');
    const [options, setOptions] = useState<TAutoCompleteOption[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [busca, setBusca] = useState('');
    const [selectedId, setSelectedId] = useState<number | undefined>(defaultValue);
    const { debounce } = useDebounce();

    useEffect(() => {
        registerField({
            name: fieldName,
            getValue: () => selectedId,
            setValue: (_, value) => setSelectedId(value)
        });
    }, [registerField, fieldName, selectedId]);

    useEffect(() => {
        setIsLoading(true);

        debounce(() =>{
            CidadeService
                .Listar(1, busca)
                .then((result) => {

                    setIsLoading(false);
                    if(result instanceof Error)
                        alert(result.message);
                    else{
                        setOptions(result.data.map(dado => ({ id: dado.id, label: dado.descricao })));
                    }
                });
        });
    }, [busca]);

    const autoCompleteSelectedOptions = useMemo(() => {
        if(!selectedId) return null;

        const selectedOption = options.find(option => option.id === selectedId);

        if(!selectedOption) return null;

        return selectedOption;
    }, [selectedId, options]);

    return (
        <Autocomplete
            openText='Abrir'
            closeText='Fechar'
            noOptionsText='Sem opções'
            loadingText='Carregando...'
            disablePortal
            value={autoCompleteSelectedOptions}
            loading={isLoading}
            disabled={isExternalLoading}
            popupIcon={ (isExternalLoading || isLoading) ? <CircularProgress size={28} /> : undefined }
            onInputChange={ (_, value) => setBusca(value) }
            onChange={(_, value) => { setSelectedId(value?.id); setBusca(''); clearError(); }}
            options={options}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label='Cidade'
                    error={!!error}
                    helperText={error}
                />
            )}
        />
    );
};