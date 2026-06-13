import "../styles/components/LoadingSpinner.css"

interface LoadingSpinnerProps {
  logo: string;
  size?: number;
}

export function LoadingSpinner({ logo, size }: LoadingSpinnerProps) {
  return (
    <div
      className="loading-spinner"
      style={{
        width: `${size}px`,
        height: `${size}px`,
      }}
    >
      <div className="spinner-ring"></div>

      <div className="logo-container">
        <img src={logo} alt="Logo Liberty Finance" className="spinner-logo" />
      </div>
    </div>
  );
}
