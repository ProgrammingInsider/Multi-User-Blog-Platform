'use client'

import { DeleteBlog } from '@/utils/deleteBlog';
import React from 'react';

const DeleteBlogBtn = ({ id }: { id: string }) => {

  const handleConfirm = (event: React.FormEvent<HTMLFormElement>) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this blog?");
    if (!isConfirmed) {
      event.preventDefault();
    }
  };

  return (
    <form action={DeleteBlog} method="post" onSubmit={handleConfirm}>
      <input type="hidden" name="id" value={id} />
      <button type="submit" className="p-2 hover:font-bold text-sm secondaryBtn secondaryBtnTxt">
        Delete
      </button>
    </form>
  );
};

export default DeleteBlogBtn;