import React from 'react';

function CommentItem({comment}) {
    const avatar = comment.comment.trim().toUpperCase().split('').slice(0,2)
    return (
        <div className={'flex items-center gap-3 p-1'}>
            <div className="flex items-center justify-center shrink-0 rounded-full w-10 h-10 bg-blue-100 text-sm">
                {avatar}
            </div>
            <div className="flex text-gray text-[10px]">
                {comment.comment}
            </div>
</div>
    );
}

export default CommentItem;