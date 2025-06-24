import type { Entry } from "../../types/data.types.ts";
import {useEffect, useRef, useState} from "react";
import EntryForm from "../EntryForm/EntryForm.tsx";

const EntryComponent = (
        {
            entry,
            sectionSumState,
            setSectionSumState
        }: {
            entry: Entry,
            sectionSumState: number;
            setSectionSumState: (sum: number) => void
        }
    ) => {
    const [entryState, setEntryState] = useState<Entry>(entry);
    const [isHovered, setIsHovered] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const prevSumRef = useRef(entry.sum);

    useEffect(() => {
        const difference = entryState.sum - prevSumRef.current;
        if (difference !== 0) {
            setSectionSumState(sectionSumState + difference);
            prevSumRef.current = entryState.sum;
        }
    }, [entryState.sum, sectionSumState, setSectionSumState]);


    return (
        <>
            <li key={entry.name} className="list-group-item"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}>

                <div className="d-flex justify-content-between align-items-center mb-1">
                    <strong>{entryState.name}</strong>
                    <span className="badge bg-success">€{entryState.sum}k</span>
                </div>
                <small className="text-muted fst-italic">{entryState.note}</small>

                {isHovered && (
                    <div className='d-flex justify-content-end'>
                        <button
                            className="btn btn-sm btn-light"
                            style={{zIndex: 10}}
                            onClick={() => setShowModal(true)}
                        >
                        Edit
                        </button>
                    </div>
                )}
            </li>

            {showModal && (<EntryForm entry={entryState} setShowModal={setShowModal} setEntryState={setEntryState}/>)}
        </>
    );
}

export default EntryComponent;