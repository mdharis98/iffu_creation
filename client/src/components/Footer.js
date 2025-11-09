import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-6">
          <div className="text-center md:text-left md:pl-6">
            <p className="text-sm text-gray-300">
              © 2025 QuickMart – All Rights Reserved.
            </p>
            <p className="mt-1 text-sm italic text-white"> --by Haris</p>
          </div>

          <div className="flex items-center justify-center gap-5">
            {/* Facebook */}
            <a
              href="#"
              aria-label="Facebook"
              className="text-gray-300 hover:text-accent transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path d="M22.676 0H1.324C.593 0 0 .593 0 1.324v21.352C0 23.407.593 24 1.324 24h11.495v-9.294H9.691V11.06h3.128V8.414c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.796.715-1.796 1.764v2.313h3.59l-.467 3.646h-3.123V24h6.127C23.407 24 24 23.407 24 22.676V1.324C24 .593 23.407 0 22.676 0z" />
              </svg>
            </a>

            {/* Instagram */}
            <a
              href="https://www.instagram.com/iffu_creation?igsh=MXJxeTlxaWU2Zm1xdA=="
              aria-label="Instagram"
              className="text-gray-300 hover:text-accent transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.35 3.608 1.325.975.975 1.263 2.242 1.325 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.35 2.633-1.325 3.608-.975.975-2.242 1.263-3.608 1.325-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.35-3.608-1.325-.975-.975-1.263-2.242-1.325-3.608C2.175 15.584 2.163 15.204 2.163 12s.012-3.584.07-4.85c.062-1.366.35-2.633 1.325-3.608C4.533 1.567 5.8 1.279 7.166 1.217 8.432 1.159 8.812 1.147 12 1.147m0-1.147C8.741 0 8.332.013 7.052.072 5.773.131 4.57.428 3.533 1.465 2.496 2.502 2.199 3.705 2.14 4.984 2.081 6.264 2.068 6.673 2.068 12s.013 5.736.072 7.016c.059 1.279.356 2.482 1.393 3.519 1.037 1.037 2.24 1.334 3.519 1.393C8.332 23.987 8.741 24 12 24s3.668-.013 4.948-.072c1.279-.059 2.482-.356 3.519-1.393 1.037-1.037 1.334-2.24 1.393-3.519.059-1.28.072-1.689.072-7.016s-.013-5.736-.072-7.016c-.059-1.279-.356-2.482-1.393-3.519C19.43.428 18.227.131 16.948.072 15.668.013 15.259 0 12 0z" />
                <path d="M12 5.838A6.162 6.162 0 1 0 18.162 12 6.169 6.169 0 0 0 12 5.838zm0 10.186A4.024 4.024 0 1 1 16.024 12 4.03 4.03 0 0 1 12 16.024z" />
                <circle cx="18.406" cy="5.594" r="1.44" />
              </svg>
            </a>


            <a
              href="https://youtube.com/@iffu_creation28?si=TjadBYnFCL2pu9uh"
              aria-label="YouTube"
              className="text-gray-300 hover:text-red-600 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path d="M23.498 6.186a2.974 2.974 0 0 0-2.096-2.106C19.505 3.5 12 3.5 12 3.5s-7.505 0-9.402.58A2.974 2.974 0 0 0 .502 6.186 31.457 31.457 0 0 0 0 12a31.457 31.457 0 0 0 .502 5.814 2.974 2.974 0 0 0 2.096 2.106C4.495 20.5 12 20.5 12 20.5s7.505 0 9.402-.58a2.974 2.974 0 0 0 2.096-2.106A31.457 31.457 0 0 0 24 12a31.457 31.457 0 0 0-.502-5.814zM9.75 15.02V8.98l6.545 3.02L9.75 15.02z" />
              </svg>
            </a>

          </div>

          <div className="w-full md:w-auto flex justify-center md:justify-end md:pr-6">
            <Link
              to="/admin/login"
              className="text-sm font-medium text-error underline underline-offset-4 hover:text-errorHover focus:outline-none transition-colors"
            >
              Admin Login
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;


