import { ComputedSection, Entry, Section } from "../types/data.types";

export const computeSection = (section: Section): ComputedSection => {
    const computedChildren: (Entry | ComputedSection)[] = [];

    let sectionSum = 0;

    for (const child of section.children) {
        if ('sum' in child) {
            computedChildren.push(child);
            sectionSum += child.sum;
        } else {
            const computedChild = computeSection(child); // recursively compute
            computedChildren.push(computedChild);
            sectionSum += computedChild.computedSum;
        }
    }

    return {
        name: section.name,
        children: computedChildren,
        computedSum: sectionSum,
    };
};


export const findSectionByName = (section: Section, name: string): Section | null => {
    if (section.name === name) return section;

    for (const child of section.children) {
        if ('children' in child) {
            const found = findSectionByName(child, name);
            if (found) return found;
        }
    }

    return null;
}