import { LastCommentModel } from "./lastCommentModel"

export type CandidateModel = {
    image: string
    candidate: string,
    role: string,
    salary: number,
    last_comms: LastCommentModel,
    sent_by: string,
    status: string,
    archived: boolean
}