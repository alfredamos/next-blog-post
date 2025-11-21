"use client"

import React, { ReactNode} from "react";

type Prop = {
    isOpen: boolean,
    onClose: () => void,
    children: ReactNode,
}

export default function  Modal({ isOpen, onClose, children }: Prop) {
    if (!isOpen) return null; // If not open, render nothing

    // Optional: close modal when clicking the backdrop
    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div className="modal-backdrop text-black" onClick={(e) => handleBackdropClick(e)}>
            <section className="modal-main">
                {children}
            </section>
        </div>
    );
}