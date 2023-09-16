import Link from 'next/link';
import React from 'react'
import { ArrowRight } from 'react-feather';

const PostList = ({ data }) => {
    const batasiKalimat = (inputKalimat) => {
        let str = inputKalimat;
        if(str.length > 200) str = str.substring(0,200) + '...';

        return str;
    }
    
    return (
        <Link href={`/blog/${data.id}`}>
            <div className="list-post my-[26px] py-[26px] cursor-pointer flex items-center" style={{ borderBottom: '1px solid #D9D9D9' }}>
                    <div>
                        <p className="mb-3">Posted by - user{data.user_id}</p>
                        <div className="w-[80%]">
                            <h3 className="text-[20px] font-bold mb-2">{data.title}</h3>
                            <p>{batasiKalimat(data.body)}</p>
                        </div>
                    </div>
                    <div className="arrow-right">
                        <ArrowRight />
                    </div>
            </div>
        </Link>
    )
}

export default PostList