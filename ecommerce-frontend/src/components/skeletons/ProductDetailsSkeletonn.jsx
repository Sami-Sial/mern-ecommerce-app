import React from "react";

/* ===== Inline Skeleton Styles ===== */
const shimmer = {
  animation: "shimmer 1.6s infinite linear",
  background: "linear-gradient(90deg, #e0e0e0 25%, #f5f5f5 37%, #e0e0e0 63%)",
  backgroundSize: "400% 100%",
};

const box = (w, h, radius = 8) => ({
  width: w,
  height: h,
  borderRadius: radius,
  marginBottom: "12px",
  ...shimmer,
});

const ProductDetailsSkeleton = () => {
  return (
    <div style={styles.wrapper}>
      {/* Left Image Skeleton */}
      <div style={styles.left}>
        <div style={box("100%", "420px", 12)} />
      </div>

      {/* Right Content Skeleton */}
      <div style={styles.right}>
        <div style={box("80%", "32px")} />
        <div style={box("60%", "18px")} />
        <div style={box("40%", "18px")} />

        <div style={{ margin: "16px 0" }}>
          <div style={box("30%", "26px")} />
        </div>

        <div style={box("50%", "18px")} />

        {/* Description lines */}
        <div style={{ marginTop: "14px" }}>
          <div style={box("100%", "14px")} />
          <div style={box("95%", "14px")} />
          <div style={box("85%", "14px")} />
        </div>

        {/* Quantity + Button */}
        <div style={styles.cartSection}>
          <div style={box("140px", "46px", 10)} />
          <div style={box("220px", "52px", 10)} />
        </div>
      </div>

      {/* Keyframes */}
      <style>
        {`
          @keyframes shimmer {
            0% { background-position: -400px 0; }
            100% { background-position: 400px 0; }
          }
        `}
      </style>
    </div>
  );
};

/* ===== Layout Styles ===== */
const styles = {
  wrapper: {
    display: "flex",
    gap: "2.5rem",
    padding: "2.5rem 5%",
    maxWidth: "1400px",
    margin: "0 auto",
    flexWrap: "wrap",
  },
  left: {
    flex: "1 1 400px",
    maxWidth: "45%",
    minWidth: "320px",
  },
  right: {
    flex: "1 1 450px",
    minWidth: "320px",
  },
  cartSection: {
    display: "flex",
    gap: "1.3rem",
    marginTop: "2rem",
    flexWrap: "wrap",
    alignItems: "center",
  },
};

export default ProductDetailsSkeleton;
