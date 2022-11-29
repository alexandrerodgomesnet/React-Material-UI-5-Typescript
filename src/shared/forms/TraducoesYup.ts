import { setLocale } from 'yup';

setLocale({
    mixed:{
        default: 'Campo não é válido',
        required: 'O campo é obrigatório'
    },
    string:{
        email: () => 'O campo precisa conter um email válido',
        max: ({max}) => `O campo deve ter no máximo ${max} caracteres`,
        min: ({min}) => `O campo deve ter pelo menos ${min} caracteres`,
        length: ({length}) => `O campo deve ter exatamente ${length} caracteres`,
    },
    date:{
        max: ({max}) => `A data deve ser menor que ${max}`,
        min: ({min}) => `A data deve ser maior que ${min}`
    },
    number:{
        integer: () => 'O campo precisa de um valor inteiro',
        negative: () => 'O campo precisa de um valor negativo',
        positive: () => 'O campo precisa de um valor positivo',
        moreThan: ({more}) => `O campo precisa de um valor maior que ${more}`,
        lessThan: ({less}) => `O campo precisa de um valor menor que ${less}`,
        max: ({max}) => `O campo deve ter um valor com mais de ${max} caracteres`,
        min: ({min}) => `O campo deve ter um valor com menos de ${min} caracteres`,
    },
    boolean:{},
    object:{},
    array:{}
});