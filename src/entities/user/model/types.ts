export interface PersonalData {
    phone: string;
    firstName: string;
    lastName: string;
    gender: Gender | "";
}

export type Gender = "male" | "female";
