import { WithId } from "mongodb";

export default interface IDocument extends WithId<Document> {
    name: string;
    text: string;
}