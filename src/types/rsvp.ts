export interface RsvpSubmission {
  id?: string;
  fullName: string;
  attending: boolean;
  guestsCount: number;
  dietaryRestrictions?: string;
  message?: string;
  phone?: string;
  createdAt?: string;
}

export type RsvpFormData = Omit<RsvpSubmission, "id" | "createdAt">;
