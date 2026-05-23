import React from "react";
import style from "./Card.module.css";

interface CardProps {
    header?: React.ReactNode;
    children: React.ReactNode;
    footer?: React.ReactNode;
    expandedContent?: React.ReactNode;
    expandable?: boolean;
    defaultExpanded?: boolean;
    clickable?: boolean;
    onClick?: () => void;
}

export function Card({header, children, footer, expandedContent, expandable = false, defaultExpanded = false, clickable = false, onClick}: CardProps) {
    const [isExpanded, setIsExpanded] = React.useState(defaultExpanded);

    const handleToggleExpand = () => {
        if (expandable) {
            setIsExpanded(prev => !prev);
        }
    };

    const handleClick = () => {
        if (clickable && onClick) {
            onClick();
        }
    };

    return (
        <div
            className={style.card}
            onClick={clickable ? handleClick : undefined}
        >
            {header && (
                <div className={style.header}>
                    {header}
                </div>
            )}

            <div className={style.body}>
                {children}

                {expandable && (
                    <button
                        className={style.expandButton}
                        onClick={handleToggleExpand}
                        type="button"
                    >
                        {isExpanded ? "Leer menos" : "Leer más"}
                    </button>
                )}

                {isExpanded && expandedContent && (
                    <div className={style.expandedContent}>
                        {expandedContent}
                    </div>
                )}
            </div>

            {footer && (
                <div className={style.footer}>
                    {footer}
                </div>
            )}
        </div>
    );
}