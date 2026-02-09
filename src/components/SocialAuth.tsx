import React from 'react';
import { Github } from 'lucide-react';

const GoogleIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill="#EA4335" d="M24 9.5c3.15 0 5.57 1.35 7 2.5l5.15-5.15C32.94 3.17 28.86 1.5 24 1.5 14.8 1.5 6.95 7.36 3.6 15.2l6.9 5.35C12.2 14.6 17.65 9.5 24 9.5z" />
    <path fill="#4285F4" d="M46.5 24c0-1.5-.14-2.9-.4-4.25H24v8.05h12.7c-.55 2.95-2.2 5.4-4.7 7.1l7.45 5.8C43.85 37.3 46.5 31.2 46.5 24z" />
    <path fill="#FBBC05" d="M10.5 28.5c-.5-1.45-.8-3-.8-4.5s.3-3.05.8-4.5L3.6 15.2C2.3 18.2 1.5 21.5 1.5 25s.8 6.8 2.1 9.8l6.9-6.3z" />
    <path fill="#34A853" d="M24 46.5c5.7 0 10.5-1.9 14.05-5.2l-7.45-5.8c-2 1.35-4.55 2.15-6.6 2.15-6.35 0-11.8-5.1-13.5-11.95l-6.9 5.35C6.95 40.65 14.8 46.5 24 46.5z" />
  </svg>
);

const FacebookIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M22 12.07C22 6.55 17.52 2 12 2S2 6.55 2 12.07c0 5 3.66 9.13 8.44 9.88v-7H8v-2.88h2.44V9.41c0-2.42 1.43-3.77 3.63-3.77 1.05 0 2.15.19 2.15.19v2.36h-1.21c-1.19 0-1.56.74-1.56 1.5v1.8h2.66L16.7 15.95h-2.25v7C18.34 21.2 22 17.06 22 12.07z" />
  </svg>
);

const TwitterIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M19.633 7.997c.013.18.013.362.013.542 0 5.523-4.206 11.89-11.89 11.89-2.36 0-4.552-.688-6.4-1.865.33.04.646.053.989.053 1.96 0 3.76-.667 5.188-1.796a4.193 4.193 0 0 1-3.91-2.902c.26.04.52.066.793.066.38 0 .76-.053 1.11-.146a4.185 4.185 0 0 1-3.357-4.106v-.053c.56.31 1.21.5 1.9.52a4.18 4.18 0 0 1-1.863-3.49c0-.793.21-1.53.58-2.164a11.875 11.875 0 0 0 8.622 4.37c-.066-.316-.1-.642-.1-.98a4.184 4.184 0 0 1 7.237-2.86 8.26 8.26 0 0 0 2.65-1.01 4.18 4.18 0 0 1-1.837 2.31 8.333 8.333 0 0 0 2.406-.63 8.937 8.937 0 0 1-2.093 2.162z" />
  </svg>
);

const InstagramIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M7.5 2A5.5 5.5 0 0 0 2 7.5v9A5.5 5.5 0 0 0 7.5 22h9a5.5 5.5 0 0 0 5.5-5.5v-9A5.5 5.5 0 0 0 16.5 2h-9zm0 2h9A3.5 3.5 0 0 1 20 7.5v9a3.5 3.5 0 0 1-3.5 3.5h-9A3.5 3.5 0 0 1 4 16.5v-9A3.5 3.5 0 0 1 7.5 4zm9 1.5a1 1 0 1 0 0 2 1 1 0 0 0 0-2zM12 7a5 5 0 1 0 .001 10.001A5 5 0 0 0 12 7zm0 2a3 3 0 1 1 0 6 3 3 0 0 1 0-6z" />
  </svg>
);

const SocialAuth = () => {
  const thirdPartyAuth = [
    {
      icon: <GoogleIcon />,
      action: () => {
        window.location.href = `${import.meta.env.VITE_BASE_URL}/auth/google`;
      },
      name: 'Google',
      bgColor: 'bg-white',
      textColor: 'text-[#0a4c3d]',
    },
    {
      icon: <FacebookIcon />,
      action: () => {
        window.location.href = `${import.meta.env.VITE_BASE_URL}/auth/facebook`;
      },
      name: 'Facebook',
      bgColor: 'bg-blue-600',
      textColor: 'text-white',
    },
    {
      icon: <TwitterIcon />,
      action: () => {
        window.location.href = `${import.meta.env.VITE_BASE_URL}/auth/twitter`;
      },
      name: 'Twitter',
      bgColor: 'bg-[#1DA1F2]',
      textColor: 'text-white',
    },
    {
      icon: <InstagramIcon />,
      action: () => {
        window.location.href = `${import.meta.env.VITE_BASE_URL}/auth/instagram`;
      },
      name: 'Instagram',
      bgColor: 'bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600',
      textColor: 'text-white',
    },
  ];

  return (
    <div className="w-full max-w-sm mx-auto mt-6 px-4">
      <div className="flex justify-center gap-3 flex-wrap">
        {thirdPartyAuth.map((auth, key) => (
          <button
            key={key}
            onClick={auth.action}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg shadow-md ${auth.bgColor} ${auth.textColor} hover:opacity-90 transition-all duration-200`}
          >
            {auth.icon}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SocialAuth;
