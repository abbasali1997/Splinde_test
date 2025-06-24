
type ButtonProps = {
    type: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark' | 'link';
    text?: string;
    onClick?: () => void;
};

const Button = ({ type, text = 'Button', onClick = () => {
    console.log('button clicked');
}}: ButtonProps) => {
    return (
        <button
            type="button"
            className={`btn btn-${type}`}
            onClick={onClick}
        >
            {text}
        </button>
    );
}

export default Button