import { Skills } from "../enums/skills";

export interface JobOffers {
    id: string;
    company_id: string;
    title: string;
    description: string;
    skills_required: Skills[];
  } 