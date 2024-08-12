const TaskIcon = ({ color = "#3B8AFF", marginLeft = 0, marginRight = 0 }) => (
    <svg
        width={23}
        height={25}
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ marginLeft, marginRight }}
    >
        <path d="M9.16667 5H17.5" stroke={color} strokeLinecap="round" />
        <path d="M9.16667 10H17.5" stroke={color} strokeLinecap="round" />
        <path d="M9.16667 15H17.5" stroke={color} strokeLinecap="round" />
        <path
            d="M2.5 6.16088C2.5 6.16088 3.33333 6.70405 3.75 7.50016C3.75 7.50016 5 4.37516 6.66667 3.3335"
            stroke={color}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M2.5 15.3274C2.5 15.3274 3.33333 15.8706 3.75 16.6667C3.75 16.6667 5 13.5417 6.66667 12.5"
            stroke={color}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

export default TaskIcon;
