import { DEGREE_LEVEL } from "../const/degree-level";

export type DegreeLevel = (typeof DEGREE_LEVEL)[keyof typeof DEGREE_LEVEL];
