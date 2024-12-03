import React, { useState } from "react";

export const DeleteUserForm = ({ userId, onDelete }) => {
    const handleDelete = async () => {
      if (window.confirm('are you sure you wish to delete')) {
        try {
            const response  = await fetch(`http://localhost:3000/user/${userId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                  }
              });

              if (response.ok) {
                onDelete(); 
              } else {
                console.error('err deleting user:', await response.text());
              }
            } catch (error) {
              console.error('err deleting user:', error);
            }
          }
        };
      
        return (
            <form onSubmit={handleDelete}>
              <button type="button" onClick={handleDelete}>
                delete user
              </button>
            </form>
          );
        };
        
        export default DeleteUserForm;