import React from "react";

interface QuoteIconProps extends React.SVGProps<SVGSVGElement> {
    className?: string;
    color?: string;
}

export default function QuoteIcon({
    className,
    color = "#AEAEAE",
    ...props
}: QuoteIconProps) {
    return (
        <svg
            className={className}
            viewBox="0 0 32 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <polygon points="4.5,0 13.5,0 10.5,22 0,22" fill={color} />
            <polygon points="22.5,0 31.5,0 28.5,22 18,22" fill={color} />
        </svg>
    );
}
