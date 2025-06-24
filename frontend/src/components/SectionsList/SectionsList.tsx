import {useEffect, useState} from "react";
import axios from "axios";
import type {Section} from "../../types/data.types.ts";
import SectionCard from "../SectionCard/Section.tsx";


const SectionsList = () => {
    const [sections, setSections] = useState<(Section & { computedSum: number })[]>([]);

    useEffect(() => {
        axios.get("/api/data")
            .then(response => {
                setSections(response.data.children || []);
                console.log(response.data)
            })
            .catch(error => {
                console.error("Error fetching sections:", error);
            });
    }, []);

    return <div>
        {sections.map((section, index) => (
            (
                <div key={index} className='my-5 w-50 m-auto'>
                    <SectionCard key={index} sectionData={section} sectionSum={section.computedSum} />
                </div>
            )
        ))}
    </div>


}

export default SectionsList;