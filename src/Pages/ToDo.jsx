import axios from 'axios';
import React, { useState } from 'react';
import { useQuery } from 'react-query'
import Loading from '../Components/Loading';
import Modal from '../Components/Modal';

const ToDo = () => {
    const [openmodal, setopenmodal] = useState(null)
    const { isLoading, isFetching, error, data, refetch } = useQuery('task', async () => await axios.get('http://localhost:5000/taskes'))

    const handleSubmit = (event) => {
        event.preventDefault();
        const task = event.target.addTask.value;
        const fullTask = {
            task,
            status: "incomplete"
        };
        if (task) {
            (async () => {
                const { data } = await axios.post('http://localhost:5000/new/task', (fullTask))
                if (data.acknowledged === true) {
                    console.log(data);
                    event.target.reset();
                    refetch()
                }
            })()
        }
    }
    const CompletedTask = (id) => {
        const taskstatus = {
            status: "completed"
        };
        (async () => {
            const { data } = await axios.patch(`http://localhost:5000/update/status/${id}`, (taskstatus))
            if (data) {
                refetch()
            }
        })()
    };
    
    if (isLoading || isFetching) {
        return <Loading />
    }
    return (
        <div className='container mx-auto'>
            <div className="w-full  md:w-2/5 mt-16 flex justify-center mx-auto flex-col">
                <div>
                    <div className="">
                        <h1 className="text-xl mt-2 text-center font-semibold text-gray-600">Write Todo List</h1>
                        <form onSubmit={handleSubmit}>
                            <div className="mt-6 flex space-x-4 m-10 justify-center">
                                <input placeholder="write your task" name='addTask' className="bg-gray-100 w-full rounded-md py-2 px-4 border-2 outline-none" />
                                <button type='submit' className="btn btn-primary px-4 rounded-md font-semibold">Add Task</button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className='mx-10'>
                    <h1 className="text-2xl mt-2 font-semibold text-gray-600 my-5">Yout Task</h1>
                    {
                        data?.data &&
                        data.data.map(task => (
                            <div key={task._id} className="block">
                                <div className="mt-2 flex">
                                    <label htmlFor={task._id} className="inline-flex items-center bg-pink-400 p-2 rounded-md w-full cursor-pointer mx-2">
                                        <input onChange={() => CompletedTask(task._id)} id={task._id} type="checkbox" className="w-6 h-6 rounded" />
                                        <span className="ml-2  text-white">{task.task}</span>
                                    </label>
                                    <label onClick={() => setopenmodal(task._id)} for="my-modal-6" className='btn modal-button btn-sm my-1 mx-2 rounded-md btn-outline ml-auto'>Eadi</label>
                                </div>
                            </div>
                        ))
                    }

                </div>
                {openmodal && <Modal openmodal={openmodal} refetch={refetch} setopenmodal={setopenmodal}/>}
            </div>
        </div>
    );
};

export default ToDo;
