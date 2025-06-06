import React, { useState } from 'react';

const styles = {
  bgShapes: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    zIndex: 0,
  },
  shape: {
    position: 'absolute',
    background: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '50%',
    animation: 'float 20s infinite linear',
  },
  container: {
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(20px)',
    borderRadius: '24px',
    padding: '3rem 2.5rem',
    width: '100%',
    maxWidth: 420,
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    position: 'relative',
    zIndex: 1,
    animation: 'slideUp 0.8s ease-out',
  },
  logoH1: {
    fontSize: '2rem',
    fontWeight: 700,
    background: 'linear-gradient(135deg, #667eea, #764ba2)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    marginBottom: '0.5rem',
    textAlign: 'center',
  },
  logoP: {
    color: '#64748b',
    fontSize: '0.95rem',
    textAlign: 'center',
    marginBottom: '2rem',
  },
  formGroup: { marginBottom: '1.5rem', position: 'relative' },
  label: {
    display: 'block',
    marginBottom: '0.5rem',
    color: '#374151',
    fontWeight: 500,
    fontSize: '0.9rem',
  },
  input: {
    width: '100%',
    padding: '1rem 1.25rem',
    border: '2px solid #e5e7eb',
    borderRadius: '12px',
    fontSize: '1rem',
    transition: 'all 0.3s ease',
    background: '#fafafa',
  },
  passwordToggle: {
    position: 'absolute',
    right: '1rem',
    top: '2.4rem',
    cursor: 'pointer',
    color: '#6b7280',
    transition: 'color 0.3s ease',
  },
  registerBtn: {
    width: '100%',
    padding: '1rem',
    background: 'linear-gradient(135deg, #667eea, #764ba2)',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    fontSize: '1rem',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    position: 'relative',
    overflow: 'hidden',
  },
  loginLink: {
    textAlign: 'center',
    color: '#6b7280',
    fontSize: '0.9rem',
  },
  loginAnchor: {
    color: '#667eea',
    textDecoration: 'none',
    fontWeight: 600,
    cursor: 'pointer',
  },
};

const shapePositions = [
  { width: 80, height: 80, top: '20%', left: '10%', animationDelay: '0s' },
  { width: 120, height: 120, top: '60%', left: '80%', animationDelay: '-5s' },
  { width: 60, height: 60, top: '80%', left: '20%', animationDelay: '-10s' },
  { width: 100, height: 100, top: '10%', left: '70%', animationDelay: '-15s' },
];

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Floating shapes parallax effect
  React.useEffect(() => {
    const handleMouseMove = (e) => {
      const shapes = document.querySelectorAll('.shape');
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      shapes.forEach((shape, i) => {
        const speed = (i + 1) * 0.5;
        const xPos = x * speed * 10 - 5;
        const yPos = y * speed * 10 - 5;
        shape.style.transform = `translate(${xPos}px, ${yPos}px)`;
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const togglePassword = () => setShowPass((prev) => !prev);
  const toggleConfirmPassword = () => setShowConfirmPass((prev) => !prev);

  const showAlert = (msg) => alert(msg);

  const handleChange = (e) => {
    setFormData((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { name, email, password, confirmPassword } = formData;

    if (!name || !email || !password || !confirmPassword) {
      showAlert('Please fill in all fields');
      return;
    }
    if (password !== confirmPassword) {
      showAlert('Passwords do not match');
      return;
    }

    setIsLoading(true);
    // TODO: Replace with actual API call for registration
    setTimeout(() => {
      alert(`Welcome, ${name}! Registration successful.`);
      setIsLoading(false);
      setFormData({ name: '', email: '', password: '', confirmPassword: '' });
    }, 2000);
  };

  return (
    <>
      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
            opacity: 0.7;
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
            opacity: 0.3;
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .shape {
          animation: float 20s infinite linear;
        }

        .register-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(102, 126, 234, 0.3);
        }

        .register-btn:active {
          transform: translateY(0);
        }

        .register-btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          transition: left 0.5s;
        }

        .register-btn:hover::before {
          left: 100%;
        }

        .password-toggle:hover {
          color: #667eea;
        }
      `}</style>

      <div style={styles.bgShapes}>
        {shapePositions.map((pos, i) => (
          <div
            key={i}
            className="shape"
            style={{
              ...styles.shape,
              width: pos.width,
              height: pos.height,
              top: pos.top,
              left: pos.left,
              animationDelay: pos.animationDelay,
            }}
          />
        ))}
      </div>

      <div style={styles.container}>
        <div className="logo">
          <h1 style={styles.logoH1}>Create Account</h1>
          <p style={styles.logoP}>Sign up to get started</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={styles.formGroup}>
            <label htmlFor="name" style={styles.label}>Full Name</label>
            <input
              style={styles.input}
              type="text"
              id="name"
              name="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
              required
              autoComplete="name"
            />
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="email" style={styles.label}>Email Address</label>
            <input
              style={styles.input}
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
              autoComplete="email"
            />
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="password" style={styles.label}>Password</label>
            <input
              style={styles.input}
              type={showPass ? 'text' : 'password'}
              id="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
              autoComplete="new-password"
            />
            <span
              style={styles.passwordToggle}
              onClick={togglePassword}
              role="button"
              aria-label="Toggle password visibility"
              tabIndex={0}
              onKeyPress={(e) => {
                if (e.key === 'Enter' || e.key === ' ') togglePassword();
              }}
            >
              {showPass ? '🙈' : '👁️'}
            </span>
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="confirmPassword" style={styles.label}>Confirm Password</label>
            <input
              style={styles.input}
              type={showConfirmPass ? 'text' : 'password'}
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              autoComplete="new-password"
            />
            <span
              style={styles.passwordToggle}
              onClick={toggleConfirmPassword}
              role="button"
              aria-label="Toggle confirm password visibility"
              tabIndex={0}
              onKeyPress={(e) => {
                if (e.key === 'Enter' || e.key === ' ') toggleConfirmPassword();
              }}
            >
              {showConfirmPass ? '🙈' : '👁️'}
            </span>
          </div>

          <button
            type="submit"
            className="register-btn"
            style={styles.registerBtn}
            disabled={isLoading}
          >
            {isLoading ? 'Registering...' : 'Register'}
          </button>
        </form>

        <p style={styles.loginLink}>
          Already have an account?{' '}
          <a
            href="#!"
            onClick={(e) => {
              e.preventDefault();
              alert('Navigate to login page.');
            }}
            style={styles.loginAnchor}
          >
            Sign in
          </a>
        </p>
      </div>
    </>
  );
};

export default Register;
