import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
    const UserProfile = () => {
      const BACKEND_URL=import.meta.env.VITE_BACKEND_URL;
      const [user, setUser] = useState({ name: '', email: '', contact: '' });
      const [error, setError] = useState(null);
      const [loading, setLoading] = useState(true);  
      useEffect(() => {
        const fetchUserProfile = async () => {
          try {
            const token = localStorage.getItem('token');
            const decode=jwtDecode(token);
            const id=decode.sub;
            if (!token) {
              throw new Error('No JWT token found');
            }
            const response = await fetch(`${BACKEND_URL}/customer/getCustomer?UserId=${id}`, {
              method: 'GET',
              headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
              },
            });

            if (!response.ok) {
             
              throw new Error('Failed to fetch user profile');
            }

            const data = await response.json();
            setUser({
              name: data.name || '',
              email: data.email || '',
              contact: data.contact || '',
            });
            setLoading(false);
          } catch (err) {
            setError(err.message);
             localStorage.removeItem("token");
            setLoading(false);
          }
        };

        fetchUserProfile();
      }, []);
      if (loading) {
        return (
          <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="text-xl font-semibold text-gray-600">Loading...</div>
          </div>
        );
      }
      if (error) {
        return (
          <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="text-xl font-semibold text-red-600">Error: {error}</div>
          </div>
        );
      }

      return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">User Profile</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <p className="mt-1 text-lg text-gray-900">{user.name}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <p className="mt-1 text-lg text-gray-900">{user.email}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Contact</label>
                <p className="mt-1 text-lg text-gray-900">{user.contact}</p>
              </div>
            </div>
          </div>
        </div>
      );
    };
export default UserProfile
  