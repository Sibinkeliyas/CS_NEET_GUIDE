import { IProgressDataProps } from ".";

export interface IUserActivityProps {
    error?:string | null;
    progressData: IProgressDataProps | null
}