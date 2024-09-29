
import { Screen } from "src/constants/constants";
import PriorityTasks from './PriorityTasks';

function LowTasks() {
    return (
        <div>
            <PriorityTasks priority={Screen.LOW} />
        </div>
    )
}

export default LowTasks;
