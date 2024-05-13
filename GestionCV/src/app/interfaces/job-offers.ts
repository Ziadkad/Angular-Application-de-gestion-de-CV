import { Skills } from "../enums/skills";

export interface JobOffers {
    id: number;
    company_id: number;
    title: string;
    description: string;
    skills_required: Skills[];
  } 