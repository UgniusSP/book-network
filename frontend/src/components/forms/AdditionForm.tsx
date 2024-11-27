import React from 'react';

type AdditionFormProps = {
    onSubmit: (e: React.FormEvent) => void;
    onChange: (field: string, value: string) => void;
    title: string;
    name: string;
    description: string;
    price: string;
}
