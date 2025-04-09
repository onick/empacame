"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeftIcon, PhotoIcon } from '@heroicons/react/24/outline';

export default function NewProduct() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    sku: '',
    category: '',
    stock: '',
    status: 'Activo',
    featured: false,
    images: [] as File[]
  });
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when field is being edited
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  // Handle checkbox change
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  // Handle file upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileList = Array.from(e.target.files);
      setFormData(prev => ({ ...prev, images: [...prev.images, ...fileList] }));
    }
  };

  // Remove uploaded image
  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  // Validate form
  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!formData.name.trim()) newErrors.name = 'El nombre es obligatorio';
    if (!formData.description.trim()) newErrors.description = 'La descripción es obligatoria';
    if (!formData.price.trim()) newErrors.price = 'El precio es obligatorio';
    if (isNaN(parseFloat(formData.price))) newErrors.price = 'El precio debe ser un número';
    if (!formData.sku.trim()) newErrors.sku = 'El SKU es obligatorio';
    if (!formData.category) newErrors.category = 'La categoría es obligatoria';
    if (!formData.stock.trim()) newErrors.stock = 'El stock es obligatorio';
    if (isNaN(parseInt(formData.stock))) newErrors.stock = 'El stock debe ser un número';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      // Here you would normally make an API call to save the product
      // For now, we'll just simulate a success after a delay
      console.log('Product data to submit:', formData);
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Redirect back to products list after successful submission
      router.push('/dashboard/products');
    } catch (error) {
      console.error('Error creating product:', error);
      setIsSubmitting(false);
      // Handle submission error
    }
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center">
          <Link
            href="/dashboard/products"
            className="mr-4 text-gray-500 hover:text-gray-700"
          >
            <ArrowLeftIcon className="h-5 w-5" aria-hidden="true" />
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Crear Nuevo Producto</h1>
        </div>
      </div>

      <div className="bg-white shadow-sm rounded-lg">
        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-6">
            {/* Form sections */}
            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Nombre del Producto <span className="text-red-500">*</span>
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm ${errors.name ? 'border-red-500' : ''}`}
                  />
                  {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
                </div>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="sku" className="block text-sm font-medium text-gray-700">
                  SKU <span className="text-red-500">*</span>
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="sku"
                    id="sku"
                    required
                    value={formData.sku}
                    onChange={handleChange}
                    className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm ${errors.sku ? 'border-red-500' : ''}`}
                  />
                  {errors.sku && <p className="mt-1 text-sm text-red-500">{errors.sku}</p>}
                </div>
              </div>

              <div className="sm:col-span-6">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Descripción <span className="text-red-500">*</span>
                </label>
                <div className="mt-1">
                  <textarea
                    id="description"
                    name="description"
                    rows={4}
                    required
                    value={formData.description}
                    onChange={handleChange}
                    className={`block w-full rounded-md border border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm ${errors.description ? 'border-red-500' : ''}`}
                  />
                  {errors.description && <p className="mt-1 text-sm text-red-500">{errors.description}</p>}
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  Escribe una descripción detallada del producto. Incluye características, materiales, etc.
                </p>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                  Precio (€) <span className="text-red-500">*</span>
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">€</span>
                  </div>
                  <input
                    type="text"
                    name="price"
                    id="price"
                    required
                    value={formData.price}
                    onChange={handleChange}
                    className={`block w-full pl-7 pr-12 rounded-md border-gray-300 focus:border-primary focus:ring-primary sm:text-sm ${errors.price ? 'border-red-500' : ''}`}
                    placeholder="0.00"
                  />
                  {errors.price && <p className="mt-1 text-sm text-red-500">{errors.price}</p>}
                </div>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                  Categoría <span className="text-red-500">*</span>
                </label>
                <div className="mt-1">
                  <select
                    id="category"
                    name="category"
                    required
                    value={formData.category}
                    onChange={handleChange}
                    className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm ${errors.category ? 'border-red-500' : ''}`}
                  >
                    <option value="" disabled>Seleccionar categoría</option>
                    <option value="Bolsos">Bolsos</option>
                    <option value="Accesorios">Accesorios</option>
                    <option value="Sets">Sets</option>
                    <option value="Decoración">Decoración Hogar</option>
                  </select>
                  {errors.category && <p className="mt-1 text-sm text-red-500">{errors.category}</p>}
                </div>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="stock" className="block text-sm font-medium text-gray-700">
                  Stock <span className="text-red-500">*</span>
                </label>
                <div className="mt-1">
                  <input
                    type="number"
                    name="stock"
                    id="stock"
                    required
                    min="0"
                    value={formData.stock}
                    onChange={handleChange}
                    className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm ${errors.stock ? 'border-red-500' : ''}`}
                  />
                  {errors.stock && <p className="mt-1 text-sm text-red-500">{errors.stock}</p>}
                </div>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                  Estado
                </label>
                <div className="mt-1">
                  <select
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                  >
                    <option value="Activo">Activo</option>
                    <option value="Agotado">Agotado</option>
                    <option value="Descontinuado">Descontinuado</option>
                  </select>
                </div>
              </div>

              <div className="sm:col-span-2">
                <div className="flex items-center h-full">
                  <div className="flex items-start mt-6">
                    <div className="flex items-center h-5">
                      <input
                        id="featured"
                        name="featured"
                        type="checkbox"
                        checked={formData.featured}
                        onChange={handleCheckboxChange}
                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="featured" className="font-medium text-gray-700">
                        Destacado
                      </label>
                      <p className="text-gray-500">Mostrar en sección de destacados</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="sm:col-span-6">
                <label className="block text-sm font-medium text-gray-700">Imágenes del Producto</label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    <PhotoIcon className="mx-auto h-12 w-12 text-gray-400" aria-hidden="true" />
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer rounded-md font-medium text-primary hover:text-primary-dark focus-within:outline-none"
                      >
                        <span>Subir imágenes</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          className="sr-only"
                          accept="image/*"
                          multiple
                          onChange={handleFileChange}
                        />
                      </label>
                      <p className="pl-1">o arrastrar y soltar</p>
                    </div>
                    <p className="text-xs text-gray-500">PNG, JPG, GIF hasta 10MB</p>
                  </div>
                </div>

                {/* Preview uploaded images */}
                {formData.images.length > 0 && (
                  <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                    {formData.images.map((file, index) => (
                      <div key={index} className="relative group">
                        <div className="relative h-24 w-full overflow-hidden rounded-md bg-gray-200">
                          <img
                            src={URL.createObjectURL(file)}
                            alt={`Preview ${index}`}
                            className="h-full w-full object-cover"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <span className="text-white text-sm font-medium">Eliminar</span>
                          </button>
                        </div>
                        <p className="mt-1 text-xs text-gray-500 truncate">{file.name}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="pt-5 border-t border-gray-200">
              <div className="flex justify-end">
                <Link
                  href="/dashboard/products"
                  className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                >
                  Cancelar
                </Link>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary ${
                    isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
                  }`}
                >
                  {isSubmitting ? 'Guardando...' : 'Guardar Producto'}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
