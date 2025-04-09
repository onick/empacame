"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      setError('Por favor completa todos los campos');
      return;
    }
    
    try {
      setIsLoading(true);
      setError('');
      
      const result = await signIn('credentials', {
        redirect: false,
        email: formData.email,
        password: formData.password,
      });
      
      if (result?.error) {
        setError('Credenciales inválidas');
        setIsLoading(false);
        return;
      }
      
      router.push(callbackUrl);
    } catch (err) {
      console.error('Error de inicio de sesión:', err);
      setError('Ocurrió un error al iniciar sesión');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="text-center">
            <Link href="/" className="inline-block">
              <span className="sr-only">Tu Tienda</span>
              {/* Replace with your actual logo */}
              <div className="h-12 w-12 mx-auto bg-primary rounded-full flex items-center justify-center">
                <span className="text-white text-xl font-bold">T</span>
              </div>
            </Link>
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Iniciar sesión en tu cuenta
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            ¿No tienes una cuenta?{' '}
            <Link href="/auth/register" className="font-medium text-primary hover:text-primary/80">
              Regístrate
            </Link>
          </p>
        </div>
        
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4">
            <div className="flex">
              <div className="ml-3">
                <p className="text-sm text-red-700">
                  {error}
                </p>
              </div>
            </div>
          </div>
        )}
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email" className="sr-only">
                Correo electrónico
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                placeholder="Correo electrónico"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Contraseña
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={formData.password}
                onChange={handleChange}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                placeholder="Contraseña"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember_me"
                name="remember_me"
                type="checkbox"
                className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
              />
              <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-900">
                Recordarme
              </label>
            </div>

            <div className="text-sm">
              <Link href="/auth/forgot-password" className="font-medium text-primary hover:text-primary/80">
                ¿Olvidaste tu contraseña?
              </Link>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary ${
                isLoading ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {isLoading ? 'Iniciando sesión...' : 'Iniciar sesión'}
            </button>
          </div>
        </form>
        
        {/* Demo credentials */}
        <div className="bg-blue-50 p-4 rounded-md">
          <h3 className="text-sm font-medium text-blue-800">Credenciales de demostración:</h3>
          <div className="mt-2 text-xs text-blue-700 space-y-1">
            <p><strong>Admin:</strong> admin@example.com / admin123</p>
            <p><strong>Cliente:</strong> customer@example.com / customer123</p>
          </div>
        </div>
      </div>
    </div>
  );
}