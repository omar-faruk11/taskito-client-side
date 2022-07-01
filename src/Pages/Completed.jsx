import axios from 'axios';
import React from 'react';
import { useQuery } from 'react-query'
import Loading from '../Components/Loading';

const Completed = () => {
    const { isLoading, isFetching, error, data, refetch } = useQuery('task', async () => await axios.get('http://localhost:5000/competed/tasks'));


    const inCompletTask = (id) => {
        const taskstatus = {
            status: "incomplete"
        };
        (async () => {
            const { data } = await axios.patch(`http://localhost:5000/update/status/${id}`, (taskstatus))
            if (data) {
                refetch()
            }
        })()
    };
    
    if(isLoading || isFetching){
        return <Loading/>
    }

    return (
        <div className="w-full">
            <div className=' w-full  md:w-2/5 mt-16 mx-auto p-10'>
                <div className='flex justify-center flex-col'>
            <h2 className='text-3xl text-center font-bold mb-5'>Completed tasks</h2>
            {
                data?.data&&
                data?.data?.map(atask =>(

                    <div key={atask._id} className="block">
                        <div className="mt-2 flex">
                            <label htmlFor={atask._id} className="inline-flex items-center bg-pink-400 p-2 rounded-md w-full cursor-pointer mx-2">
                                <input checked="checked" onChange={() => inCompletTask(atask._id)} id={atask._id} type="checkbox" className="w-6 h-6 rounded" />
                                <span className="ml-2  text-white">{atask.task}</span>
                            </label>
                            {/* <label onClick={() => setopenmodal(atask._id)} for="my-modal-6" className='btn modal-button btn-sm my-1 mx-2 rounded-md btn-outline ml-auto'>Eadi</label> */}
                        </div>
                    </div>
                ))
            }
           </div>
        </div>
        </div>
    );
};

export default Completed;