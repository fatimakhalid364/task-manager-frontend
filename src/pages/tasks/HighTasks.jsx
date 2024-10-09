
import { Screen } from "src/constants/constants";
import PriorityTasks from './PriorityTasks';

function HighTasks() {
    return (
        <div>
            <PriorityTasks priority={Screen.HIGH} />
        </div>
    )
}

export default HighTasks;
