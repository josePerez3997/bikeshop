export interface ResponseBase {
    success: boolean;
    message?: string;
}

export interface PaginatedResponse<T> extends ResponseBase {
    data: T[];
    total: number;
    page: number;
    pageSize: number;
}

export interface ErrorResponse {
    status: number;
    message: string;
    details?: any;
}

export interface ButtonProps {
    children: React.ReactNode;
    type?: 'button' | 'submit' | 'reset';
    variant?: 'primary' | 'secondary' | 'outline';
    size?: 'sm' | 'md' | 'lg';
    fullWidth?: boolean;
    disabled?: boolean;
    onClick?: (e: React.MouseEvent) => void;
    className?: string;
}

export interface InputProps {
    type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'search';
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    label?: string;
    name?: string;
    id?: string;
    error?: string;
    required?: boolean;
    disabled?: boolean;
    maxLength?: number;
    autoComplete?: string;
    className?: string;
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
    onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

export interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
    size?: 'sm' | 'md' | 'lg';
}

export interface LoadingProps {
    className?: string;
}