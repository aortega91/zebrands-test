'use client';

import { useRouter } from 'next/navigation';

export default function GoBackButton() {
  const router = useRouter();

  const goBack = () => {
    router.back();
  };

  return (
    <button
      type="submit"
      style={{
        backgroundColor: '#6466E9',
      }}
      className="rounded-full flex items-center text-gray-100 px-3 py-2 w-fit-content h-fit-content"
      onClick={goBack}
    >

      <div
        style={{ marginLeft: '-8px' }}
        className="w-6 h-6 "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          style={{ fill: '#e5e7eb' }}
        >
          <path
            d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"
          />
        </svg>
      </div>
      <div>
        Ir Atrás
      </div>
    </button>
  );
}
