import { useState } from 'react';

function useForm(initialValues) {
    const [inputs, setInputs] = useState(initialValues);
    const [file, setFile] = useState(null);

    const handleChange = (event) => {
        const { name, value, type, checked, files } = event.target;

        if (type === 'checkbox') {
            setInputs(prevInputs => {
                const currentValues = prevInputs[name] || [];
                if (checked) {
                    // Thêm giá trị vào mảng nếu checkbox được chọn
                    return { ...prevInputs, [name]: [...currentValues, value] };
                } else {
                    // Xóa giá trị khỏi mảng nếu checkbox không được chọn
                    return { ...prevInputs, [name]: currentValues.filter(v => v != value) };
                }
            });
        } else if (type === 'file') {
            setFile(files[0]);
            setInputs(prevInputs => {
                return { ...prevInputs, ['updateImage']: URL.createObjectURL(files[0]) };
            })
        } else {
            setInputs(values => ({ ...values, [name]: value }));
        }
    };

    return {
        inputs,
        file,
        handleChange,
        setInputs
    };
}

export default useForm;
