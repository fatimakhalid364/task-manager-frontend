
import { Screen } from "src/constants/constants";
import PriorityTasks from './PriorityTasks';

function MediumTasks() {
    return (
        <div>
            <PriorityTasks priority={Screen.MEDIUM} />
        </div>
    )
}

export default MediumTasks;
