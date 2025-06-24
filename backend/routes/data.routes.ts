import { Router } from 'express';
import { Section } from "../types/data.types";
import dataJson from '../data/demoData.json';
import {computeSection, findSectionByName} from "../services/data.service";

const dataRouter = Router();

const DEMO_DATA: Section = dataJson;

dataRouter.get('/data', (req: any, res: any) => {
    const computedRoot = computeSection(DEMO_DATA);
    return res.json(computedRoot);
})

dataRouter.get('/data/:section', (request: any, response: any) => {
    const name = request.params.section;
    const found = findSectionByName(DEMO_DATA, name);

    if (!found) {
        return response.status(404).json({ message: "Section not found" });
    }

    const computed = computeSection(found);
    return response.json(computed);
})

export default dataRouter
