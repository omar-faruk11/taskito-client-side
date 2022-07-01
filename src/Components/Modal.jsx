import axios from 'axios';
import React from 'react';

const Modal = ({ openmodal, refetch, setopenmodal }) => {
    const handleupdate =(event)=>{
        event.preventDefault();
        console.log('hello');
        const newtask = event.target.updateTask.value;
        console.log(newtask);
        const updateTask = {
            newtask
        };
        if (updateTask) {
            (async () => {
                const { data } = await axios.patch(`http://localhost:5000/update/task/${openmodal}`, (updateTask))
                if (data.acknowledged === true) {
                    setopenmodal(null)
                    refetch()
                }
            })()
        }
    }
    return (
        <div>
            <input type="checkbox" id="my-modal-6" class="modal-toggle" />
            <div class="modal modal-bottom sm:modal-middle">
                <div class="modal-box">
                    <label onClick={(() => setopenmodal(null))} class="btn btn-sm border-0 btn-circle absolute right-2 top-2">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </label>
                    <h3 class="font-bold text-lg">Update your task</h3>
                    <form onSubmit={handleupdate}>
                        <div className="mt-6 flex space-x-4 m-10 justify-center">
                            <input  placeholder="write your task" name='updateTask' className="bg-gray-100 w-full rounded-md py-2 px-4 border-2 outline-none" />
                            <button type='submit' className="btn btn-primary px-4 rounded-md font-semibold">Update</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Modal;