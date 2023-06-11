import Link from 'next/link'
import Layout from '../components/Layout'
import UserRecordCard from '../components/users/user';
import { useRouter } from 'next/router';
import { User, UserLesson } from '../interfaces';

const RecordPage = () => {
  const router = useRouter();
  const { userId, lessonId, userName, lessonName} = router.query;
  const user:UserLesson = {userId:userId[0], userName:userName[0], lessonId:lessonId[0], lessonName: lessonName[0]};
  return (
  <Layout title="Запись урока">
    <UserRecordCard  user = {user}/>
  </Layout>
);
}

export default RecordPage
