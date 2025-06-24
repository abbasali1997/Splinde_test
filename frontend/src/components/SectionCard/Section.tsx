import type { Entry, Section } from "../../types/data.types.ts";
import EntryComponent from "../Entry/Entry.tsx";
import { useState, useEffect, useRef } from "react";

const SectionCard = (
    { sectionData, sectionSum, setSectionSumState }:
        { sectionData: Section; sectionSum: number; setSectionSumState?: (sum: (prev) => any) => void }
) => {
    const [sectionSumState, setLocalSectionSumState] = useState(sectionSum);
    const prevSumRef = useRef(sectionSum);

    const [isCollapsed, setIsCollapsed] = useState(false);

    useEffect(() => {
        setLocalSectionSumState(sectionSum);
    }, [sectionSum]);

    useEffect(() => {
        if (setSectionSumState) {
            const diff = sectionSumState - prevSumRef.current;
            if (diff !== 0) {
                setSectionSumState((prev) => prev + diff);
                prevSumRef.current = sectionSumState;
            }
        }
    }, [sectionSumState, setSectionSumState]);

    const renderEntry = (entry: Entry | Section) => {
        if ("children" in entry && entry.children.length > 0) {
            const nestedSum = calculateSum(entry);

            return (
                <li key={entry.name} className="list-group-item px-2 border-0">
                    <SectionCard
                        sectionData={entry}
                        sectionSum={nestedSum}
                        setSectionSumState={setLocalSectionSumState}  // Pass setter down
                    />
                </li>
            );
        }

        return (
            <EntryComponent
                key={entry.name}
                entry={entry as Entry}
                sectionSumState={sectionSumState}
                setSectionSumState={setLocalSectionSumState}
            />
        );
    };

    function calculateSum(section: Section | Entry): number {
        if (!("children" in section) || !section.children?.length) {
            return (section as Entry).sum || 0;
        }
        return section.children.reduce((acc, child) => acc + calculateSum(child), 0);
    }

    return (
        <div className="card position-relative" style={{ minWidth: "350px" }}>
            <div className="card-header bg-body-tertiary text-white d-flex justify-content-between align-items-center">
                <h5
                    className="mb-0 text-black"
                    style={{ cursor: 'pointer', userSelect: 'none' }}
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    title={isCollapsed ? 'Expand' : 'Collapse'}
                >
                    {sectionData.name}
                    <span style={{ marginLeft: 10 }}>
            {isCollapsed ? '▸' : '▾'}
          </span>
                </h5>
                <span className="badge bg-light text-dark">Total: €{sectionSumState}k</span>
            </div>

            {!isCollapsed && (
                <ul className="list-group list-group-flush">
                    {sectionData.children.map((entry) => renderEntry(entry))}
                </ul>
            )}
        </div>
    );
};

export default SectionCard;
