import React from "react";

const TableSkeleton = ({ rows = 5 }) => {
    const styles = {
        tableContainer: {
            width: "95%",
            margin: "2rem auto",
            overflowX: "auto",
            border: "solid",
            borderColor: "#e0e0e0",
        },
        table: {
            width: "100%",
            borderCollapse: "collapse",
        },
        th: {
            padding: "12px",
            textAlign: "left",
        },
        td: {
            padding: "12px",
        },
        skeleton: {
            backgroundColor: "#e0e0e0",
            borderRadius: "4px",
            display: "inline-block",
            animation: "pulse 1.5s infinite ease-in-out",
        },
        skeletonText: {
            width: "80%",
            height: "16px",
            margin: "4px 0",
        },
        skeletonStatus: {
            width: "60px",
            height: "20px",
            borderRadius: "12px",
        },
        skeletonAction: {
            width: "80px",
            height: "24px",
            borderRadius: "6px",
        },
        // Keyframes cannot be inline, so we will inject into document
    };

    // Inject keyframes for pulse animation
    React.useEffect(() => {
        const styleSheet = document.styleSheets[0];
        const keyframes = `
      @keyframes pulse {
        0% { opacity: 1; }
        50% { opacity: 0.4; }
        100% { opacity: 1; }
      }
    `;
        styleSheet.insertRule(keyframes, styleSheet.cssRules.length);
    }, []);

    return (
        <div style={styles.tableContainer}>
            <table style={styles.table}>
                <thead>
                    <tr>
                        <th style={styles.th}></th>
                        <th style={styles.th}></th>
                        <th style={styles.th}></th>
                        <th style={styles.th}></th>
                        <th style={styles.th}></th>
                    </tr>
                </thead>
                <tbody>
                    {Array.from({ length: rows }).map((_, idx) => (
                        <tr key={idx}>
                            <td style={styles.td}>
                                <div style={{ ...styles.skeleton, ...styles.skeletonText }} />
                            </td>
                            <td style={styles.td}>
                                <div style={{ ...styles.skeleton, ...styles.skeletonText }} />
                            </td>
                            <td style={styles.td}>
                                <div style={{ ...styles.skeleton, ...styles.skeletonStatus }} />
                            </td>
                            <td style={styles.td}>
                                <div style={{ ...styles.skeleton, ...styles.skeletonText }} />
                            </td>
                            <td style={styles.td}>
                                <div style={{ ...styles.skeleton, ...styles.skeletonAction }} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TableSkeleton;
