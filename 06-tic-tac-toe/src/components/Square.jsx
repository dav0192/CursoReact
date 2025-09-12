export const Square = ({ children, isSelected, updateBoard, index }) => {
    const className = `Square ${isSelected ? 'is-selected' : ''}`;

    const handleClick = () => {
        updateBoard(index);
    }

    return (
        <div onClick={handleClick} className={className}>
            {children}
        </div>
    );
}