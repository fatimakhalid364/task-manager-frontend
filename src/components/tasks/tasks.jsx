import MainDiv from "src/components/maindiv/maindiv";
import plus from 'src/assets/plus.svg';
import AddTask from "src/components/tasks/sub_components/add_task";
import 'src/components/tasks/sub_components/tasks.css'

function Tasks() {
    return <div className='task-page-div'>
    {/*<AddTask />*/}

        <MainDiv>
            <div className='task-page'>
                <div className='task-page-top'>
                    <div className="task-page-top-header">
                        <div className='all-tasks'>
                            All Tasks
                        </div>
                        <div className="number-of-tasks">
                            (43)
                        </div>
                    </div>
                    <a className='primary-button' href='#popup'>
                        <img src={plus} alt='plus-sign' className='plus-sign' /> Add Task
                    </a>
                </div>
            </div>

            
        </MainDiv>
        
        </div>
}

export default Tasks;