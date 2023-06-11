import { User, UserLesson } from "../../interfaces";
import WebcamVideo from "../webcam/WebcamVideo";

type Props = {
  user: UserLesson;
};

export default function UserRecordCard({ user }: Props) {
    return (
        <WebcamVideo user = {user}/>
    );
}
