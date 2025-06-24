import type {Entry} from "../../types/data.types.ts";
import {useState} from "react";

const EntryForm = (
    {
        entry,
        setShowModal,
        setEntryState
    } : {
        entry: Entry,
        setShowModal: (bool: boolean) => void,
        setEntryState: (entry: Entry) => void
    }
    ) => {

    const [sum, setSum] = useState(entry.sum);
    const [note, setNote] = useState(entry.note);

    const handleSave = () => {
        setEntryState({
            ...entry,
            sum,
            note
        })

        setShowModal(false);
    }

    return (
        <div
            className="modal fade show d-block"
            tabIndex={-1}
            role="dialog"
            style={{backgroundColor: "rgba(0,0,0,0.5)"}}
        >
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Edit Entry: {entry.name}</h5>
                        <button
                            type="button"
                            className="btn-close"
                            onClick={() => setShowModal(false)}
                        ></button>
                    </div>
                    <div className="modal-body">
                        <div className="mb-3">
                            <label className="form-label">Sum (€k)</label>
                            <input
                                type="number"
                                className="form-control"
                                value={sum}
                                onChange={(e) => setSum(Number(e.target.value))}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Note</label>
                            <textarea
                                className="form-control"
                                value={note}
                                onChange={(e) => setNote(e.target.value)}
                            ></textarea>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={() => setShowModal(false)}
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={handleSave}
                        >
                            Save changes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EntryForm;