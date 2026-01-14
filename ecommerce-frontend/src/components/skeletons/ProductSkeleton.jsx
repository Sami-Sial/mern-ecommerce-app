import React from "react";

const ProductSkeleton = ({ count = 8 }) => {
    const styles = {
        wrapper: {
            display: "flex",
            flexWrap: "wrap",
            gap: "1.2rem",
            justifyContent: "space-between",
            marginTop: "3rem",
        },

        card: {
            width: "23%",
            background: "#fff",
            borderRadius: "14px",
            padding: "10px",
            border: "1px solid rgba(0,0,0,0.08)",
            boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
            pointerEvents: "none",
        },

        img: {
            width: "100%",
            height: "180px",
            borderRadius: "10px",
            marginBottom: "14px",
            background:
                "linear-gradient(90deg, #e5e7eb 25%, #f3f4f6 37%, #e5e7eb 63%)",
            backgroundSize: "400% 100%",
            animation: "skeletonLoading 1.4s ease infinite",
        },

        title: {
            height: "16px",
            width: "90%",
            marginBottom: "10px",
            borderRadius: "6px",
            background:
                "linear-gradient(90deg, #e5e7eb 25%, #f3f4f6 37%, #e5e7eb 63%)",
            backgroundSize: "400% 100%",
            animation: "skeletonLoading 1.4s ease infinite",
        },

        meta: {
            height: "13px",
            width: "70%",
            marginBottom: "14px",
            borderRadius: "6px",
            background:
                "linear-gradient(90deg, #e5e7eb 25%, #f3f4f6 37%, #e5e7eb 63%)",
            backgroundSize: "400% 100%",
            animation: "skeletonLoading 1.4s ease infinite",
        },

        bottom: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
        },

        price: {
            height: "18px",
            width: "70px",
            borderRadius: "6px",
            background:
                "linear-gradient(90deg, #e5e7eb 25%, #f3f4f6 37%, #e5e7eb 63%)",
            backgroundSize: "400% 100%",
            animation: "skeletonLoading 1.4s ease infinite",
        },

        status: {
            height: "14px",
            width: "80px",
            borderRadius: "6px",
            background:
                "linear-gradient(90deg, #e5e7eb 25%, #f3f4f6 37%, #e5e7eb 63%)",
            backgroundSize: "400% 100%",
            animation: "skeletonLoading 1.4s ease infinite",
        },
    };

    return (
        <>
            {/* Animation Keyframes */}
            <style>
                {`
          @keyframes skeletonLoading {
            0% { background-position: 100% 0; }
            100% { background-position: -100% 0; }
          }

          @media (max-width: 1170px) {
            .skeleton-card { width: 30% !important; }
          }

          @media (max-width: 1000px) {
            .skeleton-card { width: 48% !important; }
          }

          @media (max-width: 700px) {
            .skeleton-card { width: 80% !important; margin: auto; }
          }

          @media (max-width: 520px) {
            .skeleton-card { width: 90% !important; }
          }

          @media (max-width: 430px) {
            .skeleton-card { width: 95% !important; }
          }
        `}
            </style>

            <div style={styles.wrapper}>
                {[...Array(count)].map((_, index) => (
                    <div
                        key={index}
                        style={styles.card}
                        className="skeleton-card"
                    >
                        <div style={styles.img}></div>
                        <div style={styles.title}></div>
                        <div style={styles.meta}></div>

                        <div style={styles.bottom}>
                            <div style={styles.price}></div>
                            <div style={styles.status}></div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default ProductSkeleton;
