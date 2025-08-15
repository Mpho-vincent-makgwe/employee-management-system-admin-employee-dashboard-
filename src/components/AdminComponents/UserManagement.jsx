'use client';

import { useState } from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { users } from '@/data/adminData/rolesData';
import Card from './Card';
import NotificationModal from './NotificationModal';

export default function UserManagement() {
  const [showDelete, setShowDelete] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleDeleteClick = (user) => {
    setSelectedUser(user);
    setShowDelete(true);
  };

  const onConfirm = () => {
    console.log(`User deleted: ${selectedUser.name}`);
    setShowDelete(false);
    setSelectedUser(null);
    
  };

  const onCancel = () => {
    setShowDelete(false);
    setSelectedUser(null);
  };

  return (
    <div className=" space-y-4 bg-white h-screen">
      <div className='p-4 space-y-4'>
      <h2 className="text-lg  text-[#4F46E5]">User Management</h2>
      {users.map((user) => (
        <Card key={user.id}>
          <div className="flex justify-between items-center h-full p-4">
            <div className="flex items-center gap-5">
              <div className="w-[48px] h-[48px] flex items-center justify-center rounded-full bg-[#4F46E5] text-white font-medium">
                {user.name.slice(0, 2).toUpperCase()}
              </div>
              <div className="flex flex-col items-start">
                <h3 className="text-base text-gray-800">{user.name}</h3>
                <p className="text-sm text-black">{user.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-xs text-[#4F46E5] border border-[#4F46E5] rounded-full px-3 py-1 font-medium bg-white">
                {user.role}
              </span>
              <span className="text-xs bg-[#4F46E5] text-white rounded-full px-3 py-1 font-medium">
                {user.status}
              </span>
              <button className="border border-gray-300 rounded-md p-2 hover:border-gray-400 hover:text-gray-600">
                <FaEdit className="w-4 h-4 text-gray-500" />
              </button>
              <button
                className="border border-gray-300 rounded-md p-2 hover:border-gray-400 hover:text-gray-600"
                onClick={() => handleDeleteClick(user)}
              >
                <FaTrashAlt className="w-4 h-4 text-gray-500" />
              </button>
            </div>
          </div>
        </Card>
      ))}

      {selectedUser && (
        <NotificationModal
          show={showDelete}
          close={onCancel}
          icon={<FaTrashAlt className="w-6 h-6 text-white" />}
          
          message={`Deleting ${selectedUser.name} will revoke their access to this dashboard permanently.`}
          confirmText="Yes, Delete"
          cancelText="No, Cancel"
          onConfirm={onConfirm}
          onCancel={onCancel}
        />
      )}
      </div>
    </div>
  );
}







