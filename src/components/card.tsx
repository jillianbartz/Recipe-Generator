
import type { CardProps } from "./interfaces"

export function Card({className, children, style, ...props}: CardProps) {
    return (
        <div className={`rounded-lg border bg-card text-card-foreground shadow-sm ${className}`} style={style} {...props}>{children}</div>
    );
}
