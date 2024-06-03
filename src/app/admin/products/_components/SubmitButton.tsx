import { Button } from '@/components/ui/button';
import { useFormStatus } from 'react-dom';

const SubmitButton = () => {
    const { pending } = useFormStatus();

    return (
        <Button type='submit' disabled={pending}>
            {pending ? 'Saving...' : 'Save'}
        </Button>
    );
};

export default SubmitButton;
