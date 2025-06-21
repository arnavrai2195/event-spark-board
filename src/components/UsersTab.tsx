
import React, { useState } from 'react';
import { Upload, Search, Download, QrCode, CheckCircle, XCircle } from 'lucide-react';

const UsersTab = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const mockUsers = [
    { id: 1, name: 'John Doe', email: 'john@techcorp.com', phone: '+1-555-0123', company: 'TechCorp', badgePrinted: true, points: 1250 },
    { id: 2, name: 'Jane Smith', email: 'jane@innovate.com', phone: '+1-555-0124', company: 'InnovateLab', badgePrinted: false, points: 890 },
    { id: 3, name: 'Mike Johnson', email: 'mike@startup.com', phone: '+1-555-0125', company: 'StartupHub', badgePrinted: true, points: 2100 },
    { id: 4, name: 'Sarah Wilson', email: 'sarah@future.com', phone: '+1-555-0126', company: 'FutureTech', badgePrinted: true, points: 1750 },
    { id: 5, name: 'David Chen', email: 'david@devstudio.com', phone: '+1-555-0127', company: 'DevStudio', badgePrinted: false, points: 950 },
  ];

  const filteredUsers = mockUsers.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-5 h-5 text-gray-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        
        <div className="flex space-x-3">
          <button className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
            <Upload className="w-4 h-4 mr-2" />
            Upload CSV
          </button>
          <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Download className="w-4 h-4 mr-2" />
            Export
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Name</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Email</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Phone</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Company</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Points</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Badge Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">QR Code</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                        <span className="text-blue-600 font-semibold text-sm">
                          {user.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <span className="font-medium text-gray-900">{user.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{user.email}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{user.phone}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{user.company}</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {user.points} pts
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      {user.badgePrinted ? (
                        <>
                          <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                          <span className="text-sm text-green-700 font-medium">Printed</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-5 h-5 text-red-500 mr-2" />
                          <span className="text-sm text-red-700 font-medium">Not Printed</span>
                        </>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <button className="flex items-center px-3 py-1 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                      <QrCode className="w-4 h-4 mr-1" />
                      <span className="text-sm">View</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex items-center justify-between text-sm text-gray-600">
        <span>Showing {filteredUsers.length} of {mockUsers.length} users</span>
        <div className="flex space-x-2">
          <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50">Previous</button>
          <button className="px-3 py-1 bg-blue-600 text-white rounded">1</button>
          <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50">2</button>
          <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50">Next</button>
        </div>
      </div>
    </div>
  );
};

export default UsersTab;
