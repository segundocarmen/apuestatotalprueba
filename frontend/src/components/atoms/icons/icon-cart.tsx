const IconCart = ({ className = '' }: { className?: string }) => (
    <svg
        className={className}
        viewBox='0 0 32 32'
        width={32}
        height={32}
        fill='transparent'
    >
        <g stroke='currentColor' strokeWidth={0.632} clipPath='url(#a)'>
            <path d='M7.447 24c1.046 0 1.894.895 1.894 2s-.848 2-1.894 2c-1.047 0-1.895-.895-1.895-2s.848-2 1.895-2ZM18.816 24c1.046 0 1.894.895 1.894 2s-.848 2-1.894 2c-1.047 0-1.895-.895-1.895-2s.848-2 1.895-2Z' />
            <path
                strokeLinecap='round'
                d='m.5 4 .33.122c1.644.61 2.466.916 2.936 1.642.47.726.47 1.691.47 3.62v3.63c0 3.921.08 5.216 1.175 6.434 1.094 1.218 2.856 1.218 6.379 1.218h1.342m5.356 0c1.972 0 2.958 0 3.654-.599.697-.6.896-1.619 1.294-3.657l.632-3.233c.438-2.319.657-3.478.097-4.248-.561-.77-2.477-.77-4.605-.77h-7.662m-7.661 0h2.579'
            />
        </g>
        <defs>
            <clipPath id='a'>
                <path fill='#fff' d='M.5 0h32v32H.5z' />
            </clipPath>
        </defs>
    </svg>
);

export default IconCart;