import { useEffect, useState } from "react";

const Cursor = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [hovering, setHovering] = useState(false);

    useEffect(() => {
        const moveCursor = (e) => {
            setPosition({ x: e.clientX, y: e.clientY });
        };

        const handleHover = () => setHovering(true);
        const handleUnhover = () => setHovering(false);

        // Listen for mouse movements
        window.addEventListener("mousemove", moveCursor);

        // Optional: add hover effect for buttons & links
        document.querySelectorAll("a, button").forEach((el) => {
            el.addEventListener("mouseenter", handleHover);
            el.addEventListener("mouseleave", handleUnhover);
        });

        return () => {
            window.removeEventListener("mousemove", moveCursor);
            document.querySelectorAll("a, button").forEach((el) => {
                el.removeEventListener("mouseenter", handleHover);
                el.removeEventListener("mouseleave", handleUnhover);
            });
        };
    }, []);

    // Inline style object
    const cursorStyle = {
        position: "fixed",
        top: `${position.y}px`,
        left: `${position.x}px`,
        width: hovering ? "38px" : "22px",
        height: hovering ? "38px" : "22px",
        borderRadius: "50%",
        pointerEvents: "none",
        zIndex: 9999,
        background: "white",
        mixBlendMode: "difference",
        transform: "translate(-50%, -50%)",
        transition: "transform 0.08s ease-out, width 0.2s ease, height 0.2s ease",
    };

    return <div style={cursorStyle}></div>;
};

export default Cursor;
